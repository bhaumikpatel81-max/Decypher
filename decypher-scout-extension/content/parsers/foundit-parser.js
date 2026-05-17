function getText(selector) {
  return document.querySelector(selector)?.textContent?.trim() ?? '';
}

function getItems(selector) {
  return Array.from(document.querySelectorAll(selector)).map(el => el.textContent?.trim() ?? '').filter(Boolean);
}

export function parseProfile() {
  return {
    source: 'Foundit',
    sourceProfileUrl: window.location.href,
    name: getText('.candidate-name, .profile-name'),
    currentTitle: getText('.current-title'),
    currentCompany: getText('.current-company'),
    totalExperience: getText('.total-experience'),
    location: getText('.current-location'),
    skills: getItems('.skills-section .skill'),
    email: getText('.email-section'),
    phone: getText('.phone-section'),
    education: getItems('.education-section .edu-detail'),
    workHistory: getItems('.experience-section .exp-detail'),
    noticePeriod: getText('.notice-period'),
    currentCTC: getText('.current-ctc'),
    expectedCTC: getText('.expected-ctc')
  };
}

export function parseSearchResults() {
  const cards = Array.from(document.querySelectorAll('.resume-card, .candidate-card'));
  return cards.map(card => ({
    name: card.querySelector('.candidate-name, .candidate-title')?.textContent?.trim() ?? '',
    currentTitle: card.querySelector('.current-title')?.textContent?.trim() ?? '',
    location: card.querySelector('.current-location')?.textContent?.trim() ?? '',
    profileLink: card.querySelector('a[href*="/profile/"]')?.getAttribute('href') ?? ''
  })).filter(item => item.profileLink);
}
