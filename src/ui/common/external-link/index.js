import React from 'react';

export default ({ children, href, className, openInNewTab }) => {
  const linkProps = {
    href,
    className
  };

  if (openInNewTab) {
    linkProps.target = "blank";
    linkProps.rel = "noreferrer noopener"
  }

  return (
    <a {...linkProps}>
      {children || href}
    </a>
  );
}
