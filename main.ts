import { BrowserWindow, app } from 'electron'

const createWindow = () => {
  let mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 925,
    minHeight: 700,
  })
  mainWindow.loadURL('http://localhost:3000/')
}

app.on('ready', createWindow)
