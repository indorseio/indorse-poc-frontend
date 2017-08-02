export function fetchCurrentUserVotes() {
  return {
    endpoint: 'votes',
    method: 'GET',
    requireAuth: true
  };
}

export function registerToVote({ claimId }) {
  return {
    endpoint: `votes/${claimId}/register`,
    method: 'POST',
    requireAuth: true
  }
}
