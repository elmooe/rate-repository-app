import { gql } from '@apollo/client';
import { REPOSITORY_DETAILS, REVIEW_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
query Query($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String, $first: Int, $after: String) {
  repositories(orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword, first: $first, after: $after) {
    edges {
      node {
        ...RepositoryDetails
      }
      cursor
    }
    pageInfo {
      endCursor
      startCursor
      hasNextPage
    }
  }
}
${REPOSITORY_DETAILS}
`;

export const GET_REPOSITORY = gql`
query Repository($id: ID!, $first: Int, $after: String) {
  repository(id: $id) {
    ...RepositoryDetails
    reviews(first: $first, after: $after) {
      edges {
        node {
          ...ReviewDetails
          user {
            id
            username
          }
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
}
${REPOSITORY_DETAILS}
${REVIEW_DETAILS}
`;

export const ME = gql`
  query Query($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewDetails
          }
        }
      }
    }
  }
  ${REVIEW_DETAILS}
`;