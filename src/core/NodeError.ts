import _ from 'lodash'

export enum _e {
  USER_DOES_NOT_EXISTS = 'USER_DOES_NOT_EXISTS',
  PASSWORD_IS_ICORRECT = 'PASSWORD_IS_ICORRECT',
  EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
  ERROR_422 = 'ERROR_422',
}

export type Error = {
  message: string,
  field?: string
}

interface INodeError<T> {
  code:  number;
  errors: T;
}

export class NodeError<T> extends Error implements INodeError<T> {
  code: number;
  errors: T;

  constructor(code: number, errors: T) {
    super(`ERROR_${code}`);
    this.code = code;
    this.errors = errors;
  }
  
}