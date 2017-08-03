import React from 'react'
import { withRouter, Redirect } from 'react-router';
import routeTemplates from 'ui/common/routes/templates';

const Home = (props) => <Redirect to={routeTemplates.claims.my} />;

export default withRouter(Home);
