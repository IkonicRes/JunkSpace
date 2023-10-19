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
      COMMENT
      ORIGINATOR
      NORAD_CAT_ID
      OBJECT_NAME
      OBJECT_TYPE
      CLASSIFICATION_TYPE
      INTLDES
      EPOCH
      EPOCH_MICROSECONDS
      MEAN_MOTION
      ECCENTRICITY
      INCLINATION
      RA_OF_ASC_NODE
      ARG_OF_PERICENTER
      MEAN_ANOMALY
      EPHEMERIS_TYPE
      ELEMENT_SET_NO
      REV_AT_EPOCH
      BSTAR
      MEAN_MOTION_DOT
      MEAN_MOTION_DDOT
      FILE
      TLE_LINE0
      TLE_LINE1
      TLE_LINE2
      OBJECT_ID
      OBJECT_NUMBER
      SEMIMAJOR_AXIS
      PERIOD
      APOGEE
      PERIGEE
      DECAYED
      PRICE
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
