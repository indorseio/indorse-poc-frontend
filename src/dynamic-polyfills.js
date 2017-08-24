export default function loadPolyfills() {
  const fillIntl = () => new Promise((resolve) => {
    if ('Intl' in window) return resolve();

    require.ensure([], () => {
      require('intl');
      require('intl/locale-data/jsonp/en.js');

      resolve();
    }, 'Intl');
  });

  return Promise.all([
    fillIntl()
  ]);
}
