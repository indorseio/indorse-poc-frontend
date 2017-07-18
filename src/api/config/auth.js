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
