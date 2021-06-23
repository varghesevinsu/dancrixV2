/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import { app, BrowserWindow, ipcMain } from 'electron'
import { ChildProcessRegister } from './childProcessRegister'

export default class IPCRegister {
  mainWindow: BrowserWindow

  constructor (mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow
  }

  listenIPC () {
    const childProcessRegister = new ChildProcessRegister(this.mainWindow)

    ipcMain.on('init-app', (event, args) => {
      event.returnValue = childProcessRegister.initializeApplication()
    })

    ipcMain.on('switch-app', (event, args) => {
      event.returnValue = childProcessRegister.loadAppById(args)
    })

    ipcMain.on('start-server', (event, args) => {
      childProcessRegister.startServer(args)
      event.returnValue = 'Starting server'
    })

    ipcMain.on('stop-server', (event, args) => {
      childProcessRegister.stopServer()

      event.returnValue = childProcessRegister.stopServer()
    })

    ipcMain.on('save-project-list', (event, args) => {
      // console.log('Saving project list')
      childProcessRegister.saveProjectList(args)
      event.returnValue = 'Project list saved to disk'
    })

    ipcMain.on('save-current-project', (event, args) => {
      console.log('Saving project details === ', args);
      childProcessRegister.saveCurrentProject(args)
      event.returnValue = 'Project detail saved to disk'
    })

    ipcMain.on('create-project', (event, args) => {
      // console.log('creating project')
      childProcessRegister.createProject(args)

      event.returnValue = 'Project created'
    })

    ipcMain.on('save-page-details', (event, args) => {
      console.log('saving page details == ', args)
      childProcessRegister.savePageDetailsToProject(args)
      event.returnValue = 'Page saved'
    })

    ipcMain.on('save-menu-details', (event, args) => {
      // console.log('saving menu details')

      childProcessRegister.saveMenuDetailsToProject(args)
      event.returnValue = 'menu saved'
    })

    process.on('exit', () => {
      childProcessRegister.stopServer()
    })
  }
}
