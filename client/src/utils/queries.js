import { gql } from '@apollo/client';

export const GET_PAYMENT_INTENT = gql`
query GetPaymentIntent($amount: Int!, $currency: String!) {
  getPaymentIntent(amount: $amount, currency: $currency) {
    clientSecret
  }
}
`;

export const GET_SPACE_DEBRIS = gql`
  query GetSpaceDebris($id: ID!) {
    spaceDebris(id: $id) {
      id
      name
      description
      # Other fields you need
    }
  }
`;

export const GET_ALL_SPACE_DEBRIS = gql`
  query GetAllSpaceDebris {
    allSpaceDebris {
      id
      name
      description
      # Other fields you need
    }
  }
`;

export const GET_SATELLITE = gql`
  query GetSatellite($id: ID!) {
    satellite(id: $id) {
      id
      name
      purpose
      # Other fields you need
    }
  }
`;

export const GET_ALL_SATELLITES = gql`
  query GetAllSatellites {
    allSatellites {
      id
      name
      purpose
      # Other fields you need
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      username
      email
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      id
      username
      email
      # Other fields you need
    }
  }
`;
