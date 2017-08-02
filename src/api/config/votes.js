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

export function endorse({ claimId }) {
  return {
    endpoint: `votes/${claimId}/endorse`,
    method: 'POST',
    requireAuth: true
  }
}

export function flag({ claimId }) {
  return {
    endpoint: `votes/${claimId}/flag`,
    method: 'POST',
    requireAuth: true
  }
}
