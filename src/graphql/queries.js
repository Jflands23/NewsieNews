/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFeed = /* GraphQL */ `
  query GetFeed($id: ID!) {
    getFeed(id: $id) {
      id
      name
      description
      articles {
        items {
          id
          name
          description
          url
          createdAt
          updatedAt
        }
        nextToken
      }
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
        articles {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getArticle = /* GraphQL */ `
  query GetArticle($id: ID!) {
    getArticle(id: $id) {
      id
      name
      description
      url
      createdAt
      updatedAt
    }
  }
`;
export const listArticles = /* GraphQL */ `
  query ListArticles(
    $filter: ModelArticleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listArticles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        url
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
