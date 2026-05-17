function getText(selector) {
  return document.querySelector(selector)?.textContent?.trim() ?? '';
}

function getItems(selector) {
  return Array.from(document.querySelectorAll(selector)).map(el => el.textContent?.trim() ?? '').filter(Boolean);
}

export function parseProfile() {
  return {
    source: 'Monster',
    sourceProfileUrl: window.location.href,
    name: getText('.candidate-name, .info-name'),
    currentTitle: getText('.current-title, .designation'),
    currentCompany: getText('.company-name'),
    totalExperience: getText('.experience, .totalExperience'),
    location: getText('.location, .candidate-location'),
    skills: getItems('.skills .skill, .skill-tags .tag'),
    email: getText('.email, .contact-email'),
    phone: getText('.phone, .contact-phone'),
    education: getItems('.education-item, .education-summary'),
    workHistory: getItems('.experience-item, .work-history .item')
  };
}

export function parseSearchResults() {
  const cards = Array.from(document.querySelectorAll('.card-wrapper, .search-card'));
  return cards.map(card => ({
    name: card.querySelector('.candidate-name, .candidate-title')?.textContent?.trim() ?? '',
    currentTitle: card.querySelector('.designation, .current-title')?.textContent?.trim() ?? '',
    location: card.querySelector('.location, .candidate-location')?.textContent?.trim() ?? '',
    profileLink: card.querySelector('a[href*="/profile/"]')?.getAttribute('href') ?? ''
  })).filter(item => item.profileLink);
}
