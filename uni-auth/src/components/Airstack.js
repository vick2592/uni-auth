import React from "react";
import { init, useQuery } from "@airstack/airstack-react";

// Retrieve the API key from the environment variable
const apiKey = process.env.REACT_APP_AIRSTACK_API_KEY;

init(apiKey);

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
    },
    Wallet(input: {identity: "vitalik.eth", blockchain: ethereum}) {
      domains(input: {limit: 50}) {
        name
        owner
        resolvedAddress
        resolverAddress
        expiryTimestamp
        isPrimary
        labelName
        labelHash
        name
        paymentToken {
          name
          symbol
        }
        paymentTokenCostInNativeToken
        paymentTokenCostInUSDC
        registrationCost
        registrationCostInNativeToken
        registrationCostInUSDC
        formattedRegistrationCost
        formattedRegistrationCostInNativeToken
        formattedRegistrationCostInUSDC
        subDomains(input: {limit: 50}) {
          name
          owner
          resolvedAddress
          resolverAddress
          expiryTimestamp
          isPrimary
          labelName
          labelHash
          name
          paymentToken {
            name
            symbol
          }
          paymentTokenCostInNativeToken
          paymentTokenCostInUSDC
          registrationCost
          registrationCostInNativeToken
          registrationCostInUSDC
          formattedRegistrationCost
          formattedRegistrationCostInNativeToken
          formattedRegistrationCostInUSDC
        }
        subDomainCount
        tokenId
        ttl
        chainId
        blockchain
        createdAtBlockNumber
        createdAtBlockTimestamp
        lastUpdatedBlockNumber
        lastUpdatedBlockTimestamp
      }
    }
  }
`;

const variables = {
  identity: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
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
