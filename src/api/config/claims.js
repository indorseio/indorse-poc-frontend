export function fetchUserClaims({ userId }) {
  return {
    endpoint: 'getClaims',
    method: 'POST',
    data: { userId },
    requireAuth: true
  };
}
