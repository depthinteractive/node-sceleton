import { buildSchema } from 'graphql';

import AuthSchema from './schemas/auth';

export default buildSchema(`
  ${AuthSchema.types}

  type RootQuery {
    ${AuthSchema.query}
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);