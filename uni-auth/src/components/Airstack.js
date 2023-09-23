import React from "react";
import { init, useQuery } from "@airstack/airstack-react";
init("a611deff724c4969b67a4b819d1f9fa4");

const query = `
  query MyQuery($identity: Identity) {
    Socials(
      input: {
        filter: {
          identity: { _eq: $identity }
          dappSlug: { _eq: lens_polygon }
        }
        blockchain: ethereum
      }
    ) {
      Social {
        dappName
        dappSlug
        profileName
      }
    }
  }
`;

const variables = {
  identity: "0xcBFBcbFcA74955B8AB75Dec41F7b9eF36F329879",
};

const Airstack = () => {
  // Your Airstack component code here

  const { data, loading, error } = useQuery(query, variables, { cache: false });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (data) {
    console.log(data);
  }

  // Render your component using the data returned by the query
  return <div>{JSON.stringify(data, 2)}</div>;
};

export default Airstack;
