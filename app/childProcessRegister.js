/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { app, BrowserWindow } from 'electron'
import ListPageCode from './pageSamples/listSample'
import DetailPageCode from './pageSamples/detailSample'
import MenuPageCode from './pageSamples/rootContainerSample'
import { getCamelCasedName } from './utils/Utils'

const fs = require('fs-extra')
const exec = require('child_process')
const path = require('path')
const npmi = require('npmi')

export class ChildProcessRegister {
  mainWindow: BrowserWindow

  serverStartScript: any

  constructor (mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow
  }

  loadAppById(id) {
    const pathName = `${app.getPath('appData')}/vkapplications`;
    const appFileName = `/${id}`;
    let currentApplication;
    try{
      currentApplication = fs.readFileSync(pathName + appFileName, 'utf8')
    } catch(e){
      console.log('Cant read file ', e)
    }
    return currentApplication;
  }

  initializeApplication () {
    const pathName = `${app.getPath('appData')}/vkapplications`
    const fileName = '/vkapplications.json'
    let appData
    let currentApplication
    // console.log(pathName + fileName)
    try {
      appData = fs.readFileSync(pathName + fileName, 'utf8')
    } catch (e) {
      console.log('Cant read file ', e)
    }

    try {
      const currentApplicationId = JSON.parse(appData).currentApplication.id
      const appFileName = `/${currentApplicationId}`
      currentApplication = fs.readFileSync(pathName + appFileName, 'utf8')
    } catch (e) {
      console.log('Cant read file ', e)
    }

    // console.log('app data', currentApplication)
    return currentApplication
  }

  saveProjectList (args) {
    const pathName = `${app.getPath('appData')}\/vkapplications`
    const fileName = '/vkapplications.json'
    try {
      if (!fs.existsSync(pathName)) {
        fs.mkdirSync(pathName)
      }
      fs.writeFileSync(pathName + fileName, args, 'utf-8')
    } catch (e) {
      console.log('cant write file ', e)
    }
  }

  saveCurrentProject (args) {
    const pathName = `${app.getPath('appData')}\/vkapplications\/`
    const fileName = args.id
    try {
      fs.writeFileSync(
        pathName + fileName,
        JSON.stringify(args.project),
        'utf-8'
      )
    } catch (e) {
      console.log('cant write file ', e)
    }
  }

  createProject (args) {
    // copy sample project
    // go to output location
    // paste project
    // change the folder name
    // update package.json with app-name
    // finish

    let sampleProjectLoc = path.resolve(process.cwd())
    const { location } = args
    const parentDir = path.resolve(process.cwd())

    sampleProjectLoc += '\\sampleApps'

    // console.log(`xcopy ${sampleProjectLoc} ${location} /h/i/c/k/e/r/y`)
    this.showOutput('<span className="info">Creating project... </span>')
    this.showOutput('<span className="info">Copying necessary files...</span>')
    setTimeout(() => {
      const projectCreation = exec.execSync(
        `xcopy ${sampleProjectLoc} ${location} /h/i/c/k/e/r/y`
      )
      this.showOutput('<span className="info">Copying files finished<span>')
      this.showOutput(
        '<span className="info">Updating Package.json with project data</span>'
      )

      this.updatePackageJson(args)

      this.showOutput('<span className="info">Renaming project</span>')

      this.renameProject(args)

      // this.runNpmInstall(args)
      this.runNpmInstallViaNpmi(args)
      // this.installViaNpm(args);

      // this.showOutput('\nProject creation completed. Happy hacking!!!')
    }, 500)

    // console.log('create project')
  }

  updatePackageJson (args) {
    const pathName = `${args.location}/sample-app/package.json`
    let packageJson: any
    try {
      packageJson = fs.readFileSync(pathName, 'utf8')
    } catch (e) {
      console.log('Cant read package.json ', e)
    }

    try {
      packageJson = JSON.parse(packageJson)
      packageJson.name = getCamelCasedName(args.label)
      const pkgString = JSON.stringify(packageJson)
      fs.writeFileSync(pathName, pkgString, 'utf-8')
    } catch (e) {
      console.log('Cant write file ', e)
    }
  }

