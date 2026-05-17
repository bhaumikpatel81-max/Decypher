export function detectPortal() {
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

export function detectPageType(portal) {
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
