import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// Material UI elements
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
// Icons
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import DescriptionIcon from '@material-ui/icons/Description';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MenuBookIcon from '@material-ui/icons/MenuBook';
// Redux
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../../store/actions/auth';
import { unloadEverything } from '../../../store/actions/unload';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  title: {
    flexGrow: 1,
  },
}));

const MainDrawer = React.memo(props => {
    
    const classes = useStyles();
    const { logoutUser, unloadEverything, isAuthenticated, firstName, lastName, history, pageName } = props;
    // Drawer sub menus opening
    const [openInv, setOpenInv] = useState(false);
    const [openReq, setOpenReq] = useState(false);
    const [openEst, setOpenEst] = useState(false);
    const [openDoc, setOpenDoc] = useState(false);
    const [openCont, setOpenCont] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    // Drawer toggle
    const [state, setState] = useState({ open: false });
    const toggleDrawer = (open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setState({ ...state, open: open });
      };
    // Clicking a drawer item
    const drawerClick = (adress) => {
      unloadEverything();
      setState({ ...state, open: false });
      history.push(`/${adress}`);
    };
    // Drawer menu contents
    const drawerItems = [
        {
          text: 'Главная',
          icon: <HomeIcon />,
          collapsable: false,
          click: () => drawerClick(''),
        },
        {
          text: 'Заявки',
          icon: <LibraryBooksIcon />,
          collapsable: true,
          click: () => {setOpenReq(!openReq)},
          condition: openReq,
          nestedItems: [
            {
              text: 'Создать заявку',
              click: () => drawerClick('placeholder'),
            }
          ],
        },
        {
          text: 'Закупка',
          icon: <AccountBalanceWalletIcon />,
          collapsable: true,
          click: () => {setOpenInv(!openInv)},
          condition: openInv,
          nestedItems: [
            {
              text: 'Создать заявку',
              click: () => drawerClick('purchases-request'),
            },
            {
              text: 'Счета',
              click: () => drawerClick('purchases-bill'),
            },
            {
              text: 'Посмотреть закупку',
              click: () => drawerClick('purchases-overview'),
            },
          ],
        },
        {
          text: 'Сметы',
          icon: <AssignmentIcon />,
          collapsable: true,
          click: () => {setOpenEst(!openEst)},
          condition: openEst,
          nestedItems: [
            {
              text: 'Просмотр смет',
              click: () => drawerClick('estimates'),
            },
            {
              text: 'Добавить смету',
              click: () => {
              window.open('http://192.168.0.150:8000/admin/estimates/estimate/import/', '_blank');
              setState({ ...state, open: false })
            },
            },
          ],
        },
        {
          text: 'Документы',
          icon: <DescriptionIcon />,
          collapsable: true,
          click: () => {setOpenDoc(!openDoc)},
          condition: openDoc,
          nestedItems: [
            {
              text: 'Кабельные журналы',
              click: () => drawerClick('cable-journal'),
            },
            {
              text: 'Акт измерения изоляции',
              click: () => drawerClick('isolation'),
            },
          ],
        },
        {
          text: 'Реестры',
          icon: <MenuBookIcon />,
          collapsable: true,
          click: () => {setOpenCont(!openCont)},
          condition: openCont,
          nestedItems: [
            {
              text: 'Объекты',
              click: () => drawerClick('object'),
            },
            {
              text: 'Контрагенты',
              click: () => drawerClick('contractors'),
            },
          ],
        },
      ];
    // Profile menu if user is not authenticated
    let profileItems = (
      <React.Fragment key="login" >
      <ListItem button onClick={() => drawerClick('login')}>
            <ListItemIcon ><AccountBoxIcon /></ListItemIcon>
            <ListItemText >Войти </ListItemText>
      </ListItem>
      </React.Fragment>
    );
    // Profile menu if user is authenticated
    if (isAuthenticated) {
      profileItems = (
      <React.Fragment key="profile-full" >
            <ListItem button onClick={() => setOpenProfile(!openProfile)}>
            <ListItemIcon ><AccountBoxIcon /></ListItemIcon>
            <ListItemText >{firstName} {lastName} </ListItemText>
            {openProfile ? <ExpandLess /> : <ExpandMore />} 
            </ListItem>
                  <Collapse in={openProfile} timeout="auto" unmountOnExit>
                      <ListItem key="dashboard" button onClick={() => drawerClick('user-dashboard')} className={classes.nested}>
                      <ListItemText >Профиль</ListItemText>
                      </ListItem>
                      <ListItem key="logout" button onClick={() => {
                        logoutUser();
                        drawerClick('login');}} className={classes.nested}>
                      <ListItemText >Выйти</ListItemText>
                      </ListItem>
                </Collapse>
      </React.Fragment>
      );
    }

  return (
    <div>
    <React.Fragment>
    <AppBar position="static">
    <Toolbar>
    <IconButton edge="start" className={classes.menuButton} onClick={toggleDrawer(true)} color="inherit" aria-label="menu">
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" className={classes.title}>
      {pageName}
    </Typography>
    </Toolbar>
    </AppBar>
    <Drawer anchor={'left'} open={state['open']} onClose={toggleDrawer(false)}>
      <List component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}>
      {profileItems}
      <Divider />
      {isAuthenticated && drawerItems.map((item) => {
        if (item.collapsable) {
          return(
            <React.Fragment key={item.text} >
            <ListItem button onClick={item.click}>
            <ListItemIcon >{item.icon}</ListItemIcon>
            <ListItemText >{item.text} </ListItemText>
            {item.condition ? <ExpandLess /> : <ExpandMore />} 
            </ListItem>
                  <Collapse in={item.condition} timeout="auto" unmountOnExit>
                    {item.nestedItems.map((item) => {
                      return(
                      <ListItem key={item.text} button onClick={item.click} className={classes.nested}>
                      <ListItemText >{item.text}</ListItemText>
                      </ListItem>
                      );})}
                </Collapse>
            </React.Fragment>
          );
        } else {
          return(
            <React.Fragment key={item.text} >
            <ListItem button onClick={item.click}>
            <ListItemIcon >{item.icon}</ListItemIcon>
            <ListItemText >{item.text}</ListItemText>
            </ListItem>
            </React.Fragment>
          );
        }
      })}
      </List>
      </Drawer>
      </React.Fragment>
    </div>
  );
});


const mapStateToProps = state => {
  return {
      isAuthenticated: state.auth.isAuthenticated,
      firstName: state.auth.firstName,
      lastName: state.auth.lastName,
  };
};

export default connect(mapStateToProps, 
  { logoutUser, unloadEverything })(withRouter(MainDrawer));