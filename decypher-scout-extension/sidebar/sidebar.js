import { getAuthState, getApiBase } from '../utils/auth.js';
import { fetchScoutApi } from '../utils/api.js';

const sidebarHost = document.getElementById('sidebar-host');
const sidebarUser = document.getElementById('sidebar-user');
const sidebarToday = document.getElementById('sidebar-today');
const sidebarWeek = document.getElementById('sidebar-week');
const sidebarRequisitions = document.getElementById('sidebar-requisitions');
const openDashboardButton = document.getElementById('sidebar-open-dashboard');

async function initSidebar() {
  const apiBase = await getApiBase();
  sidebarHost.textContent = apiBase.replace(/https?:\/\//, '');

  const auth = await getAuthState();
  if (!auth?.token) {
    sidebarUser.textContent = 'Not signed in';
    sidebarRequisitions.innerHTML = '<li>Open the scout popup and sign in.</li>';
    return;
  }

  sidebarUser.textContent = auth.user?.fullName || auth.user?.email || 'Signed in';
  await loadStats();
  await loadRequisitions();
}

async function loadStats() {
  const counts = await getScoutCounts();
  sidebarToday.textContent = String(counts.today || 0);
  sidebarWeek.textContent = String(counts.week || 0);
}

function getScoutCounts() {
  return new Promise((resolve) => {
    const storage = typeof chrome !== 'undefined' ? chrome.storage.local : browser.storage.local;
    storage.get(['scoutCounts'], (result) => {
      resolve(result.scoutCounts || { today: 0, week: 0 });
    });
  });
}

async function loadRequisitions() {
  const result = await fetchScoutApi('/api/scout/requisitions', 'GET');
  if (!Array.isArray(result) || result.length === 0) {
    sidebarRequisitions.innerHTML = '<li>No open requisitions found.</li>';
    return;
  }
  sidebarRequisitions.innerHTML = result.slice(0, 5).map(req => `<li>${req.title} (${req.status || 'Open'})</li>`).join('');
}

async function openDashboard() {
  const apiBase = await getApiBase();
  const url = apiBase.replace(/\/+$/, '');
  const runtime = typeof chrome !== 'undefined' ? chrome : browser;
  runtime.tabs.create({ url });
}

openDashboardButton.addEventListener('click', openDashboard);
initSidebar();
