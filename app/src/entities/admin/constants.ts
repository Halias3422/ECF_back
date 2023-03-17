export interface AdminAuthData {
  email: string;
  password: string;
}

export interface AdminSessionData {
  email: string;
  id: string;
  token: string;
}

export const ADMIN_ROUTES = {
  getAuthenticatedProtectedUserFromSession:
    "/api/get-authenticated-protected-user-from-session",
};
