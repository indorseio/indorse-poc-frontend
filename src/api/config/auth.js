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

export function changePassword({ oldPassword, newPassword }) {
  return {
    endpoint: 'password/change',
    method: 'POST',
    data: { oldPassword, newPassword },
    requireAuth: true,
  };
}

export function forgotPassword({ email }) {
  return {
    endpoint: 'password/forgot',
    method: 'POST',
    data: { email }
  };
}

export function resetPassword({ email, password, passwordToken: passToken }) {
  return {
    endpoint: 'password/reset',
    method: 'POST',
    data: { email, password, passToken },
  };
}
