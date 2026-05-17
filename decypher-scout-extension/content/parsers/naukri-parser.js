const selectors = {
  name: '#profileName, .profile-name, [data-qa="profileName"]',
  currentTitle: '.designation, [data-qa="designation"]',
  currentCompany: '.company-name, [data-qa="companyName"]',
  experience: '.exp-detail, [data-qa="experience"]',
  location: '.location, [data-qa="location"]',
  email: '.email-id, [data-qa="email"]',
  phone: '.mobile-number, [data-qa="mobile"]',
  currentCTC: '.curr-sal, [data-qa="currentSalary"]',
  expectedCTC: '.exp-sal, [data-qa="expectedSalary"]',
  noticePeriod: '.notice-period, [data-qa="noticePeriod"]',
  skills: '.key-skill .skill-tag, [data-qa="keySkills"] span',
  education: '.education-detail .detail-row',
  summary: '.profile-summary, [data-qa="profileSummary"]',
  workHistory: '.work-experience .work-detail',
  profilePhoto: '.profile-img img'
};

function readText(selector) {
  const el = document.querySelector(selector);
  return el?.textContent?.trim() ?? '';
}

function readItems(selector) {
  return Array.from(document.querySelectorAll(selector)).map(el => el.textContent?.trim() ?? '').filter(Boolean);
}

export function parseProfile() {
  const profile = {
    source: 'Naukri',
    sourceProfileUrl: window.location.href,
    name: readText(selectors.name),
    currentTitle: readText(selectors.currentTitle),
    currentCompany: readText(selectors.currentCompany),
    totalExperience: readText(selectors.experience),
    location: readText(selectors.location),
    email: readText(selectors.email),
    phone: readText(selectors.phone),
    currentCTC: readText(selectors.currentCTC),
    expectedCTC: readText(selectors.expectedCTC),
    noticePeriod: readText(selectors.noticePeriod),
    skills: readItems(selectors.skills),
    education: readItems(selectors.education),
    summary: readText(selectors.summary),
    workHistory: readItems(selectors.workHistory),
    profilePhotoUrl: document.querySelector(selectors.profilePhoto)?.getAttribute('src') ?? ''
  };
  const path = window.location.pathname.split('/');
  const idMatch = path.find(p => p && p.length > 2 && p !== 'recruiter' && p !== 'resdex');
  if (idMatch) profile.naukri_profile_id = idMatch;
  return profile;
}

export function parseSearchResults() {
  const cards = Array.from(document.querySelectorAll('.srp-jobtuple-wrapper, .cp-card'));
  return cards.map(card => ({
    name: card.querySelector('.title a, .cp-title')?.textContent?.trim() ?? '',
    currentTitle: card.querySelector('.designation, .sub-title')?.textContent?.trim() ?? '',
    experience: card.querySelector('.exp, .experience')?.textContent?.trim() ?? '',
    location: card.querySelector('.loc, .location')?.textContent?.trim() ?? '',
    skills: Array.from(card.querySelectorAll('.skill-tags span')).map(s => s.textContent?.trim() ?? '').filter(Boolean),
    profileLink: card.querySelector('a[href*="/profile/"]')?.getAttribute('href') ?? ''
  })).filter(item => item.profileLink);
}
