// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Feed, Article } = initSchema(schema);

export {
  Feed,
  Article
};