import {
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import { promises as fs } from "fs";
import { rootDirectory, storage } from "../..";
import {
  databaseMutationError,
  databaseMutationResponse,
  databaseQueryResponse,
  verifyFormDataValidity,
} from "../common/apiResponses";
import { ApiResponse } from "../common/constants";
import { DishesGalleryFormData } from "./constants";
import { DishesGalleryMutationsService } from "./service.mutations";
import { DishesGalleryQueriesService } from "./service.queries";

export class DishesGalleryController {
  static getAllDishesGallery = async (): Promise<ApiResponse> => {
    const dishes = await DishesGalleryQueriesService.getAllDishesGallery();
    if (dishes.statusCode !== 200) {
      return dishes;
    }
    const formattedDishes: DishesGalleryFormData[] = [];
    for (const dish of dishes.data) {
      formattedDishes.push({
        id: dish.id,
        image: dish.image,
        title: dish.title,
      });
    }
    return {
      statusCode: 200,
      response: dishes.response,
      data: formattedDishes,
    };
  };

  static verifyIfDuplicateTitleOrImage = async (
    dish: DishesGalleryFormData
  ): Promise<ApiResponse> => {
    const isValid = verifyFormDataValidity(dish, ["title", "image"]);
    if (isValid.statusCode !== 200) {
      return isValid;
    }
    const isDuplicate =
      await DishesGalleryQueriesService.getGalleryDishDuplicate(dish);
    if (isDuplicate.statusCode === 200) {
      return {
        statusCode: 400,
        data: isDuplicate.data,
        response: "title or image already exists",
      };
    }
    return databaseQueryResponse(["a", "b"], "new item is not a duplicate");
  };

  // PROTECTED

  static saveDishGalleryImage = async (
    dishImage: any
  ): Promise<ApiResponse> => {
    const params: PutObjectCommandInput = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: "dishesGallery/DISHESGALLERY_" + dishImage.originalname,
      Body: dishImage.buffer,
      ACL: "public-read",
    };
    try {
      await storage.send(new PutObjectCommand(params));
      return { statusCode: 201, response: "dish gallery image saved" };
    } catch (error) {
      return databaseMutationError("save dish gallery image" + error);
    }
  };

  static deleteDishGalleryImage = async (
    imageName: string
  ): Promise<ApiResponse> => {
    const deleteParams: DeleteObjectCommandInput = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: "dishesGallery/DISHESGALLERY_" + imageName,
    };
    try {
      await storage.send(new DeleteObjectCommand(deleteParams));
      return { statusCode: 200, response: "dish gallery image deleted" };
    } catch (error) {
      return databaseMutationError("delete dish gallery image" + error);
    }
  };

  static createDishGalleryItem = async (
    dish: DishesGalleryFormData
  ): Promise<ApiResponse> => {
    const isValid = verifyFormDataValidity(dish, ["title", "image"]);
    if (isValid.statusCode !== 200) {
      return isValid;
    }
    const createdDish =
      await DishesGalleryMutationsService.createDishGalleryItem(dish);
    if (createdDish.statusCode !== 200) {
      return createdDish;
    }
    return { ...createdDish, statusCode: 201 };
  };

  static modifyDishGalleryItem = async (
    dish: DishesGalleryFormData
  ): Promise<ApiResponse> => {
    const isValid = verifyFormDataValidity(dish, ["id", "title", "image"]);
    if (!dish.id || isValid.statusCode !== 200) {
      return isValid;
    }
    const modifiedDish =
      await DishesGalleryMutationsService.modifyDishGalleryItemById(dish);
    return modifiedDish;
  };

  static deleteDishGalleryItem = async (
    dish: DishesGalleryFormData
  ): Promise<ApiResponse> => {
    const isValid = verifyFormDataValidity(dish, ["id", "title", "image"]);
    if (!dish.id || isValid.statusCode !== 200) {
      return isValid;
    }
    const deletedDish =
      await DishesGalleryMutationsService.deleteDishGalleryItemById(dish.id);
    return deletedDish;
  };

  static deleteImage = async (imageName: string): Promise<ApiResponse> => {
    try {
      await fs.unlink(rootDirectory + "/public/dishesGallery/" + imageName);
    } catch (error) {
      return databaseMutationError("delete dish gallery image");
    }
    return databaseMutationResponse(
      { affectedRows: 1 },
      "delete dish gallery image"
    );
  };
}
