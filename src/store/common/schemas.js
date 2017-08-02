import { schema } from 'normalizr';
// import moment from 'moment';

function parseBool(value) {
  return typeof value === 'string' ? value === 'true' : !!value
}

function parseApiDate(value) {
  // return value; // ? (moment.isMoment(value) ? value : moment(value)) : undefined;

  if (typeof value === 'string')
    return value;
  if (typeof value === 'number')
    return new Date(value * 1000).toISOString();
}

export const user = new schema.Entity('users');

export const votingRound = new schema.Entity('votingRounds', {}, {
  processStrategy: (entity, parent, key) => {
    const { claimId, endRegistration, endVoting, ...other } = entity;
    const result = {
      ...other,
      endRegistration: parseApiDate(endRegistration),
      endVoting: parseApiDate(endVoting),
    };
    if (claimId) result.claim = { id: claimId };
    return result;
  }
});

export const vote = new schema.Entity('votes', {}, {
  processStrategy: (entity, parent, key) => {
    const { claimId, votingRoundId, voterId, registered, registeredAt, endorsed, votedAt, ...other } = entity;
    const result = {
      ...other,
      registered: parseBool(registered),
      registeredAt: parseApiDate(registeredAt),
      endorsed: parseBool(endorsed),
      votedAt: parseApiDate(votedAt),
    };
    if (claimId) result.claim = { id: claimId };
    if (votingRoundId) result.votingRound = { id: votingRoundId };
    if (voterId) result.voter = { id: voterId };
    return result;
  }
});

export const claim = new schema.Entity('claims', {}, {
  processStrategy: (entity, parent, key) => {
    const { ownerId, ...other } = entity;
    const { votingRound, votingRounds, vote } = parent;

    const result = { ...other };
    if (ownerId) result.owner = { id: ownerId };
    if (votingRound) result.votingRound = votingRound;
    if (!result.votingRound && votingRounds && votingRounds.length) result.votingRound = votingRounds[0]; // For now
    if (vote) result.vote = { id: vote.id }
    return result;
  }
});

votingRound.define({
  claim: claim
});

vote.define({
  votingRound: votingRound,
  voter: user,
  claim: claim
});

claim.define({
  owner: user,
  votingRound: votingRound,
  vote: vote
});
