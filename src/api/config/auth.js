export function signUp({ name, email, password }) {
  return {
    endpoint: 'signup',
    method: 'POST',
    data: { name, email, password }
  };
}

export function verifyEmail({ email, verifyToken }) {
  return {
    endpoint: 'verify-email',
    method: 'POST',
    data: { email, verifyToken }
  };
}

export function login({ email, password }) {
  return {
    endpoint: 'login',
    method: 'POST',
    data: { email, password }
  };
}

export function logout() {
  return {
    endpoint: 'logout',
    method: 'POST',
    requireAuth: true,
  };
}
