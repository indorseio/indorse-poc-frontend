export function fetchUsers() {
  return {
    endpoint: 'users/1/100', // TODO: Accept pageNo and pageSize
    method: 'GET',
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

export function disapproveUser({ userId: approveUserId }) {
  return {
    endpoint: 'users/disapprove',
    method: 'POST',
    data: { approveUserId },
    requireAuth: true
  };
}
