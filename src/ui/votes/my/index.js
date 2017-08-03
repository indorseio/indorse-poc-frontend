import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { selectCurrentUserId } from 'store/auth/selectors';
import { selectCurrentUserVotes } from 'store/entities/votes/selectors';
import { fetchCurrentUserVotes } from 'store/entities/votes/actions';

import VotesTable from 'ui/votes/table';

class Votes extends Component {
  static propTypes = {
    currentUserId: PropTypes.string,
    votes: PropTypes.array,
    fetchCurrentUserVotes: PropTypes.shape({
      request: PropTypes.func.isRequired
    }).isRequired
  }

  componentDidMount() {
    const { fetchCurrentUserVotes } = this.props;
    // TODO: Keep fetching/fetched state
    fetchCurrentUserVotes.request();
  }

  render() {
    return (
      <article className="container">
        <header className="mt-4 d-flex align-items-center justify-content-between">
          <h1 className="text-primary">
            <FormattedMessage id="dashboard.votes.title" defaultMessage="My Votes" />
          </h1>
        </header>
        <main>
          <VotesTable votes={this.props.votes} />
        </main>
      </article>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUserId: selectCurrentUserId(state),
    votes: selectCurrentUserVotes(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCurrentUserVotes: {
      request: bindActionCreators(fetchCurrentUserVotes.request, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Votes));
