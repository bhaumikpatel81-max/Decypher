export async function fetchScoutApi(path, method = 'GET', body = null) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: 'fetchApi', path, method, body }, (response) => {
      resolve(response);
    });
  });
}

export async function logoutScout() {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: 'logout' }, (response) => {
      resolve(response);
    });
  });
}
