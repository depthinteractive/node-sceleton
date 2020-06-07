import graphqlHttp from 'express-graphql';
import { GraphQLError } from 'graphql';
import i18n  from 'i18n';
import _ from 'lodash';
// graphql
import graphqlSchema from '../graphql/schema';
import graphqlResolver from '../graphql/resolver';
// error
import { NodeError, Error } from '../core/NodeError';
import { ErrorObject } from 'ajv';

export default graphqlHttp({
  schema: graphqlSchema,
  rootValue: graphqlResolver,
  graphiql: process.env.NODE_ENV === 'dev',
  customFormatErrorFn: (err: GraphQLError) => {
    if (!err.originalError) {
      return err;
    }

    const error: NodeError<Error[] | ErrorObject[]> = <NodeError<Error[] | ErrorObject[]>>err.originalError;
    error.message = i18n.__(error.message) || 'An error occurred.';
    
    if(Array.isArray(error.errors)){
      _.map<Error[] | ErrorObject[], void>(error.errors, (err: any): void => {
        if(err.dataPath){
          err.field = err.dataPath.replace('/', '');
        }
        err.message = i18n.__(err.message);
      });
    }
    return error;
  }
});