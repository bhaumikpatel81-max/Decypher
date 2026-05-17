import { getAuthState, saveAuthState, clearAuthState, getApiBase } from '../utils/auth.js';

const defaultApiBase = 'https://your-decypher-backend.com';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ scoutCounts: { today: 0, week: 0 } });
});

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message?.type === 'fetchApi') {
    const result = await callApi(message.path, message.method, message.body);
    sendResponse(result);
    return true;
  }

  if (message?.type === 'logout') {
    await clearAuthState();
    sendResponse({ success: true });
    return true;
  }
});

async function callApi(path, method = 'GET', body = null) {
  const auth = await getAuthState();
  if (!auth?.token) {
    return { error: 'not_authenticated' };
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${auth.token}`
  };

  try {
    const apiBase = await getApiBase();
    const response = await fetch(`${apiBase}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'omit'
    });

    if (response.status === 401) {
      if (auth.refreshToken) {
        const refreshResult = await refreshAuthToken(auth.refreshToken);
        if (refreshResult?.token) {
          await saveAuthState(refreshResult);
          headers.Authorization = `Bearer ${refreshResult.token}`;
          return await fetchApiOnce(path, method, body, headers);
        }
      }
      return { error: 'unauthorized' };
    }

    return await response.json();
  } catch (err) {
    return { error: err?.message || 'network_error' };
  }
}

async function fetchApiOnce(path, method, body, headers) {
  const apiBase = await getApiBase();
  const response = await fetch(`${apiBase}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'omit'
  });
  return await response.json();
}

async function refreshAuthToken(refreshToken) {
  try {
    const apiBase = await getApiBase();
    const response = await fetch(`${apiBase}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}
