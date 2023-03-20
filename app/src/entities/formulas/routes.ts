import express from 'express';
import { verifyAuthorization } from '../common/apiResponses';
import { FORMULAS_ROUTES } from './constants';
import { FormulasController } from './controller';

export const formulasRoutes = express.Router();

formulasRoutes.post(FORMULAS_ROUTES.modifyFormula, async (req, res) => {
  const auth = await verifyAuthorization(req);
  if (auth.statusCode === 200) {
    const { statusCode, response } = await FormulasController.modifyFormula(
      req.body
    );
    res.status(statusCode).send(response);
  } else {
    res.status(401).send('Unauthorized');
  }
});
