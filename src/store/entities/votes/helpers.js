import moment from 'moment';

export const STATUSES = {
  registered: 'registered',
  pending_registration: 'pending_registration',
  registration_missed: 'registration_missed',
  endorsed: 'endorsed',
  flagged: 'flagged',
  pending_vote: 'pending_vote',
  vote_missed: 'vote_missed'
};

export const calculateVoteStatus = vote => {
  const { votingRound, claim } = vote;
  if (!votingRound || !claim)
    return null;

  if (votingRound.endRegistration && moment().isBefore(votingRound.endRegistration)) {
    return vote.registered ? STATUSES.registered : STATUSES.pending_registration;
  } else if (votingRound.endVoting) {
    if (moment().isBefore(votingRound.endVoting)) {
      if (!vote.registered) {
        return STATUSES.registration_missed;
      } else if (vote.votedAt) {
        return vote.endorsed ? STATUSES.endorsed : STATUSES.flagged;
      } else {
        return STATUSES.pending_vote;
      }
    } else {
      if (vote.votedAt) {
        return vote.endorsed ? STATUSES.endorsed : STATUSES.flagged;
      } else {
        return STATUSES.vote_missed;
      }
    }
  }
};
