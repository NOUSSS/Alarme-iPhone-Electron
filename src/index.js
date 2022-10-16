const { app, BrowserWindow } = require("electron");
const path = require("path");

function createApp() {
  const Window = new BrowserWindow({
    width: 350,
    height: 650,
  });

  Window.loadFile(path.join(__dirname, "Page/index.html"));
  Window.setMenuBarVisibility(false);
  Window.setResizable(false);
}

app.whenReady().then(() => {
  createApp();
});
