function getText(selector) {
  return document.querySelector(selector)?.textContent?.trim() ?? '';
}

function getItems(selector) {
  return Array.from(document.querySelectorAll(selector)).map(el => el.textContent?.trim() ?? '').filter(Boolean);
}

export function parseProfile() {
  return {
    source: 'IIMJobs',
    sourceProfileUrl: window.location.href,
    name: getText('.candidate-name'),
    currentRole: getText('.current-role'),
    company: getText('.current-company'),
    totalExperience: getText('.exp-years'),
    location: getText('.location'),
    skills: getItems('.skills-list .skill-item'),
    education: Array.from(document.querySelectorAll('.education')).map(section => ({
      degree: section.querySelector('.degree')?.textContent?.trim() ?? '',
      institution: section.querySelector('.institute')?.textContent?.trim() ?? '',
      year: section.querySelector('.year')?.textContent?.trim() ?? ''
    })),
    workHistory: getItems('.work-experience .exp-item')
  };
}

export function parseSearchResults() {
  const cards = Array.from(document.querySelectorAll('.candidate-card, .search-result-card'));
  return cards.map(card => ({
    name: card.querySelector('.candidate-name')?.textContent?.trim() ?? '',
    currentTitle: card.querySelector('.current-role')?.textContent?.trim() ?? '',
    company: card.querySelector('.current-company')?.textContent?.trim() ?? '',
    profileLink: card.querySelector('a[href*="/candidate/"]')?.getAttribute('href') ?? ''
  })).filter(item => item.profileLink);
}
