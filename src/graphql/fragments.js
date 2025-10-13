import { gql } from '@apollo/client';

export const REVIEW_DETAILS = gql`
fragment ReviewDetails on Review {
  id
  text
  rating
  createdAt
  repositoryId
  repository {
   name
  }
}
`;

export const REPOSITORY_DETAILS = gql`
   fragment RepositoryDetails on Repository {
     id
     description
     fullName
     language
     stargazersCount
     forksCount
     ratingAverage
     reviewCount
     ownerAvatarUrl
     url
  }
 `;