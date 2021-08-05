
import "reflect-metadata";
import { Handler } from 'aws-lambda';
import { UserController } from './controllers/User';
import { createConnection } from "typeorm";

const userController = new UserController()
export const create: Handler = (event: any,context, callback) => {
  createConnection()
  .then(() => {
    return userController.create(event,context, callback)  
  })
  .catch(() => console.log("Unable to connect to the database"));
};

export const update: Handler = (event, context, callback) => {
  createConnection().then(()=>{
    return userController.update(event, context, callback)
  })
  .catch(() => console.log("Unable to connect to the database"));
};

export const find: Handler = (event, context, callback) => {
  createConnection().then(()=>{
    return userController.find(event, context, callback)
  })
  .catch(() => console.log("Unable to connect to the database"));
};

export const deleteOne = (event, context, callback) => {
  createConnection().then(()=>{
    return userController.deleteOne(event, context, callback)
  })
  .catch(() => console.log("Unable to connect to the database"));
};
