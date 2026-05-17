const runtime = typeof chrome !== 'undefined' ? chrome.runtime : browser.runtime;

const parserMap = {
  naukri: 'parsers/naukri-parser.js',
  linkedin: 'parsers/linkedin-parser.js',
  indeed: 'parsers/indeed-parser.js',
  foundit: 'parsers/foundit-parser.js',
  iimjobs: 'parsers/iimjobs-parser.js',
  monster: 'parsers/monster-parser.js',
  shine: 'parsers/shine-parser.js',
  generic: 'parsers/generic-parser.js'
};

let currentPortal = 'generic';
let currentPageType = 'other';
let lastUrl = location.href;

function getExtensionUrl(path) {
  return runtime.getURL(path);
}

async function loadParser(portal) {
  const parserFile = parserMap[portal] || parserMap.generic;
  const module = await import(getExtensionUrl(parserFile));
  return {
    profile: module.parseProfile,
    search: module.parseSearchResults
  };
}

function initScout() {
  currentPortal = detectPortal();
  currentPageType = detectPageType(currentPortal);
  cleanupExisting();

  if (currentPageType === 'profile' || currentPageType === 'search_result') {
    injectFab();
    if (currentPageType === 'search_result') injectScoutAllButton();
  }
}

function cleanupExisting() {
  document.querySelector('#decypher-scout-fab')?.remove();
  document.querySelector('#decypher-scout-batch-button')?.remove();
  document.querySelector('#decypher-scout-overlay')?.remove();
}

function injectFab() {
  if (document.querySelector('#decypher-scout-fab')) return;

  const fab = document.createElement('div');
  fab.id = 'decypher-scout-fab';
  fab.innerHTML = `
    <div id="decypher-scout-fab-icon">S</div>
    <div id="decypher-scout-fab-label">Scout</div>
  `;
  fab.addEventListener('click', onFabClick);
  document.body.appendChild(fab);
}

function injectScoutAllButton() {
  if (document.querySelector('#decypher-scout-batch-button')) return;
  const button = document.createElement('button');
  button.id = 'decypher-scout-batch-button';
  button.textContent = 'Scout All Visible';
  button.addEventListener('click', onBatchClick);
  document.body.appendChild(button);
}

async function onFabClick() {
  const profile = await loadCandidateProfile();
  if (!profile) {
    showOverlay({ title: 'Unable to capture profile', message: 'No candidate details were found on this page.' });
    return;
  }
  await showCaptureOverlay(profile);
}

async function onBatchClick() {
  const results = await loadSearchResults();
  if (!results.length) {
    showOverlay({ title: 'No candidates found', message: 'No visible candidate cards were detected on this page.' });
    return;
  }
  showBatchOverlay(results);
}

function detectPortal() {
  const hostname = window.location.hostname.toLowerCase();
  if (hostname.includes('naukri.com')) return 'naukri';
  if (hostname.includes('linkedin.com')) return 'linkedin';
  if (hostname.includes('indeed.com')) return 'indeed';
  if (hostname.includes('foundit.in')) return 'foundit';
  if (hostname.includes('iimjobs.com')) return 'iimjobs';
  if (hostname.includes('monster.com')) return 'monster';
  if (hostname.includes('shine.com')) return 'shine';
  return 'generic';
}

