// API_URL token is replaced at deploy time by CI/CD pipeline (e.g. sed or envsubst)
export const environment = {
  production: true,
  apiUrl: 'http://localhost:5000'
};
