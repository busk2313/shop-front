import Keycloak from 'keycloak-js'

const TOKEN_MIN_VALIDITY_SECONDS = 5

const options = {
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
}

const keycloak = new Keycloak(options)

export function setupKeycloak(initApplicationCallback: Function) {
  keycloak.init({ onLoad: 'login-required' }).then((auth) => {
    if (auth)
      initApplicationCallback()
    else
      window.location.reload()
  }).catch((e) => {
    console.error(`Keycloak authentication failure: ${e}`)
  })
}

export async function updateToken() {
  await keycloak.updateToken(TOKEN_MIN_VALIDITY_SECONDS)
  return keycloak.token
}

export { keycloak }
