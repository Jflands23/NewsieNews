/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createFeed = /* GraphQL */ `
  mutation CreateFeed(
    $input: CreateFeedInput!
    $condition: ModelFeedConditionInput
  ) {
    createFeed(input: $input, condition: $condition) {
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
export const updateFeed = /* GraphQL */ `
  mutation UpdateFeed(
    $input: UpdateFeedInput!
    $condition: ModelFeedConditionInput
  ) {
    updateFeed(input: $input, condition: $condition) {
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
export const deleteFeed = /* GraphQL */ `
  mutation DeleteFeed(
    $input: DeleteFeedInput!
    $condition: ModelFeedConditionInput
  ) {
    deleteFeed(input: $input, condition: $condition) {
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
export const createArticle = /* GraphQL */ `
  mutation CreateArticle(
    $input: CreateArticleInput!
    $condition: ModelArticleConditionInput
  ) {
    createArticle(input: $input, condition: $condition) {
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
      bookmarks {
        items {
          id
          userID
          articleID
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
export const updateArticle = /* GraphQL */ `
  mutation UpdateArticle(
    $input: UpdateArticleInput!
    $condition: ModelArticleConditionInput
  ) {
    updateArticle(input: $input, condition: $condition) {
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
      bookmarks {
        items {
          id
          userID
          articleID
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
export const deleteArticle = /* GraphQL */ `
  mutation DeleteArticle(
    $input: DeleteArticleInput!
    $condition: ModelArticleConditionInput
  ) {
    deleteArticle(input: $input, condition: $condition) {
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
      bookmarks {
        items {
          id
          userID
          articleID
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
export const createBookmark = /* GraphQL */ `
  mutation CreateBookmark(
    $input: CreateBookmarkInput!
    $condition: ModelBookmarkConditionInput
  ) {
    createBookmark(input: $input, condition: $condition) {
      id
      userID
      articleID
      article {
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
          createdAt
          updatedAt
        }
        bookmarks {
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
export const updateBookmark = /* GraphQL */ `
  mutation UpdateBookmark(
    $input: UpdateBookmarkInput!
    $condition: ModelBookmarkConditionInput
  ) {
    updateBookmark(input: $input, condition: $condition) {
      id
      userID
      articleID
      article {
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
          createdAt
          updatedAt
        }
        bookmarks {
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
export const deleteBookmark = /* GraphQL */ `
  mutation DeleteBookmark(
    $input: DeleteBookmarkInput!
    $condition: ModelBookmarkConditionInput
  ) {
    deleteBookmark(input: $input, condition: $condition) {
      id
      userID
      articleID
      article {
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
          createdAt
          updatedAt
        }
        bookmarks {
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
