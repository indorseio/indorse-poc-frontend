import { defineApiActionTypes } from 'store/common/action-helpers';

export const FETCH_USER_CLAIMS = defineApiActionTypes('claims/FETCH_USER_CLAIMS');

export const CREATE_CLAIM = defineApiActionTypes('claims/CREATE');

export const FETCH_CLAIM = defineApiActionTypes('claims/FETCH_SINGLE');
