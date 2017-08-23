import React, { Component } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import Chip from 'material-ui/Chip';
import autoBind from 'react-autobind';

import routeTemplates from 'ui/common/routes/templates';
import themeConfig from 'ui/theme/config';
import { STATUSES as CLAIM_STATUSES } from 'store/entities/claims/helpers';
import styles from './index.module.scss';
import newClaimImg from './new-claim.png';
import messages from 'ui/claims/messages';

const localMessages = defineMessages({
  newClaim: {
    id: "claims.grid.links.new",
    defaultMessage: "Add Claim"
  }
})

class ClaimsGrid extends Component {
  static propTypes = {
    claims: PropTypes.array,
    showNewClaimLink: PropTypes.bool,
    minimumClaimCount: PropTypes.number,
    className: PropTypes.string
  }

  constructor(props) {
    super(props);

    autoBind(this);
  }

  renderStatus(claim) {
    const { intl: { formatMessage } } = this.props;

    switch (claim.status) {
      case CLAIM_STATUSES.registration:
      case CLAIM_STATUSES.voting:
        return (<Chip backgroundColor={themeConfig.palette.info} labelColor={themeConfig.palette.white}>
          <Avatar
            backgroundColor={themeConfig.palette.info}
            color={themeConfig.palette.white}
            icon={<FontIcon className="material-icons">timer</FontIcon>} />
          {formatMessage(messages.pending)}
        </Chip>);
      case CLAIM_STATUSES.endorsed:
        return (<Chip backgroundColor={themeConfig.palette.success} labelColor={themeConfig.palette.white}>
          <Avatar
            backgroundColor={themeConfig.palette.success}
            color={themeConfig.palette.white}
            icon={<FontIcon className="material-icons">check circle</FontIcon>}
          />
          {formatMessage(messages.endorsed)}
        </Chip>);
      case CLAIM_STATUSES.flagged:
        return (<Chip backgroundColor={themeConfig.palette.danger} labelColor={themeConfig.palette.white}>
          <Avatar
            backgroundColor={themeConfig.palette.danger}
            color={themeConfig.palette.white}
            icon={<FontIcon className="material-icons">close</FontIcon>}
          />
          {formatMessage(messages.flagged)}
        </Chip>);
      case CLAIM_STATUSES.unverified:
        return (<Chip backgroundColor={themeConfig.palette.warning} labelColor={themeConfig.palette.white}>
          <Avatar
            backgroundColor={themeConfig.palette.warning}
            color={themeConfig.palette.white}
            icon={<FontIcon className="material-icons">warning</FontIcon>} />
          {formatMessage(messages.unverified)}
        </Chip>);
      default:
        return null;
    }
  }

  renderClaim(claim) {
    const { skill } = claim;

    return (
      <Link to={routeTemplates.claims.details.replace(':id', claim.id)} className={classnames("card text-center border-0", styles.claimCard)}>
        <div className="card-img-top">
          <img src={skill.badge} alt={skill.id} className={styles.claimSkillImg} />
        </div>
        <div className="card-block">
          <h4 className="card-title">{skill.name}</h4>
          <div className="d-flex justify-content-center">
            {this.renderStatus(claim)}
          </div>
        </div>
      </Link>
    );
  }

  renderNewClaimLink() {
    const { intl: { formatMessage } } = this.props;

    return (
      <Link to={routeTemplates.claims.new} className={classnames("card text-center border-0", styles.claimCard)}>
        <div className="card-img-top">
          <img src={newClaimImg} alt={formatMessage(localMessages.newClaim)} className={styles.claimSkillImg} />
        </div>
      </Link>
    );
  }

  render() {
    const { claims, showNewClaimLink, minimumClaimCount, className } = this.props;
    const claimCount = claims ? claims.length : 0;

    return (
      <div className={classnames("row", className)}>
        {claims.map(claim => <div key={claim.id} className="col-12 col-sm-6 col-md-4 mb-5">
          {this.renderClaim(claim)}
        </div>)}
        {showNewClaimLink && Array.apply(null, Array(Math.max(1, minimumClaimCount - claimCount))).map((_, index) => <div key={`new-claim-${index}`} className="col-12 col-sm-6 col-md-4 mb-5">
          {this.renderNewClaimLink()}
        </div>)}
      </div>
    );
  }
}

export default injectIntl(ClaimsGrid);
