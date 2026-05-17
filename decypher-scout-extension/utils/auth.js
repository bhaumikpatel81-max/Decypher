const storage = typeof browser !== 'undefined' ? browser.storage.local : chrome.storage.local;

function getStorage(keys) {
  return new Promise((resolve) => {
    storage.get(keys, (result) => {
      resolve(result || {});
    });
  });
}

function setStorage(items) {
  return new Promise((resolve) => {
    storage.set(items, () => {
      resolve();
    });
  });
}

function removeStorage(keys) {
  return new Promise((resolve) => {
    storage.remove(keys, () => {
      resolve();
    });
  });
}

export async function saveAuthState(auth) {
  await setStorage({ decypherAuth: auth });
}

export async function getAuthState() {
  const result = await getStorage(['decypherAuth']);
  return result.decypherAuth || null;
}

export async function clearAuthState() {
  await removeStorage(['decypherAuth']);
}

export async function isLoggedIn() {
  const auth = await getAuthState();
  return Boolean(auth?.token);
}

export async function saveApiBase(apiBase) {
  await setStorage({ decypherScoutConfig: { apiBase } });
}

export async function getApiBase() {
  const result = await getStorage(['decypherScoutConfig']);
  return result.decypherScoutConfig?.apiBase || 'https://your-decypher-backend.com';
}

export async function clearApiConfig() {
  await removeStorage(['decypherScoutConfig']);
}
