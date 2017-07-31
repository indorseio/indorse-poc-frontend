export function fetchUserClaims({ userId }) {
  return {
    endpoint: 'getClaims',
    method: 'POST',
    data: { userId },
    requireAuth: true
  };
}

export function createClaim({ title, description: desc, proof }) {
  return {
    endpoint: 'claims',
    method: 'POST',
    data: { title, desc, proof },
    requireAuth: true
  };
}

export function fetchClaim({ claimId }) {
  return {
    endpoint: 'getClaims',
    method: 'POST',
    data: { claimId },
    requireAuth: true
  };
}
