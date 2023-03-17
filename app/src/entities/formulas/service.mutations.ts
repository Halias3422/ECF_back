import mysql2 from "mysql2";
import { dbConnexion } from "../..";
import {
  databaseMutationError,
  databaseMutationResponse,
} from "../common/apiResponses";
import { ApiResponse } from "../common/constants";
import { FormulaData, FORMULAS_TABLE } from "./constants";

export class FormulasMutationsService {
  static createNewFormula = async (
    formula: FormulaData,
    menuId: string
  ): Promise<ApiResponse> => {
    try {
      const DEFAULT = {
        toSqlString: function () {
          return "DEFAULT";
        },
      };
      const mutation = mysql2.format(
        `INSERT INTO ${FORMULAS_TABLE.name} VALUES (?, ?, ?, ?, ?)`,
        [DEFAULT, menuId, formula.title, formula.description, formula.price]
      );
      const [rows] = await dbConnexion.execute(mutation);
      return databaseMutationResponse(rows, "create formula");
    } catch (error: any) {
      return databaseMutationError("create formula");
    }
  };

  static deleteFormulaById = async (
    formulaId: string
  ): Promise<ApiResponse> => {
    try {
      const mutation = mysql2.format(
        `DELETE FROM ${FORMULAS_TABLE.name} WHERE ${FORMULAS_TABLE.columns.id} = ?`,
        [formulaId]
      );
      const [rows] = await dbConnexion.execute(mutation);
      return databaseMutationResponse(rows, "delete formula by ID");
    } catch (error: any) {
      return databaseMutationError("delete formula by ID");
    }
  };

  static modifyFormulaById = async (
    formula: FormulaData
  ): Promise<ApiResponse> => {
    try {
      const mutation = mysql2.format(
        `UPDATE ${FORMULAS_TABLE.name} SET ${FORMULAS_TABLE.columns.title} = ?, ${FORMULAS_TABLE.columns.description} = ?, ${FORMULAS_TABLE.columns.price} = ? WHERE ${FORMULAS_TABLE.columns.id} = ?`,
        [formula.title, formula.description, formula.price, formula.id]
      );
      const [rows] = await dbConnexion.execute(mutation);
      return databaseMutationResponse(rows, "modify formula by ID");
    } catch (error: any) {
      return databaseMutationError("modify formula by ID");
    }
  };
}