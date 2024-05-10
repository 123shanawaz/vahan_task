import express from "express";
// import { CreateUser } from "../controller/UserController";
import {
  CreateUser,
  GetUser,
  UpdateUser,
  DeleteUser,
} from "../controller/UserController.js";
const routers = express.Router();

routers.post("/create", CreateUser);
routers.get("/get", GetUser);
routers.put("/update/:id", UpdateUser);
routers.delete("/delete/:id", DeleteUser);

export default routers;