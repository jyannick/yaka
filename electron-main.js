/* eslint-env es6 */
const {
  app,
  BrowserWindow,
  globalShortcut,
  Tray,
  nativeImage,
  Menu,
} = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("path");
const fs = require("fs");

let tray; // declared outside onReady() to prevent tray icon disappearance due to garbage collection
let rootDir = fs.existsSync(path.join(__dirname, "dist/yaka/index.html"))
  ? path.join(__dirname, "dist/yaka")
  : __dirname;

function onReady() {
  createMainWindow();
  registerKeyboardShortcut();
  setupTrayIcon();
  autoUpdater.checkForUpdatesAndNotify();
}

function createMainWindow() {
  win = new BrowserWindow({
    width: 400,
    height: 1080,
    x: 1920 - 400,
    y: 0,
    autoHideMenuBar: true,
    skipTaskbar: true,
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#333333",
      symbolColor: "#858585",
    },
    backgroundColor: "#1e1e1e",
    show: false,
  });
  win.loadURL(path.join(rootDir, "index.html"));
  win.once("ready-to-show", () => {
    win.show();
  });
}

function toggleWindowVisibility() {
  if (win.isVisible()) {
    win.hide();
  } else {
    win.show();
  }
}

function registerKeyboardShortcut() {
  globalShortcut.register("Control+Alt+Y", toggleWindowVisibility);
}

function setupTrayIcon() {
  const icon = nativeImage.createFromPath(
    path.join(rootDir, "assets/tray-icon.png")
  );
  tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    { label: "Open", click: () => win.show() },
    {
      label: "Quit",
      click: () => {
        win.close();
      },
    },
  ]);
  tray.on("click", toggleWindowVisibility);
  tray.setContextMenu(contextMenu);
  tray.setToolTip("Yaka: the no fuss todo-list manager");
  tray.setTitle("Yaka");
}

app.on("ready", onReady);
