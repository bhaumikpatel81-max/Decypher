function matchEmails(text) {
  return Array.from(new Set((text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [])));
}

function matchPhones(text) {
  return Array.from(new Set((text.match(/(?:\+?\d{1,3}[\s-]?)?(?:\d{10}|\d{3}[\s-]\d{3}[\s-]\d{4}|\d{4}[\s-]\d{3}[\s-]\d{3})/g) || [])));
}

function getCandidateName() {
  const header = document.querySelector('h1, h2');
  return header?.textContent?.trim() ?? '';
}

function getSkills() {
  const bullets = Array.from(document.querySelectorAll('ul li, .skill, .tag, .pill'));
  return Array.from(new Set(bullets.map(item => item.textContent?.trim() ?? '').filter(Boolean).slice(0, 20)));
}

export function parseProfile() {
  const text = document.body.innerText;
  return {
    source: 'Generic',
    sourceProfileUrl: window.location.href,
    pageText: text,
    name: getCandidateName(),
    email: matchEmails(text)[0] ?? '',
    phone: matchPhones(text)[0] ?? '',
    skills: getSkills(),
    summary: text.slice(0, 400),
    location: document.querySelector('[class*="location"], [id*="location"]')?.textContent?.trim() ?? ''
  };
}

export function parseSearchResults() {
  const cards = Array.from(document.querySelectorAll('a, div, li')).filter(el => el.textContent?.length > 20).slice(0, 10);
  return cards.map(card => ({
    text: card.textContent?.trim() ?? '',
    profileLink: card.closest('a')?.href ?? ''
  })).filter(item => item.profileLink);
}
