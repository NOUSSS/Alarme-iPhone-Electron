const { app, BrowserWindow } = require("electron");
const path = require("path");

function createApp() {
  const Window = new BrowserWindow({
    width: 350,
  });

  Window.loadFile(path.join(__dirname, "Page/index.html"));
  Window.setMenuBarVisibility(false);
  Window.setResizable(true);
}

app.whenReady().then(() => {
  createApp();
});
