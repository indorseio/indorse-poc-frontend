import React, { Component } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";

import { selectCurrentUserId, selectCurrentUserVotesFetched } from 'store/auth/selectors';
import { selectCurrentUserVotes } from 'store/entities/votes/selectors';
import { fetchCurrentUserVotes } from 'store/entities/votes/actions';

import VotesTable from 'ui/votes/table';
import Loading from 'ui/common/loading';
import Welcome from 'ui/votes/welcome';

const messages = defineMessages({
  title: {
    id: "dashboard.votes.title",
    defaultMessage: "My Votes"
  }
});

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
    const { votes, votesFetched, intl: { formatMessage } } = this.props;

    if (!votesFetched && votes.length === 0)
      return <Loading />;

    if (votesFetched && votes.length === 0)
      return <Welcome />;

    return (
      <article className="container">
        <Helmet>
          <title>{formatMessage(messages.title)}</title>
        </Helmet>
        <header className="mt-4 d-flex align-items-center justify-content-between">
          <h1 className="text-primary">
            {formatMessage(messages.title)}
          </h1>
        </header>
        <main>
          <VotesTable votes={votes} />
        </main>
      </article>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUserId: selectCurrentUserId(state),
    votes: selectCurrentUserVotes(state),
    votesFetched: selectCurrentUserVotesFetched(state)
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
