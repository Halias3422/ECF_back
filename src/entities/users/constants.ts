export const USERS_ROUTES = {
  login: '/api/user-login',
  signup: '/api/user-signup',
  updateOptionalInfo: '/api/user-update-optional-info',
  getOptionalInfo: '/api/user-get-optional-info',
  getRole: '/api/user-get-role',
  updateMail: '/api/user-update-mail',
  updatePassword: '/api/user-update-password',
};

export const USERS_TABLE = {
  name: 'Users',
  columns: {
    id: 'id',
    email: 'email',
    password: 'password',
    defaultGuestNumber: 'defaultGuestNumber',
    defaultAllergies: 'defaultAllergies',
    sessionToken: 'sessionToken',
    isAdmin: 'isAdmin',
  },
};

export interface UserAuthData {
  email: string;
  password: string;
}

export interface UserOptionalData {
  email: string;
  defaultGuestNumber?: number;
  defaultAllergies?: string;
}

export interface UserSessionData {
  id: string;
  token: string;
}

export interface UserData {
  id: string;
  email: string;
  password: string;
  defaultGuestNumber: string;
  defaultAllergies: string;
  sessionToken: string;
  isAdmin: boolean;
}
