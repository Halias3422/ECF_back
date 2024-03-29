import { AdminController } from '../admin/controller';
import { UsersController } from '../users/controller';
import { ApiResponse } from './constants';

export const databaseQueryResponse = (
  rows: any,
  queryName: string
): ApiResponse => {
  if (rows.length > 0) {
    return {
      statusCode: 200,
      data: rows,
      response: 'Query ' + queryName + ' successfully executed.',
    };
  }
  return {
    statusCode: 400,
    data: [],
    response: 'Error: did not find ' + queryName + '.',
  };
};

export const databaseQueryError = (queryName: string): ApiResponse => {
  return {
    statusCode: 500,
    data: [],
    response: 'Error: could not execute the query ' + queryName + '.',
  };
};

export const databaseMutationResponse = (
  rows: any,
  mutationName: string
): ApiResponse => {
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

export const databaseMutationError = (mutationName: string): ApiResponse => {
  return {
    statusCode: 400,
    response: 'Error: could not execute the mutation ' + mutationName + '.',
  };
};

export const isDuplicateResponse = (mutationName: string): ApiResponse => {
  return {
    statusCode: 400,
    response:
      'Error: could not execute the mutation ' +
      mutationName +
      ' because duplicate was found in the database.',
  };
};

export const verifyFormDataValidity = (
  formData: any,
  formAttributes: string[]
): ApiResponse => {
  for (const attribute of formAttributes) {
    if (formData[attribute] === undefined) {
      return {
        statusCode: 400,
        response:
          'Error: wrong data sent. ' +
          attribute +
          ' atttribute is not defined.',
      };
    }
  }
  return {
    statusCode: 200,
    response: 'Form data is valid.',
  };
};

export const verifyAuthorization = async (req: any): Promise<ApiResponse> => {
  if (req.headers && req.headers.authorization) {
    const auth = req.headers.authorization.split(':');
    if (auth.length === 3) {
      const isAuth =
        await AdminController.getAuthenticatedProtectedUserFromSession({
          id: auth[0],
          email: auth[1],
          token: auth[2],
        });
      return isAuth;
    }
  }
  return databaseQueryError('Unauthorized');
};

export const verifyUserAuthorization = async (
  req: any
): Promise<ApiResponse> => {
  if (req.headers && req.headers.authorization) {
    const auth = req.headers.authorization.split(':');
    if (auth.length === 2) {
      const isAuth = UsersController.getAuthenticatedUserFromSession({
        id: auth[0],
        token: auth[1],
      });
      return isAuth;
    }
  }
  return databaseQueryError('Unauthorized');
};
