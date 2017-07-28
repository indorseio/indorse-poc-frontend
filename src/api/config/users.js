export function fetchUsers() {
  return {
    endpoint: 'users',
    method: 'POST',
    requireAuth: true
  };
}

export function approveUser({ userId: approveUserId }) {
  return {
    endpoint: 'users/approve',
    method: 'POST',
    data: { approveUserId },
    requireAuth: true
  };
}

export function disapproveUser({ userId: disapproveUserId }) {
  return {
    endpoint: 'users/disapprove',
    method: 'POST',
    data: { disapproveUserId },
    requireAuth: true
  };
}
