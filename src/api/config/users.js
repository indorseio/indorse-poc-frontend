export function fetchUsers() {
  return {
    endpoint: 'users',
    method: 'POST',
    requireAuth: true
  };
}