function detectPageType(portal) {
  const url = window.location.href;
  switch (portal) {
    case 'naukri':
      if (url.includes('/recruiter/resdex/profile/')) return 'profile';
      if (url.includes('/recruiter/resdex/search-results')) return 'search_result';
      break;
    case 'linkedin':
      if (url.match(/linkedin\.com\/(in|talent\/profile)\//)) return 'profile';
      if (url.includes('/talent/search') || url.includes('/search/results/people/')) return 'search_result';
      break;
    case 'indeed':
      if (url.includes('/resume/')) return 'profile';
      if (url.includes('/resumes.indeed.com')) return 'search_result';
      break;
    case 'foundit':
      if (url.includes('/profile/')) return 'profile';
      break;
    case 'iimjobs':
      if (url.includes('/candidate/')) return 'profile';
      break;
    case 'monster':
      if (url.includes('/profile/')) return 'profile';
      break;
    case 'shine':
      if (url.includes('/profile/')) return 'profile';
      break;
  }
  return 'other';
}

async function loadCandidateProfile() {
  const parser = await loadParser(currentPortal);
  const extracted = parser.profile();
  if (currentPortal === 'generic' && extracted.pageText) {
    const result = await fetchScoutApi('/api/scout/extract-generic', 'POST', {
      pageText: extracted.pageText,
      pageUrl: window.location.href
    });
    if (!result?.error) {
      return { ...extracted, ...result, portal: currentPortal };
    }
  }
  return { ...extracted, portal: currentPortal };
}

async function loadSearchResults() {
  const parser = await loadParser(currentPortal);
  return parser.search();
}

function clearOverlay() {
  document.querySelector('#decypher-scout-overlay')?.remove();
}

function showOverlay(data) {
  clearOverlay();
  const overlay = document.createElement('div');
  overlay.id = 'decypher-scout-overlay';
  overlay.innerHTML = `
    <div class="scout-overlay-backdrop"></div>
    <div class="scout-overlay-panel">
      <header>
        <h2>${data.title}</h2>
        <button id="decypher-close-overlay"></button>
      </header>
      <div class="scout-overlay-content">
        <p>${data.message}</p>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.querySelector('#decypher-close-overlay')?.addEventListener('click', clearOverlay);
}

async function showCaptureOverlay(profile) {
  clearOverlay();
  const overlay = document.createElement('div');
  overlay.id = 'decypher-scout-overlay';
  overlay.innerHTML = `
    <div class="scout-overlay-backdrop"></div>
    <div class="scout-overlay-panel">
      <header>
        <div>
          <div class="scout-banner">Decypher Scout</div>
          <div class="scout-subtitle">Captured from: ${profile.sourceProfileUrl ? new URL(profile.sourceProfileUrl).hostname : profile.portal}</div>
        </div>
        <button id="decypher-close-overlay"></button>
      </header>
      <div class="scout-overlay-content">
        <div class="scout-profile-card">
          <div class="scout-profile-meta">
            <div class="scout-profile-name">${profile.name || 'Unknown candidate'}</div>
            <div>${profile.currentTitle || ''}</div>
            <div>${profile.currentCompany || ''}</div>
            <div>${profile.location || ''}</div>
          </div>
        </div>
        <div class="scout-summary">
          <strong>Skills</strong><br>${(profile.skills || []).slice(0, 20).join(', ') || 'N/A'}
        </div>
        <div class="scout-summary">
          <strong>Email</strong> ${profile.email || 'N/A'}<br>
          <strong>Phone</strong> ${profile.phone || 'N/A'}
        </div>
        <div class="scout-summary">
          <strong>Notice</strong> ${profile.noticePeriod || 'N/A'}<br>
          <strong>CTC</strong> ${profile.currentCTC || 'N/A'} / expected ${profile.expectedCTC || 'N/A'}
        </div>
        <div class="scout-summary">
          <label>Agency / Vendor ID (optional)</label>
          <input id="decypher-vendor-id" placeholder="Vendor ID or leave blank" />
        </div>
        <label>Map to Requisition</label>
        <input id="decypher-requisition-search" placeholder="Search open requisitions..." />
        <div id="decypher-requisition-list"></div>
        <button id="decypher-capture-button" class="scout-primary-btn">Add to Decypher Pipeline</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.querySelector('#decypher-close-overlay')?.addEventListener('click', clearOverlay);
  overlay.querySelector('#decypher-capture-button')?.addEventListener('click', async () => {
    const selected = overlay.querySelector('input[name="decypher-requisition"]:checked');
    if (!selected) {
      alert('Please select a requisition.');
      return;
    }
    const reqId = selected.value;
    const vendorId = overlay.querySelector('#decypher-vendor-id')?.value || undefined;
    const candidateName = (profile.name || '').trim();
    const [firstName, lastName] = candidateName.includes(' ') ? candidateName.split(' ', 2) : [candidateName, ''];

    const result = await fetchScoutApi('/api/scout/capture-candidate', 'POST', {
      vendorId: vendorId || undefined,
      requisitionId: reqId,
      source: profile.source || 'Portal',
      sourceUrl: profile.sourceProfileUrl || window.location.href,
      firstName,
      lastName,
      email: profile.email || '',
      phone: profile.phone || '',
      currentRole: profile.currentTitle || '',
      currentCompany: profile.currentCompany || '',
      yearsOfExperience: Number(profile.totalExperience || 0),
      currentSalary: Number(profile.currentCTC || 0),
      skills: profile.skills || [],
      resumeText: profile.resumeText || ''
    });

    const contentContainer = overlay.querySelector('.scout-overlay-content');
    if (!result?.candidate?.id) {
      if (contentContainer) {
        contentContainer.innerHTML = `<p>Error: ${result?.error || 'Failed to capture candidate'}</p>`;
      }
      return;
    }

    if (contentContainer) {
      contentContainer.innerHTML = `<p>${profile.name || 'Candidate'} added to pipeline </p>`;
    }
    incrementCaptureCount();
  });
  setupRequirementSearch();
  fetchRequisitions('');
}

function showBatchOverlay(cards) {
  clearOverlay();
  const overlay = document.createElement('div');
  overlay.id = 'decypher-scout-overlay';
  overlay.innerHTML = `
    <div class="scout-overlay-backdrop"></div>
    <div class="scout-overlay-panel scout-batch-panel">
      <header>
        <div>
          <div class="scout-banner">Batch Capture</div>
          <div class="scout-subtitle">${cards.length} visible candidates detected</div>
        </div>
        <button id="decypher-close-overlay"></button>
      </header>
      <div class="scout-overlay-content">
        <div class="scout-batch-list">
          ${cards.map((card, index) => `
            <label class="scout-batch-item">
              <input type="checkbox" name="decypher-batch" value="${index}" checked />
              <div><strong>${card.name}</strong><br>${card.currentTitle || ''}</div>
            </label>
          `).join('')}
        </div>
        <button id="decypher-batch-start" class="scout-primary-btn">Capture Selected</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.querySelector('#decypher-close-overlay')?.addEventListener('click', clearOverlay);
  overlay.querySelector('#decypher-batch-start')?.addEventListener('click', () => {
    const checked = Array.from(overlay.querySelectorAll('input[name="decypher-batch"]:checked'));
    const selected = checked.map(input => cards[Number(input.value)]);
    if (!selected.length) {
      alert('Please select at least one candidate.');
      return;
    }
    const batchContent = overlay.querySelector('.scout-overlay-content');
    if (batchContent) {
      batchContent.innerHTML = `<p>Batch capture is in progress for ${selected.length} candidates...</p>`;
    }
  });
}

function incrementCaptureCount() {
  const storage = typeof chrome !== 'undefined' ? chrome.storage.local : browser.storage.local;
  storage.get(['scoutCounts'], (result) => {
    const counts = result.scoutCounts || { today: 0, week: 0 };
    counts.today = (counts.today || 0) + 1;
    counts.week = (counts.week || 0) + 1;
    storage.set({ scoutCounts: counts });
  });
}

function setupRequirementSearch() {
  const input = document.querySelector('#decypher-requisition-search');
  if (!input) return;
  let timeout;
  input.addEventListener('input', () => {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => fetchRequisitions(input.value.trim()), 300);
  });
}

async function fetchRequisitions(query) {
  const listRoot = document.querySelector('#decypher-requisition-list');
  if (!listRoot) return;
  listRoot.innerHTML = '<div class="scout-loading">Loading requisitions</div>';
  const result = await fetchScoutApi(`/api/scout/requisitions?q=${encodeURIComponent(query || '')}`, 'GET');
  if (!result || result.error) {
    listRoot.innerHTML = '<div class="scout-error">Could not load requisitions.</div>';
    return;
  }
  if (!Array.isArray(result) || result.length === 0) {
    listRoot.innerHTML = '<div class="scout-empty">No open requisitions found.</div>';
    return;
  }
  listRoot.innerHTML = result.map(req => `
    <label class="scout-requisition-option">
      <input type="radio" name="decypher-requisition" value="${req.id}" />
      <div>
        <strong>${req.title}</strong><br>
        ${req.department || ''}  ${req.status || ''}
      </div>
    </label>
  `).join('');
}

async function fetchScoutApi(path, method = 'GET', body = null) {
  return new Promise((resolve) => {
    runtime.sendMessage({ type: 'fetchApi', path, method, body }, (response) => {
      resolve(response);
    });
  });
}

const observer = new MutationObserver(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    setTimeout(initScout, 1000);
  }
});
observer.observe(document.body, { childList: true, subtree: true });

setTimeout(initScout, 800);
