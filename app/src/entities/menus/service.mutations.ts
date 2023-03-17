import mysql2 from "mysql2";
import { dbConnexion } from "../..";
import {
  databaseMutationError,
  databaseMutationResponse,
} from "../common/apiResponses";
import { FormattedMenu, MENUS_TABLE } from "./constants";

export class MenuMutationsService {
  static createNewMenu = async (menu: FormattedMenu) => {
    try {
      const DEFAULT = {
        toSqlString: function () {
          return "DEFAULT";
        },
      };
      const mutation = mysql2.format(
        `INSERT INTO ${MENUS_TABLE.name} VALUES (?, ?)`,
        [DEFAULT, menu.title]
      );
      const [rows] = await dbConnexion.execute(mutation);
      return databaseMutationResponse(rows, "create new menu");
    } catch (error) {
      return databaseMutationError("create new menu");
    }
  };

  static modifyMenu = async (menu: FormattedMenu) => {
    try {
      const mutation = mysql2.format(
        `UPDATE ${MENUS_TABLE.name} SET ${MENUS_TABLE.columns.title} = ? WHERE ${MENUS_TABLE.columns.id} = ?`,
        [menu.title, menu.id]
      );
      const [rows] = await dbConnexion.execute(mutation);
      return databaseMutationResponse(rows, "modify menu");
    } catch (error) {
      return databaseMutationError("modify menu");
    }
  };

  static deleteMenu = async (menu: FormattedMenu) => {
    try {
      const mutation = mysql2.format(
        `DELETE FROM ${MENUS_TABLE.name} WHERE ${MENUS_TABLE.columns.id} = ?`,
        [menu.id]
      );
      const [rows] = await dbConnexion.execute(mutation);
      return databaseMutationResponse(rows, "delete menu");
    } catch (error) {
      return databaseMutationError("delete menu");
    }
  };
}
