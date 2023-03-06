export const USERS_ROUTES = {
  login: '/api/user-login',
  signup: '/api/user-signup',
  updateOptionalInfo: '/api/user-update-optional-info',
};

export const USERS_TABLE = {
  name: 'Users',
  columns: {
    id: 'id_user',
    email: 'email',
    password: 'password',
    defaultGuestNumber: 'default_guests_number',
    defaultAllergies: 'default_allergies',
    sessionToken: 'session_token',
    isAdmin: 'is_admin',
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
