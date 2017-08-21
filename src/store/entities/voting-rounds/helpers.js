import moment from 'moment';

export const STATUSES = {
  registration: 'registration',
  voting: 'voting',
  expired: 'expired'
};

export const calculateVotingRoundStatus = votingRound => {
  if (!votingRound)
    return null;

  if (votingRound.endRegistration && moment().isBefore(votingRound.endRegistration)) {
    return STATUSES.registration;
  } else if (votingRound.endVoting && moment().isBefore(votingRound.endVoting)) {
    return STATUSES.voting;
  } else {
    return STATUSES.expired;
  }
};

export const isRegistrationEndingSoon = (votingRound, status, threshold) => {
  return (
    votingRound &&
    votingRound.endRegistration &&
    status === STATUSES.registration &&
    moment().add(threshold, 'ms').isAfter(moment(votingRound.endRegistration))
  );
}

export const isVotingEndingSoon = (votingRound, status, threshold) => {
  return (
    votingRound &&
    votingRound.endVoting
    && status === STATUSES.voting &&
    moment().add(threshold, 'ms').isAfter(votingRound.endVoting)
  );
}
