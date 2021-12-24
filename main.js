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

function onReady() {
  win = new BrowserWindow({
    width: 400,
    height: 1080,
    x: 1920 - 400,
    y: 0,
    autoHideMenuBar: true,
  });
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "dist/yaka/index.html"),
      protocol: "file:",
      slashes: true,
    })
  );
  globalShortcut.register("Control+Alt+Y", () => {
    win.show();
  });
  const icon = nativeImage.createFromPath("dist/yaka/assets/tray-icon.png");
  tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    { label: "Quit", click: () => win.close() },
  ]);
  tray.setContextMenu(contextMenu);
  tray.setToolTip("Yaka: no fuss todo-list manager");
  tray.setTitle("Yaka");
}

app.on("ready", onReady);
