import db from "@main/db";
import log from "@main/logger";
import { BrowserWindow, ipcMain } from "electron";
import path from 'path';

const __dirname = import.meta.dirname;

const logger = log.scope("window");

class WindowWrapper {
  public win: BrowserWindow | null = null;

  public init() {
    if (this.win) {
      this.win.show();
      return;
    }

    // Prepare local database
    db.registerIpcHandlers();

    // App Options
    ipcMain.handle("app-platform-info", () => {
      return {
        platform: process.platform,
        arch: process.arch,
        version: process.getSystemVersion(),
      }
    })

    // Create the browser window.
    const mainWindow = new BrowserWindow({
      width: 1280,
      height: 720,
      minWidth: 800,
      minHeight: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
      },
    });

    // and load the index.html of the app.
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
      mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    } else {
      mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
    }

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    this.win = mainWindow;
  }
}

export default new WindowWrapper();