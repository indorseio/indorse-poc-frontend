import shortid from 'shortid';

export const messageTypes = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'danger'
}

export function buildMessage({ id = shortid.generate(), kind = messageTypes.info, content, dismissable = true }) {
  return {
    id, kind, content, dismissable
  };
}
