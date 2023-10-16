import { gql } from '@apollo/client';

// export const PROCESS_PAYMENT = gql`
// mutation ProcessPayment($paymentIntentId: String!, $paymentMethod: String!) {
//   processPayment(paymentIntentId: $paymentIntentId, paymentMethod: $paymentMethod)
// }
// `
export const CREATE_SPACE_DEBRIS = gql`
  mutation CreateSpaceDebris($input: SpaceDebrisInput!) {
    createSpaceDebris(input: $input) {
      id
      name
      description
      # Other fields you want in the response
    }
  }
`;

export const UPDATE_SPACE_DEBRIS = gql`
  mutation UpdateSpaceDebris($id: ID!, $input: SpaceDebrisInput!) {
    updateSpaceDebris(id: $id, input: $input) {
      id
      name
      description
      # Other fields you want in the response
    }
  }
`;

export const DELETE_SPACE_DEBRIS = gql`
  mutation DeleteSpaceDebris($id: ID!) {
    deleteSpaceDebris(id: $id)
  }
`;

export const CREATE_SATELLITE = gql`
  mutation CreateSatellite($input: SatelliteInput!) {
    createSatellite(input: $input) {
      id
      name
      purpose
      # Other fields you want in the response
    }
  }
`;

export const UPDATE_SATELLITE = gql`
  mutation UpdateSatellite($id: ID!, $input: SatelliteInput!) {
    updateSatellite(id: $id, input: $input) {
      id
      name
      purpose
      # Other fields you want in the response
    }
  }
`;

export const DELETE_SATELLITE = gql`
  mutation DeleteSatellite($id: ID!) {
    deleteSatellite(id: $id)
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($input: UserInput!) {
    registerUser(input: $input) {
      id
      username
      email
      # Other fields you want in the response
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      User {
        id
        username
        email
        # Other fields you want in the response
      }
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation LogoutUser {
    logoutUser
  }
`;
