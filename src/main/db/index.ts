import { userSettingsHandler } from "@main/db/handlers";
import { UserSetting } from "@main/db/models";
import log from "@main/logger";
import settings from "@main/settings";
import { ipcMain } from "electron";
import { Sequelize } from "sequelize-typescript";

const __dirname = import.meta.dirname;
const logger = log.scope("DB");

const handlers = [
  userSettingsHandler,
]

class DBWrapper {
  private isConnecting: boolean;
  public connection: Sequelize | null;

  constructor() {
    this.isConnecting = false;
    this.connection = null;
  }

  async connect() {
    if (this.isConnecting) {
      throw new Error("Database connection is already in progress");
    }
    this.isConnecting = true;

    const dbPath = settings.dbPath();
    if (!dbPath) {
      throw new Error("Db path is not ready");
    }

    try {
      if (this.connection) {
        return;
      }

      const sequelize = new Sequelize({
        dialect: "sqlite",
        storage: dbPath,
        models: [
          UserSetting,
        ],
      });

      await sequelize.sync();
      await sequelize.authenticate();

      // register handlers
      logger.info(`Registering handlers`);
      for (const handler of handlers) {
        handler.register();
      }

      this.connection = sequelize;
      logger.info("Database connection established");
    } catch (err) {
      logger.error(err);
      throw err;
    } finally {
      this.isConnecting = false;
    }
  }

  registerIpcHandlers() {
    ipcMain.handle("db-connect", async () => {
      if (this.isConnecting) {
        return {
          state: "connecting",
          path: settings.dbPath(),
          error: null,
        }
      }

      try {
        await this.connect();
        return {
          state: "connected",
          path: settings.dbPath(),
          error: null,
        }
      } catch (err) {
        return {
          state: "error",
          path: settings.dbPath(),
          error: err.message,
        }
      }
    })
  }
}


export default new DBWrapper()