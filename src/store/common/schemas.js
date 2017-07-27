import { schema } from 'normalizr';

export const user = new schema.Entity('users');

export const claim = new schema.Entity('claims', {
  owner: user
}, {
  processStrategy: entity => {
    const { ownerid, ...other } = entity;
    return { ...other, owner: { id: ownerid } }
  }
});
