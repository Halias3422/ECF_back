import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";

export const initStorage = () => {
  return new S3Client({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
    region: process.env.AWS_BUCKET_REGION,
  });
};

export const initUploadImage = () => {
  const storage = multer.memoryStorage();
  return multer({ storage: storage }).single("image");
};
