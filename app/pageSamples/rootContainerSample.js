import { getCamelCasedName } from "../utils/Utils";

export default function getRootPageCode(appDetails) {
  const menus = appDetails.menu;
  const pages = appDetails.pages;

  function getComponentForMenu(menu){
    const page = pages.filter((pge) => {
      console.log('comparing ', pge.id, ' == ' , menu.page)
      return pge.id == menu.page;
    })
    if(page){
      return getCamelCasedName(page[0].label);
    }
    return '';
  }


  return `import React from 'react'
  import { Route, Link, Switch } from 'react-router-dom'
  import clsx from 'clsx'
  import { makeStyles, useTheme } from '@material-ui/core/styles'
  import Drawer from '@material-ui/core/Drawer'
  import AppBar from '@material-ui/core/AppBar'
  import Toolbar from '@material-ui/core/Toolbar'
  import List from '@material-ui/core/List'
  import CssBaseline from '@material-ui/core/CssBaseline'
  import Typography from '@material-ui/core/Typography'
  import Divider from '@material-ui/core/Divider'
  import IconButton from '@material-ui/core/IconButton'
  import MenuIcon from '@material-ui/icons/Menu'
  import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
  import ChevronRightIcon from '@material-ui/icons/ChevronRight'
  import ListItem from '@material-ui/core/ListItem'
  import ListItemIcon from '@material-ui/core/ListItemIcon'
  import ListItemText from '@material-ui/core/ListItemText'
  import InboxIcon from '@material-ui/icons/MoveToInbox'
  import Home from '../components/Home'
  import Login from '../authentication/Login';
  import PrivateRoute from '../authentication/PrivateRoute ';

  ${
    pages.map((page) => {
      return (`import ${getCamelCasedName(page.label)} from '../components/${getCamelCasedName(page.label)}'; `)
    })
    .join('\n')}

  const drawerWidth = 240

  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex'
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: '100%',
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginRight: 36
    },
    hide: {
      display: 'none'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap'
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1
      }
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    }
  }))

  export default function RootContainer () {
    const classes = useStyles()
    const theme = useTheme()
    const [open, setOpen] = React.useState(true)

    function handleDrawerOpen () {
      setOpen(true)
    }

    function handleDrawerClose () {
      setOpen(false)
    }

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position='fixed'
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='Open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              className={clsx(classes.menuButton, {
                [classes.hide]: open
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' noWrap>
              Mini variant drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant='permanent'
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open
            })
          }}
          open={open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <Link to='/'>
              <ListItem button key={'home'}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={'Home'} />
              </ListItem>
            </Link>
            ${
              menus.map((menu) => {
               return( `<Link to='/${getCamelCasedName(menu.label)}'>
              <ListItem button key={'${getCamelCasedName(menu.label)}'}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={'${menu.label}'} />
              </ListItem>
            </Link>`)
              }).join('\n')
            }
          </List>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            ${
              menus.map((menu) => {
                if(menu.page){
                  return (`<PrivateRoute path='/${getCamelCasedName(menu.label)}' component={${getComponentForMenu(menu)}} />`)
                }
              }).join('\n')
            }
          </Switch>
        </main>
      </div>
    )
  }
  `
}
