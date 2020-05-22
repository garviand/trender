import "reflect-metadata";
import {createConnection, getConnection} from "typeorm";

export async function getDatabaseConnection () {
  let db;
  try {
    db = getConnection();
  }
  catch {
    db = await createConnection();
  }
  return db;
}