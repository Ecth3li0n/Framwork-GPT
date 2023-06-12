// Copyright (c) 2023 Ecth3li0n
// This file is part of Framwork GPT which is released under MIT License.
// See file LICENCE.txt for full license details.

// Required dependencies for the Electron application
const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

const fs = require("fs");
const os = require("os");

// Checks if the configuration folder exists and creates it if it doesn't
const userDirectoryPath = os.homedir();
const configDirectoryPath = path.join(userDirectoryPath, ".framwork-gpt");
if (!fs.existsSync(configDirectoryPath)) {
  fs.mkdirSync(configDirectoryPath);
}

const rootDirectory = path.join(__dirname, "..", "..");

// Enables live reloading in the development environment
if (process.env.ELECTRON_START_URL === "development") {
  require("electron-reload")(rootDirectory, {
    // Path to Electron binary
    electron: path.join(rootDirectory, "node_modules", ".bin", "electron"),
    // electron: require("electron"),
    // Wait for all changes to be written to disk before reloading
    awaitWriteFinish: true,
  });
}

// This will hold the instance of the main Electron window
let mainWindow;

// Disables hardware acceleration. This can be useful to prevent graphical issues in some scenarios.
app.disableHardwareAcceleration();

// Function to create the main application window
function createWindow() {
  // Creating a new BrowserWindow instance
  mainWindow = new BrowserWindow({
    // Initial window dimensions
    width: 800,
    height: 600,
    // Enabling Node.js integration and disabling context isolation
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Maximizes the window on start
  mainWindow.maximize();

  // Loads the app's start page from the dist directory
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "../renderer/index.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  // Event to nullify the window object when the window is closed
  mainWindow.on("closed", function () {
    mainWindow = null;
  });

  // Opens Developer Tools in the development environment
  if (process.env.ELECTRON_START_URL === "development") {
    mainWindow.webContents.openDevTools();
  }
}

// Event that gets fired when Electron has finished initializing. At this point, we can create browser windows.
app.on("ready", createWindow);

// Event to quit the app when all windows are closed (except on macOS where it is common for applications and their menu bar to stay active until the user quits)
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// Event to create a new window if no windows are open (only on macOS)
app.on("activate", function () {
  if (mainWindow === null) createWindow();
});
