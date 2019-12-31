import React from 'react';
import { gql } from 'apollo-boost'
import { Query } from "react-apollo";

export const Hello = () => (
    <Query
      query={gql`
        {
          hello
        }
      `}
    >
      {
          ({ loading, error, data }) =>
        {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return <span>{data.hello}</span>
          }
      }
    </Query>
  );