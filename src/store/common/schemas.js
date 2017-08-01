import { schema } from 'normalizr';

export const user = new schema.Entity('users');

export const votingRound = new schema.Entity('votingRounds', {}, {
  processStrategy: (entity, parent, key) => {
    const { claimId, ...other } = entity;
    return {
      ...other,
      claim: claimId
    };
  }
});

export const vote = new schema.Entity('votes', {}, {
  processStrategy: (entity, parent, key) => {
    const { claimId, votingRoundId, voterId, ...other } = entity;
    return { ...other, claim: { id: claimId }, votingRound: { id: votingRoundId }, voter: { id: voterId } }
  }
});

export const claim = new schema.Entity('claims', {}, {
  processStrategy: (entity, parent, key) => {
    const { ownerId, ...other } = entity;
    const { votingRound, vote } = parent;

    const result = { ...other };
    if (ownerId) result.owner = { id: ownerId };
    if (votingRound) result.activeVotingRound = { id: votingRound.id };
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
  votingRounds: [votingRound],
  activeVotingRound: votingRound,
  vote: vote
});
