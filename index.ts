import express, { Request, Response } from "express";
import { router } from "./src/routes";

const app = express();

app.use(express.static("./public"));

app.set("views", __dirname + "/src/views");
app.set("view engine", "twig");
app.set("twig options", {
  allowAsync: true,
  strict_variables: false,
});

app.use("/", router);

app.listen(4000, () =>
  console.log("Server is running at http://localhost:4000")
);
