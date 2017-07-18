import React from 'react';
import { Helmet } from "react-helmet";
import { injectIntl, defineMessages } from 'react-intl';

import brand from 'resources/brand';

const messages = defineMessages({
  title: {
    id: 'app.helmet.title',
    defaultMessage: "Indorse - Ethereum based Decentralized Professional Network"
  },
  metaDescription: {
    id: 'app.helmet.meta.description',
    defaultMessage: "Indorse aims to give back ownership of the data to the user, and allow them to profit from sharing their skills and activities on the platform."
  },
  metaOgSiteName: {
    id: 'app.helmet.meta.og.siteName',
    defaultMessage: "Indorse - Decentralised Professional Network"
  },
});

const Element = ({ intl: { formatMessage } }) => {
  return (
    <Helmet>
      <title>{formatMessage(messages.title)}</title>
      <meta name="description" content={formatMessage(messages.metaDescription)} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={formatMessage(messages.title)} />
      <meta property="og:description" content={formatMessage(messages.metaDescription)} />
      <meta property="og:url" content="https://www.indorse.io/" />
      <meta property="og:site_name" content={formatMessage(messages.metaOgSiteName)} />
      <meta property="og:image" content={`https://indorse.io${brand.logo.meta}`} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={formatMessage(messages.title)} />
      <meta name="twitter:description" content={formatMessage(messages.metaDescription)} />
      <meta name="twitter:image" content={`https://indorse.io${brand.logo.meta}`} />
      <meta itemProp="name" content={formatMessage(messages.title)} />
      <meta itemProp="description" content={formatMessage(messages.metaDescription)} />
    </Helmet>
  );
};

export default injectIntl(Element);
