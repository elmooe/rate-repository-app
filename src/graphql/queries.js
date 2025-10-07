import { gql } from '@apollo/client';
import { USER_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          description
          forksCount
          fullName
          language
          name
          ownerAvatarUrl
          stargazersCount
          reviewCount
          ratingAverage
          id
        }
      }
    }
  }
`;

export const ME = gql`
  query {
    me {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;