  renameProject (args) {
    const appName = getCamelCasedName(args.label)
    exec.execSync(`cd /d ${args.location} && ren sample-app ${appName}`)
  }

  runNpmInstallViaNpmi (args) {
    // console.log('\ninstalling via npmi')
    this.showOutput(
      '<span className="info">Installing dependencies...<i class="fas fa-spinner fa-spin"></i></span>'
    )
    const appName = getCamelCasedName(args.label)
    const options = {
      path: `${args.location}/${appName}`,
      forceInstall: true,
      npmLoad: {
        loglevel: 'silent'
      }
    }

    npmi(options, (err, result) => {
      if (err) {
        if (err.code === npmi.LOAD_ERR) {
          console.log('npm load error')
          this.showOutput(
            '<span className="error">Error : npm load error</span>'
          )
        } else if (err.code === npmi.INSTALL_ERR) {
          // console.log('<span className="error">npm install error</span>')
          this.showOutput('Error : npm install error')
        }
        return console.log(err.message)
      }
      this.showOutput(`<span className="info">${result.join('\n')}</span>`)
      // console.log(`RESULT :: > ${result}`)
    })
  }

  runNpmInstall (args) {
    this.showOutput(
      '<span className="info">Installing dependencies. This may take some time. Please be patient.</span>'
    )
    const appName = args.label.replace(/\s+/g, '-').toLowerCase()
    const goTopath = `cd /d ${args.location}/${appName}`
    const npmInstall = exec.exec(`${goTopath} && npm install`)
    npmInstall.stdout.on('data', data => {
      // console.info('OUTPUT ==> ', data)
      this.showOutput(`<span className="info">${data}</span>`)
    })
    npmInstall.stderr.on('data', data => {
      // console.error('ERROR ', data)
      this.showOutput(`<span className="error">${data}</span>`)
    })

    // eslint-disable-next-line no-unused-vars
    npmInstall.on('close', exitCode => {
      this.showOutput('<span className="info">Npm install completed</span>')
    })
  }

  getPageContentByType (args) {
    const type = args.currentDocument.ptype
    switch (type) {
      case 'form':
        return DetailPageCode(args.currentDocument)
      case 'grid':
        return ListPageCode(args.currentDocument)
      default:
        return ''
    }
  }

  savePageDetailsToProject (args) {
    // console.log('Detail Page ==', JSON.stringify(args))

    const curApp = args.app.currentApplication
    const fileContent = this.getPageContentByType(args)
    const pageName = getCamelCasedName(args.currentDocument.label)
    const pathToComponent = `${curApp.location}\\${curApp.label}\\src\\components`
    if (fs.pathExistsSync(pathToComponent)) {
      fs.writeFileSync(
        `${pathToComponent}\\${pageName}.js`,
        fileContent,
        'utf-8'
      )
    }
  }

  saveMenuDetailsToProject (args) {
    console.log('on menu save ', JSON.stringify(args))
    const curApp = args.app.currentApplication
    const fileContent = MenuPageCode(args)
    const pathToMenu = `${curApp.location}\\${curApp.label}\\src\\containers`
    if (fs.pathExistsSync(pathToMenu)) {
      fs.writeFileSync(`${pathToMenu}\\RootContainer.js`, fileContent, 'utf-8')
    }
  }

  startServer (args) {
    const appName = getCamelCasedName(args.label)
    const goTopath = `cd /d ${args.location}/${appName}`
    this.serverStartScript = exec.exec(`${goTopath} && npm start --port 3210`)
    this.serverStartScript.stdout.on('data', data => {
      // console.info('OUTPUT ==> ', data)
      this.showOutput(`<span className="info">${data}</span>`)
    })
    this.serverStartScript.stderr.on('data', data => {
      console.error('ERROR ', data)
      this.showOutput(`<span className="error">${data}</span>`)
    })
  }

  stopServer () {
    const command = `taskkill /PID ${this.serverStartScript.pid} /T /F`
    const stopServer = exec.exec(command)
    return stopServer
  }

  showOutput (data) {
    this.mainWindow.webContents.send('shell-output', data)
  }
}
