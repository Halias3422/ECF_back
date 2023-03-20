import mysql2 from 'mysql2';
import { dbConnexion } from '../..';
import {
  databaseQueryError,
  databaseQueryResponse,
} from '../common/apiResponses';
import { ApiResponse } from '../common/constants';
import { DishesGalleryFormData, DISHES_GALLERY_TABLE } from './constants';

export class DishesGalleryQueriesService {
  static getAllDishesGallery = async (): Promise<ApiResponse> => {
    try {
      const query = `SELECT * FROM ${DISHES_GALLERY_TABLE.name} ORDER BY ${DISHES_GALLERY_TABLE.columns.position} ASC`;
      const [rows] = await dbConnexion.execute(query);
      if (rows.length > 0) {
      }
      return databaseQueryResponse(rows, 'get all dishes gallery');
    } catch (error) {
      return databaseQueryError('get all dishes gallery');
    }
  };

  static getGalleryDishById = async (dishId: string): Promise<ApiResponse> => {
    try {
      const query = mysql2.format(
        `SELECT * FROM ${DISHES_GALLERY_TABLE.name} WHERE ${DISHES_GALLERY_TABLE.columns.id} = ?`,
        [dishId]
      );
      const [rows] = await dbConnexion.execute(query);
      if (rows.length > 0) {
      }
      return databaseQueryResponse(rows, 'get gallery dish by ID');
    } catch (error) {
      return databaseQueryError('get gallery dish by ID');
    }
  };

  static getGalleryDishByTitle = async (
    dishTitle: string
  ): Promise<ApiResponse> => {
    try {
      const query = mysql2.format(
        `SELECT * FROM ${DISHES_GALLERY_TABLE.name} WHERE ${DISHES_GALLERY_TABLE.columns.title} = ?`,
        [dishTitle]
      );

      const [rows] = await dbConnexion.execute(query);
      if (rows.length > 0) {
      }
      return databaseQueryResponse(rows, 'get gallery dish by title');
    } catch (error) {
      return databaseQueryError('get gallery dish by title');
    }
  };

  static getGalleryDishByImage = async (
    dishImage: string
  ): Promise<ApiResponse> => {
    try {
      const query = mysql2.format(
        `SELECT * FROM ${DISHES_GALLERY_TABLE.name} WHERE ${DISHES_GALLERY_TABLE.columns.image} = ?`,
        [dishImage]
      );

      const [rows] = await dbConnexion.execute(query);
      if (rows.length > 0) {
      }
      return databaseQueryResponse(rows, 'get gallery dish by image');
    } catch (error) {
      return databaseQueryError('get gallery dish by image');
    }
  };

  static getGalleryDishDuplicate = async (
    dish: DishesGalleryFormData
  ): Promise<ApiResponse> => {
    try {
      let query = mysql2.format(
        `SELECT * FROM ${DISHES_GALLERY_TABLE.name} WHERE (${DISHES_GALLERY_TABLE.columns.image} = ? OR ${DISHES_GALLERY_TABLE.columns.title} = ?) `,
        [dish.image, dish.title]
      );
      if (dish.id) {
        query += mysql2.format(` AND ${DISHES_GALLERY_TABLE.columns.id} != ?`, [
          dish.id,
        ]);
      }

      const [rows] = await dbConnexion.execute(query);
      if (rows.length > 0) {
      }
      return databaseQueryResponse(rows, 'get gallery dish by image or title');
    } catch (error) {
      return databaseQueryError('get gallery dish by image or title');
    }
  };
}
