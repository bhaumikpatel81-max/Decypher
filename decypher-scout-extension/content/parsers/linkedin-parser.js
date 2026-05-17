function readText(selector) {
  const el = document.querySelector(selector);
  return el?.textContent?.trim() ?? '';
}

function readAllText(selector) {
  return Array.from(document.querySelectorAll(selector)).map(x => x.textContent?.trim() ?? '').filter(Boolean);
}

export function parseProfile() {
  return {
    source: 'LinkedIn',
    sourceProfileUrl: window.location.href,
    name: readText('.pv-text-details__left-panel h1, .artdeco-entity-lockup__title'),
    headline: readText('.pv-text-details__left-panel .text-body-medium'),
    location: readText('.pv-text-details__left-panel .text-body-small:last-child'),
    connectionDegree: readText('.dist-value'),
    about: readText('#about ~ div .full-width span'),
    experience: Array.from(document.querySelectorAll('#experience ~ div .artdeco-list__item')).map(item => ({
      role: item.querySelector('.t-14.t-bold span')?.textContent?.trim() ?? '',
      company: item.querySelector('.t-14.t-normal span')?.textContent?.trim() ?? '',
      duration: item.querySelector('.t-14.t-normal.t-black--light span')?.textContent?.trim() ?? '',
      description: item.querySelector('.pv-shared-text-with-see-more span')?.textContent?.trim() ?? ''
    })),
    education: Array.from(document.querySelectorAll('#education ~ div .artdeco-list__item')).map(item => ({
      school: item.querySelector('.t-14.t-bold span')?.textContent?.trim() ?? '',
      degree: item.querySelector('.t-14.t-normal span')?.textContent?.trim() ?? ''
    })),
    skills: readAllText('#skills ~ div .artdeco-list__item .t-bold span'),
    email: document.querySelector('#contact-info-section [href^="mailto:"]')?.getAttribute('href')?.replace('mailto:', '') ?? '',
    profilePhotoUrl: document.querySelector('.pv-top-card-profile-picture__image')?.getAttribute('src') ?? ''
  };
}

export function parseSearchResults() {
  const cards = Array.from(document.querySelectorAll('.search-result__info, .reusable-search__entity-result-item'));
  return cards.map(card => ({
    name: card.querySelector('.actor-name, .entity-result__title-text a span')?.textContent?.trim() ?? '',
    currentTitle: card.querySelector('.subline-level-1, .entity-result__primary-subtitle')?.textContent?.trim() ?? '',
    location: card.querySelector('.subline-level-2, .entity-result__secondary-subtitle')?.textContent?.trim() ?? '',
    profileLink: card.querySelector('a[href*="/in/"]')?.getAttribute('href') ?? ''
  })).filter(item => item.profileLink);
}
