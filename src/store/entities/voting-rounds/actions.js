import * as actionTypes from './action-types';

import { defineAction } from 'store/common/action-helpers';

export const setVotingRoundStatuses = ({ statusesById, statusUpdatedAt }) => defineAction(actionTypes.SET_VOTING_ROUND_STATUSES, { statusesById, statusUpdatedAt });

export const setVotingRoundStatus = ({ votingRoundId, status, statusUpdatedAt }) => defineAction(actionTypes.SET_VOTING_ROUND_STATUS, { votingRoundId, status, statusUpdatedAt });
