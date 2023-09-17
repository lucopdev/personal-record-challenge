import path from "path";
import { Request, Response } from "express";
import UserService from "../service/User.service";
import camelizeKeys from "../utils/camelizeKeysFunc";
import UserBodyType from "../types/UserBodyType";
import IUserBodySnakized from "../interfaces/IUserBodySnakized";
// import { UploadedFile } from "express-fileupload";

const csv = require("csvtojson");
const fs = require("fs");

const getUser = async (req: Request, res: Response): Promise<Response> => {
  const query = req.query.q as string;
  const response = await UserService.getUser(query);

  if (response.status !== "SUCCESSFUL") {
    return res.status(400).json(response.data);
  }

  return res.status(response.code).json(response.data);
};

const createUser = async (req: any, res: Response): Promise<Response> => {
  const fileReceived = req.files?.csvFile // as UploadedFile;

  let fileBuffer: Buffer = Buffer.from(fileReceived.data.toString("utf-8"));
  const filePath = path.join(
    __dirname.split("controller")[0] + "/dbRecords/CSVdata/newCsv.csv"
  );

  fs.writeFile(filePath, fileBuffer, () => {});

  csv()
    .fromFile(filePath)
    .then(async (jsonObj: IUserBodySnakized[]) => {
      const camelizedObjectArray = camelizeKeys(jsonObj) as UserBodyType[];
      await UserService.createUser(camelizedObjectArray);
    });

  return res.send({ message: "User successfully registered." });
};

const deleteUser = async (req: Request, res: Response) => {
  const { body } = req;

  await UserService.deleteUser(body);

  return res.sendStatus(204);
};

export default {
  getUser,
  createUser,
  deleteUser,
};
