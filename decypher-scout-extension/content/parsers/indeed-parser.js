function readText(selector) {
  return document.querySelector(selector)?.textContent?.trim() ?? '';
}

function readItems(selector) {
  return Array.from(document.querySelectorAll(selector)).map(el => el.textContent?.trim() ?? '').filter(Boolean);
}

export function parseProfile() {
  return {
    source: 'Indeed',
    sourceProfileUrl: window.location.href,
    name: readText('[data-testid="applicant-name"], .icl-u-textColor--primary h1'),
    headline: readText('.icl-u-textColor--secondary'),
    location: readText('[data-testid="resume-contact-location"]'),
    email: readText('[data-testid="resume-contact-email"]'),
    phone: readText('[data-testid="resume-contact-phone"]'),
    skills: readItems('[data-testid="resume-skills"] ul li'),
    workHistory: Array.from(document.querySelectorAll('[data-testid="resume-work-experience"] > div')).map(item => ({
      company: item.querySelector('h4')?.textContent?.trim() ?? '',
      role: item.querySelector('h3')?.textContent?.trim() ?? '',
      duration: item.querySelector('p:first-of-type')?.textContent?.trim() ?? '',
      description: item.querySelector('p:last-of-type')?.textContent?.trim() ?? ''
    })),
    education: readItems('[data-testid="resume-education"] > div'),
    profilePhotoUrl: document.querySelector('img[alt*="Resume"]')?.getAttribute('src') ?? ''
  };
}

export function parseSearchResults() {
  const cards = Array.from(document.querySelectorAll('.resumeSearchCard, .applicantCard'));
  return cards.map(card => ({
    name: card.querySelector('.applicantName, h2')?.textContent?.trim() ?? '',
    location: card.querySelector('.location, .applicantLocation')?.textContent?.trim() ?? '',
    profileLink: card.querySelector('a[href*="/resume/"]')?.getAttribute('href') ?? ''
  })).filter(item => item.profileLink);
}
