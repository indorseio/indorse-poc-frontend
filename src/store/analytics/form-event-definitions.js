import { actionTypes as formActionTypes } from 'redux-form';
import { getFormSyncErrors, getFormAsyncErrors, getFormSubmitErrors } from 'redux-form';

function getErrorEvents(formName, errors) {
  return Object.keys(errors || {}).reduce((events, field) => {
    return events.concat(errors[field].map(error => ({
      hitType: 'event',
      eventCategory: 'form-error',
      eventAction: `${formName}/${field}`,
      eventLabel: error
    })));
  }, []);
}

const formSubmitFailed = (action, prevState, nextState) => {
  const form = action.meta.form;
  const isError = action.error;

  if (!isError)
    return null;

  const syncErrors = getFormSyncErrors(form)(nextState);
  const asyncErrors = getFormAsyncErrors(form)(nextState);
  const submitErrors = getFormSubmitErrors(form)(nextState);

  const events = [
    ...getErrorEvents(form, syncErrors),
    ...getErrorEvents(form, asyncErrors),
    ...getErrorEvents(form, submitErrors)
  ];

  return events;
}

export default {
  [formActionTypes.SET_SUBMIT_FAILED]: formSubmitFailed
};
