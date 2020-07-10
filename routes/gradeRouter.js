import express from "express";
import controller from "../controllers/gradeController.js";
import cors from "cors";

const app = express();

app.post("/grade/", cors(), controller.create);
app.get("/grade/", cors(), controller.findAll);
app.get("/grade/:id", cors(), controller.findOne);
app.put("/grade/:id", cors(), controller.update);
app.delete("/grade/:id", cors(), controller.remove);
app.delete("/grade/", cors(), controller.removeAll);

export { app as gradeRouter };
