import Raven from 'raven-js';

export default function installRaven() {
  const ravenDSN = `https://${process.env.REACT_APP_SENTRY_KEY}.io/${process.env.REACT_APP_SENTRY_PROJECT}`;
  Raven.config(ravenDSN).install();
  return Raven;
}
