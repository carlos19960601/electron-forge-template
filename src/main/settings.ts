import { DATABASE_NAME, LIBRARY_PATH_SUFFIX } from "@/constants";
import { AppSettingsKeyEnum } from "@/types/enums";
import { app, ipcMain, IpcMainInvokeEvent } from "electron";
import settings from "electron-settings";
import fs from "fs-extra";
import path from "path";

const libraryPath = () => {
  const _library = settings.getSync(AppSettingsKeyEnum.LIBRARY);

  if (!_library || typeof _library !== "string") {
    settings.setSync(
      AppSettingsKeyEnum.LIBRARY,
      process.env.LIBRARY_PATH ||
      path.join(app.getPath("documents"), LIBRARY_PATH_SUFFIX)
    );
  } else if (path.parse(_library).base !== LIBRARY_PATH_SUFFIX) {
    settings.setSync(
      AppSettingsKeyEnum.LIBRARY,
      path.join(_library, LIBRARY_PATH_SUFFIX)
    );
  }

  const library = settings.getSync(AppSettingsKeyEnum.LIBRARY) as string;
  fs.ensureDirSync(library);

  return library;
};


const dbPath = () => {
  if (!userDataPath()) return null;

  const dbName = app.isPackaged
    ? `${DATABASE_NAME}.sqlite`
    : `${DATABASE_NAME}_dev.sqlite`;
  return path.join(userDataPath(), dbName);
};

const userDataPath = () => {
  // settings 存储的位置是 app.getPath('userData') 
  const userId = settings.getSync("user.id");
  if (!userId) return null;

  const userData = path.join(libraryPath(), userId.toString());
  fs.ensureDirSync(userData);

  return userData;
};



export default {
  registerIpcHandlers: () => {
    ipcMain.handle("app-settings-get-library", (_event: IpcMainInvokeEvent) => {
      libraryPath();
      return settings.getSync(AppSettingsKeyEnum.LIBRARY);
    });
  },
  libraryPath,
  userDataPath,
  dbPath,
  ...settings,
}