import React, { createContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import withRoot from "./withRoot";
import App from "./pages/App";
import Profile from "./pages/Profile";
import Header from "./components/Shared/Header";
import Loading from "./components/Shared/Header";
import Error from "./components/Shared/Error";

export const UserContext = createContext();

const Root = () => (
  <Query query={ME}>
    {({ data, loading, error }) => {
      return (
        <Router>
          {loading ? (
            <Loading />
          ) : error ? (
            <Error error={error} />
          ) : (
            <UserContext.Provider value={data.me}>
              <Header currentUser={data.me} />
              <Switch>
                <Route exact path="/" component={App} />
                <Route path="/profile/" component={Profile} />
              </Switch>
            </UserContext.Provider>
          )}
        </Router>
      );
    }}
  </Query>
);

const ME = gql`
  {
    me {
      username
      id
      email
      likeSet {
        id
      }
    }
  }
`;

// const GET_TRACKS_QUERY = gql`
//   {
//     tracks {
//       id
//       title
//       description
//       url
//     }
//   }
// `;

export default withRoot(Root);
