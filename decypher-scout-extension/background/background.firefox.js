const defaultApiBase = 'https://your-decypher-backend.com';

function getStorage(keys) {
  return browser.storage.local.get(keys);
}

async function getAuthState() {
  const result = await getStorage(['decypherAuth']);
  return result.decypherAuth || null;
}

async function saveAuthState(auth) {
  await browser.storage.local.set({ decypherAuth: auth });
}

async function clearAuthState() {
  await browser.storage.local.remove(['decypherAuth']);
}

async function getApiBase() {
  const result = await getStorage(['decypherScoutConfig']);
  return result.decypherScoutConfig?.apiBase || defaultApiBase;
}

browser.runtime.onInstalled.addListener(() => {
  browser.storage.local.set({ scoutCounts: { today: 0, week: 0 } });
});

browser.runtime.onMessage.addListener(async (message) => {
  if (message?.type === 'fetchApi') {
    return await callApi(message.path, message.method, message.body);
  }

  if (message?.type === 'logout') {
    await clearAuthState();
    return { success: true };
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
      body: body ? JSON.stringify(body) : undefined
    });

    if (response.status === 401 && auth.refreshToken) {
      const refreshResult = await refreshAuthToken(auth.refreshToken);
      if (refreshResult?.token) {
        await saveAuthState(refreshResult);
        headers.Authorization = `Bearer ${refreshResult.token}`;
        return await fetchApiOnce(path, method, body, headers);
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
    body: body ? JSON.stringify(body) : undefined
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
