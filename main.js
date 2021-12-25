/* eslint-env es6 */
const {
  app,
  BrowserWindow,
  globalShortcut,
  Tray,
  nativeImage,
  Menu,
} = require("electron");
const url = require("url");
const path = require("path");

let tray; // declared outside onReady() to prevent tray icon disappearance due to garbage collection
let quitting = false;

function onReady() {
  createMainWindow();
  registerKeyboardShortcut();
  setupTrayIcon();
}

function createMainWindow() {
  win = new BrowserWindow({
    width: 400,
    height: 1080,
    x: 1920 - 400,
    y: 0,
    autoHideMenuBar: true,
    skipTaskbar: true,
    backgroundColor: "#1e1e1e",
    show: false,
  });
  win.on("close", function (event) {
    if (!quitting) {
      event.preventDefault();
      win.hide();
      return false;
    }
  });
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "dist/yaka/index.html"),
      protocol: "file:",
      slashes: true,
    })
  );
  win.once("ready-to-show", () => {
    win.show();
  });
}

function registerKeyboardShortcut() {
  globalShortcut.register("Control+Alt+Y", () => {
    win.show();
  });
}

function setupTrayIcon() {
  const icon = nativeImage.createFromPath("dist/yaka/assets/tray-icon.png");
  tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    { label: "Open", click: () => win.show() },
    {
      label: "Quit",
      click: () => {
        quitting = true;
        win.close();
      },
    },
  ]);
  tray.on("click", () => (win.isVisible() ? win.hide() : win.show()));
  tray.setContextMenu(contextMenu);
  tray.setToolTip("Yaka: the no fuss todo-list manager");
  tray.setTitle("Yaka");
}

app.on("ready", onReady);
