import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type FeedMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ArticleMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Feed {
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly articles?: (Article | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Feed, FeedMetaData>);
  static copyOf(source: Feed, mutator: (draft: MutableModel<Feed, FeedMetaData>) => MutableModel<Feed, FeedMetaData> | void): Feed;
}

export declare class Article {
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly url?: string | null;
  readonly pubDate?: string | null;
  readonly keyWords?: string | null;
  readonly feed?: Feed | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Article, ArticleMetaData>);
  static copyOf(source: Article, mutator: (draft: MutableModel<Article, ArticleMetaData>) => MutableModel<Article, ArticleMetaData> | void): Article;
}