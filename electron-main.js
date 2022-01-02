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
const Store = require("electron-store");
var AutoLaunch = require("auto-launch");

const store = new Store();
let tray; // declared outside onReady() to prevent tray icon disappearance due to garbage collection
let rootDir = fs.existsSync(path.join(__dirname, "dist/yaka/index.html"))
  ? path.join(__dirname, "dist/yaka")
  : __dirname;

function onReady() {
  createMainWindow();
  registerKeyboardShortcut();
  setupAutoLaunch();
  setupTrayIcon();
  autoUpdater.checkForUpdatesAndNotify();
}

function createMainWindow() {
  win = new BrowserWindow({
    width: 400,
    height: 600,
    minWidth: 330,
    minHeight: 200,
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
    if (!isAutoLaunchEnabled()) {
      win.show();
    }
  });
}

function toggleWindowVisibility() {
  if (win.isVisible()) {
    win.hide();
  } else {
    win.show();
  }
}

function isAutoLaunchEnabled() {
  return store.get("autolaunch", false);
}

function setAutoLaunch(booleanValue) {
  store.set("autolaunch", booleanValue);
  setupAutoLaunch();
}

function registerKeyboardShortcut() {
  globalShortcut.register("Control+Alt+Y", toggleWindowVisibility);
}

function setupAutoLaunch() {
  var autoLauncher = new AutoLaunch({
    name: "Yaka",
  });
  if (isAutoLaunchEnabled()) {
    autoLauncher.enable();
  } else {
    autoLauncher.isEnabled().then((isEnabled) => {
      if (isEnabled) {
        autoLauncher.disable();
      }
    });
  }
}

function setupTrayIcon() {
  const icon = nativeImage.createFromPath(
    path.join(rootDir, "assets/tray-icon.png")
  );
  tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    { label: "Open", click: () => win.show() },
    {
      label: "Launch on startup",
      type: "checkbox",
      checked: isAutoLaunchEnabled(),
      click: (menuItem) => setAutoLaunch(menuItem.checked),
    },
    {
      label: "Quit",
      click: () => {
        win.close();
      },
    },
  ]);
  tray.on("click", toggleWindowVisibility);
  tray.setContextMenu(contextMenu);
  tray.setToolTip(`${app.getName()} v${app.getVersion()}`);
  tray.setTitle("Yaka");
}

app.on("ready", onReady);
