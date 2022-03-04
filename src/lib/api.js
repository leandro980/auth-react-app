import axios from "axios";

// URL Endpoint di base dal quale costruire le richieste
const ENDPOINT_BASE_URL = "https://identitytoolkit.googleapis.com/v1";
// Chiave dell'applicazione per l'utilizzo dell'API
const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

// Helper function per la costruzione della richiesta
const buildDefaultRequest = (resource, config = null) => {
  return {
    url: `${ENDPOINT_BASE_URL}/${resource}?key=${API_KEY}`,
    config: config
      ? config
      : {
          headers: {
            "Content-Type": "application/json",
          },
          validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
          },
        },
  };
};

/**
 * API per il login
 *
 * @param {string} email
 * @param {string} password
 * @returns {object}
 */
export const signIn = async (email, password) => {
  const { url, config } = buildDefaultRequest("accounts:signInWithPassword");

  const response = await axios.post(
    url,
    {
      email,
      password,
      returnSecureToken: true,
    },
    config
  );

  return response;
};

/**
 * API per la registrazione dell'utente
 *
 * @param {string} email
 * @param {string} password
 * @returns {object}
 */
export const signUp = async (email, password) => {
  const { url, config } = buildDefaultRequest("accounts:signUp");

  const response = await axios.post(
    url,
    {
      email,
      password,
      returnSecureToken: true,
    },
    config
  );

  return response;
};

/**
 * API per il cambio password
 *
 * @param {string} token
 * @param {string} password
 * @returns
 */
export const changePassword = async (idToken, password) => {
  const { url, config } = buildDefaultRequest("accounts:update");

  const response = await axios.post(
    url,
    {
      idToken,
      password,
      returnSecureToken: false,
    },
    config
  );

  return response;
};
