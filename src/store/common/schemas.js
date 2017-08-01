import { schema } from 'normalizr';

export const user = new schema.Entity('users');

export const claim = new schema.Entity('claims', {
  owner: user,
}, {
  processStrategy: (entity, parent, key) => {
    const { ownerid, ...other } = entity;
    return { ...other, owner: { id: ownerid } }
  }
});

export const votingRound = new schema.Entity('votingRounds', {
  claim: claim
}, {
  processStrategy: entity => {
    const { claimId, ...other } = entity;
    return {
      ...other,
      claim: { id: claimId }
    };
  }
});

export const vote = new schema.Entity('votes', {
  claim: claim,
  votingRound: votingRound,
  voter: user
}, {
  processStrategy: entity => {
    const { claimId, votingRoundId, voterId, ...other } = entity;
    return { ...other, claim: { id: claimId }, votingRound: { id: votingRoundId }, voter: { id: voterId } }
  }
});
