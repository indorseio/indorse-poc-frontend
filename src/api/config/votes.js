export function fetchCurrentUserVotes() {
  return {
    endpoint: 'votes',
    method: 'GET',
    requireAuth: true
  };
}
