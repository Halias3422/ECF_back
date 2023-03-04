import { MutationResponse, QueryResponse } from './constants';

export const databaseQueryResponse = (
  rows: any,
  queryName: string
): QueryResponse => {
  if (rows.length > 0) {
    return {
      statusCode: 200,
      rows,
      response: 'Query ' + queryName + ' successfully executed.',
    };
  }
  return {
    statusCode: 400,
    rows: [],
    response: 'Error: did not find ' + queryName + '.',
  };
};

export const databaseQueryError = (queryName: string): QueryResponse => {
  return {
    statusCode: 500,
    rows: [],
    response: 'Error: could not execute the query ' + queryName + '.',
  };
};

export const databaseMutationResponse = (
  rows: any,
  mutationName: string
): MutationResponse => {
  if (rows.affectedRows > 0) {
    return {
      statusCode: 200,
      response: 'Mutation ' + mutationName + ' successfully executed.',
    };
  }
  return {
    statusCode: 500,
    response: 'Error: could not execute the mutation ' + mutationName + '.',
  };
};

export const databaseMutationError = (
  mutationName: string
): MutationResponse => {
  return {
    statusCode: 400,
    response: 'Error: could not execute the mutation ' + mutationName + '.',
  };
};

export const isDuplicateResponse = (mutationName: string): MutationResponse => {
  return {
    statusCode: 400,
    response:
      'Error: could not execute the mutation ' +
      mutationName +
      ' because duplicate was found in the database.',
  };
};
