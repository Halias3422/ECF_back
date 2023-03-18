"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formulasRoutes = void 0;
const express_1 = __importDefault(require("express"));
// import { verifyAuthorization } from '../common/apiResponses';
// import { FORMULAS_ROUTES } from './constants';
// import { FormulasController } from './controller';
exports.formulasRoutes = express_1.default.Router();
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
