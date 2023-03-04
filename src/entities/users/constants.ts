export const USERS_ROUTES = {
  login: '/api/user-login',
  signup: '/api/user-signup',
};

export const USERS_TABLE = {
  name: 'Users',
  columns: {
    id: 'id_user',
    email: 'email',
    password: 'password',
    defaultGuestNumber: 'default_guest_number',
    defaultAllergies: 'default_allergies',
    isAdmin: 'is_admin',
  },
};

export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserSignupData extends UserLoginData {
  defaultGuestNumber?: number;
  defaultAllergies?: string;
}
