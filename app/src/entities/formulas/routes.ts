import express from 'express';
// import { verifyAuthorization } from '../common/apiResponses';
// import { FORMULAS_ROUTES } from './constants';
// import { FormulasController } from './controller';

export const formulasRoutes = express.Router();

// PROTECTED

// formulasRoutes.post(FORMULAS_ROUTES.deleteFormula, async (req, res) => {
//   const auth = await verifyAuthorization(req);
//   if (auth.statusCode === 200) {
//     const { statusCode, response } = await FormulasController.deleteFormula(
//       req.body
//     );
//     return res.status(statusCode).send(response);
//   } else {
//     return res.status(401).send('Unauthorized');
//   }
// });

// formulasRoutes.post(FORMULAS_ROUTES.modifyFormula, async (req, res) => {
//   const auth = await verifyAuthorization(req);
//   if (auth.statusCode === 200) {
//     const { statusCode, response } = await FormulasController.modifyFormula(
//       req.body
//     );
//     return res.status(statusCode).send(response);
//   } else {
//     return res.status(401).send('Unauthorized');
//   }
// });

// formulasRoutes.post(FORMULAS_ROUTES.createNewFormula, async (req, res) => {
//   const auth = await verifyAuthorization(req);
//   if (auth.statusCode === 200) {
//     const { statusCode, response } = await FormulasController.createNewFormula(
//       req.body
//     );
//     return res.status(statusCode).send(response);
//   } else {
//     return res.status(401).send('Unauthorized');
//   }
// });
