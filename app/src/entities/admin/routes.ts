import express from "express";
import { verifyAuthorization } from "../common/apiResponses";
import { ADMIN_ROUTES } from "./constants";

export const adminRoutes = express.Router();

adminRoutes.get(
  ADMIN_ROUTES.getAuthenticatedProtectedUserFromSession,
  async (req, res) => {
    const auth = await verifyAuthorization(req);
    res.status(auth.statusCode).send(auth.data);
  }
);
