import cors from "cors";
import express from "express";
import path from "path";
import { routes } from "./routes";

export const initExpressServer = () => {
  const app = express();

  app.use(
    cors({
      origin: "*",
    }),
    // necessary to handle incoming data
    express.urlencoded({ extended: true }),
    express.json()
  );

  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "../views"));

  // init routing
  app.use("/", routes);

  // serve static images
  app.use(express.static("public"));

  // launch server
  let server = null;
  try {
    server = app.listen(process.env.SERVER_PORT, () => {
      console.log("Server is running on port " + process.env.SERVER_PORT);
    });
  } catch (error) {
    console.log("Unexpected Error while initializing server : " + error);
  }
  return server;
};
