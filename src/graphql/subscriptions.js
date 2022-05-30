/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateFeed = /* GraphQL */ `
  subscription OnCreateFeed {
    onCreateFeed {
      id
      name
      description
      articles {
        items {
          id
          name
          description
          url
          pubDate
          keyWords
          feedID
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
export const onUpdateFeed = /* GraphQL */ `
  subscription OnUpdateFeed {
    onUpdateFeed {
      id
      name
      description
      articles {
        items {
          id
          name
          description
          url
          pubDate
          keyWords
          feedID
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
export const onDeleteFeed = /* GraphQL */ `
  subscription OnDeleteFeed {
    onDeleteFeed {
      id
      name
      description
      articles {
        items {
          id
          name
          description
          url
          pubDate
          keyWords
          feedID
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
export const onCreateArticle = /* GraphQL */ `
  subscription OnCreateArticle {
    onCreateArticle {
      id
      name
      description
      url
      pubDate
      keyWords
      feedID
      feed {
        id
        name
        description
        articles {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateArticle = /* GraphQL */ `
  subscription OnUpdateArticle {
    onUpdateArticle {
      id
      name
      description
      url
      pubDate
      keyWords
      feedID
      feed {
        id
        name
        description
        articles {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteArticle = /* GraphQL */ `
  subscription OnDeleteArticle {
    onDeleteArticle {
      id
      name
      description
      url
      pubDate
      keyWords
      feedID
      feed {
        id
        name
        description
        articles {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
