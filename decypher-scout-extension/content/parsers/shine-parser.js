function getText(selector) {
  return document.querySelector(selector)?.textContent?.trim() ?? '';
}

function getItems(selector) {
  return Array.from(document.querySelectorAll(selector)).map(el => el.textContent?.trim() ?? '').filter(Boolean);
}

export function parseProfile() {
  return {
    source: 'Shine',
    sourceProfileUrl: window.location.href,
    name: getText('.candidate-name, .profile-name'),
    currentTitle: getText('.designation, .current-title'),
    currentCompany: getText('.current-company'),
    totalExperience: getText('.experience, .total-experience'),
    location: getText('.location, .current-location'),
    skills: getItems('.skills-list .skill-item'),
    email: getText('.email-section'),
    phone: getText('.phone-section'),
    education: getItems('.education-section .edu-detail'),
    workHistory: getItems('.work-history .exp-item')
  };
}

export function parseSearchResults() {
  const cards = Array.from(document.querySelectorAll('.resume-card, .profile-card'));
  return cards.map(card => ({
    name: card.querySelector('.candidate-name, .title')?.textContent?.trim() ?? '',
    currentTitle: card.querySelector('.current-title, .designation')?.textContent?.trim() ?? '',
    location: card.querySelector('.location')?.textContent?.trim() ?? '',
    profileLink: card.querySelector('a[href*="/profile/"]')?.getAttribute('href') ?? ''
  })).filter(item => item.profileLink);
}
