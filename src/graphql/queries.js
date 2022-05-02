/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFeed = /* GraphQL */ `
  query GetFeed($id: ID!) {
    getFeed(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const listFeeds = /* GraphQL */ `
  query ListFeeds(
    $filter: ModelFeedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFeeds(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
