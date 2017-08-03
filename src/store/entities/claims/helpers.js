import moment from 'moment';

export const STATUSES = {
  registration: 'registration',
  voting: 'voting',
  endorsed: 'endorsed',
  flagged: 'flagged',
  unverified: 'unverified'
};

export const calculateClaimStatus = claim => {
  const { votingRound } = claim;
  if (!votingRound)
    return null;

  if (votingRound.endRegistration && moment().isBefore(votingRound.endRegistration)) {
    return STATUSES.registration;
  } else if (votingRound.endVoting) {
    if (moment().isBefore(votingRound.endVoting))
      return STATUSES.voting;
    else if (claim.endorseCount || claim.flagCount) {
      const endorsements = claim.endorseCount || 0;
      const flags = claim.flagCount || 0;
      if (endorsements > flags) {
        return STATUSES.endorsed;
      } else if (endorsements < flags) {
        return STATUSES.flagged;
      }
    }

    return STATUSES.unverified;
  }
};
