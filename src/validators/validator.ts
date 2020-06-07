import AJV, { ErrorObject } from "ajv";
import AjvErrors from "ajv-errors";
import AjvKeywords from "ajv-keywords";

const ajv = new AJV({ allErrors: true, jsonPointers: true, extendRefs: true });
AjvErrors(ajv);
AjvKeywords(ajv);

export interface Validator<T> {
  isValid(obj: any): obj is T;
  getErrors(): undefined | null | Array<ErrorObject>;
}

export function crateValidator<T>(schema: object): Validator<T> {
  const validator = ajv.compile(schema);
  return {
    isValid(obj: any): obj is T {
      return validator(obj) === true;
    },
    getErrors(): Array<ErrorObject> | null | undefined {
      return validator.errors;
    }
  }
}
