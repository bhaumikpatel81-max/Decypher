import { getAuthState, saveAuthState, clearAuthState, saveApiBase, getApiBase } from '../utils/auth.js';
import { logoutScout } from '../utils/api.js';

const statusLabel = document.getElementById('popup-status');
const connectedHost = document.getElementById('connected-host');
const loggedInUser = document.getElementById('logged-in-user');
const activeRequisition = document.getElementById('active-requisition');
const todayCount = document.getElementById('today-count');
const weekCount = document.getElementById('week-count');
const loginSection = document.getElementById('login-section');
const backendHostInput = document.getElementById('backend-host');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginButton = document.getElementById('login-button');
const loginError = document.getElementById('login-error');
const openDashboardButton = document.getElementById('open-dashboard');
const logoutButton = document.getElementById('logout');

async function initPopup() {
  const apiBase = await getApiBase();
  backendHostInput.value = apiBase;

  const auth = await getAuthState();
  if (auth?.token) {
    loginSection.style.display = 'none';
    connectedHost.textContent = new URL(apiBase).hostname;
    loggedInUser.textContent = auth.user?.fullName || auth.user?.email || 'Authenticated';
    statusLabel.textContent = 'Connected';
    await refreshStats();
  } else {
    loginSection.style.display = 'block';
    connectedHost.textContent = 'Not connected';
    loggedInUser.textContent = '—';
    statusLabel.textContent = 'Sign in to connect';
    activeRequisition.innerHTML = '<option value="">Login to load requisitions</option>';
  }
}

async function refreshStats() {
  const storage = typeof chrome !== 'undefined' ? chrome.storage.local : browser.storage.local;
  storage.get(['scoutCounts'], (result) => {
    const counts = result.scoutCounts || { today: 0, week: 0 };
    todayCount.textContent = counts.today || '0';
    weekCount.textContent = counts.week || '0';
  });
}

async function login() {
  const apiBase = backendHostInput.value.trim() || 'https://your-decypher-backend.com';
  saveApiBase(apiBase);
  loginError.textContent = '';

  const email = loginEmail.value.trim();
  const password = loginPassword.value;

  if (!email || !password) {
    loginError.textContent = 'Email and password are required.';
    return;
  }

  try {
    const response = await fetch(`${apiBase}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      loginError.textContent = error?.error || 'Unable to authenticate. Check credentials.';
      return;
    }

    const auth = await response.json();
    await saveAuthState(auth);
    await initPopup();
  } catch (err) {
    loginError.textContent = err?.message || 'Network error during login.';
  }
}

async function logout() {
  await clearAuthState();
  await logoutScout();
  loginSection.style.display = 'block';
  connectedHost.textContent = 'Not connected';
  loggedInUser.textContent = '—';
  statusLabel.textContent = 'Signed out';
  activeRequisition.innerHTML = '<option value="">Login to load requisitions</option>';
  todayCount.textContent = '0';
  weekCount.textContent = '0';
}

async function openDashboard() {
  const apiBase = await getApiBase();
  const url = apiBase.replace(/\/+$/, '');
  chrome.tabs.create({ url });
}

loginButton.addEventListener('click', login);
logoutButton.addEventListener('click', logout);
openDashboardButton.addEventListener('click', openDashboard);

initPopup();
