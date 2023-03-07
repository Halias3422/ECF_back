export const ADMIN_ROUTES = {
  securedLogRequest: '/api/secured-log-request',
  securedLogProcess: '/api/secured-log-process',
  securedLogProcessed: 'secured-log-processed',
  updateDefaultPassword: 'secured-log-update-default-password',
  processUpdateDefaultPassword:
    '/api/secured-log-process-update-default-password',
};

export interface AdminAuthData {
  email: string;
  password: string;
}

export interface AdminSessionData {
  email: string;
  id: string;
  token: string;
}
