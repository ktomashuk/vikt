import React, { useState, useEffect } from 'react';
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
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
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
import { getPurchasesNotAssignedAndReceivedCount } from '../../../store/actions/purchases';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
    width: '100%',
  },
  title: {
    flexGrow: 1,
  },
}));

const MainDrawer = React.memo(props => {
    
    const classes = useStyles();
    const { logoutUser, unloadEverything, isAuthenticated, firstName, lastName, history, pageName,
      purchasesTotalNotCount, purchasesNotAssignedCount, purchasesNotReceivedCount,
      getPurchasesNotAssignedAndReceivedCount } = props;
    // Drawer sub menus opening
    const [openInv, setOpenInv] = useState(false);
    const [openReq, setOpenReq] = useState(false);
    const [openEst, setOpenEst] = useState(false);
    const [openDoc, setOpenDoc] = useState(false);
    const [openCont, setOpenCont] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    // State for purchases badge number
    const [purchaseNumber, setPurchaseNumber] = useState({
      notAssigned: 0,
      notReceived: 0,
      notTotal: 0,
    });
    // Updating badges
    useEffect(() => {
      setPurchaseNumber({
        notAssigned: purchasesNotAssignedCount,
        notReceived: purchasesNotReceivedCount,
        notTotal: purchasesTotalNotCount,
      });
    },[purchasesNotAssignedCount, purchasesNotReceivedCount, purchasesTotalNotCount]);
    // Drawer toggle
    const [state, setState] = useState({ open: false });
    const toggleDrawer = (open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setState({ ...state, open: open });
      getPurchasesNotAssignedAndReceivedCount();  
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
          icon: (
          <Badge key="badge-purchases" badgeContent={purchaseNumber.notTotal} color="secondary">
          <AccountBalanceWalletIcon />
          </Badge>
          ),
          collapsable: true,
          click: () => {setOpenInv(!openInv)},
          condition: openInv,
          nestedItems: [
            {
              text: 'Счета',
              click: () => drawerClick('purchases-bill'),
              icon: purchaseNumber.notTotal > 0 ? 
              (
              <Tooltip key="toolicon2" title={
                <React.Fragment>
                <div key="cc1">
                <Typography>
                  {"Не распределено: " + purchaseNumber.notAssigned}
                </Typography>
                </div>
                <div key="cc2">
                <Typography>
                  {"Не получено: " + purchaseNumber.notReceived}
                </Typography>
                </div>
                </React.Fragment>
              }>
              <PriorityHighIcon key="iconprior" style={{color: 'red'}}/>
              </Tooltip>
              ) : null,
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
      <React.Fragment>
      <ListItem key="login" button onClick={() => drawerClick('login')}>
            <ListItemIcon key="login-icon"><AccountBoxIcon /></ListItemIcon>
            <ListItemText key="login-text">Войти </ListItemText>
      </ListItem>
      </React.Fragment>
    );
    // Profile menu if user is authenticated
    if (isAuthenticated) {
      profileItems = (
      <React.Fragment>
            <ListItem key="profile-full" button onClick={() => setOpenProfile(!openProfile)}>
            <ListItemIcon key="profile-icon"><AccountBoxIcon /></ListItemIcon>
            <ListItemText key="profile=text">{firstName} {lastName} </ListItemText>
            {openProfile ? <ExpandLess /> : <ExpandMore />} 
            </ListItem>
                  <Collapse key="collprofile" in={openProfile} timeout="auto" unmountOnExit>
                      <ListItem key="dashboard" button onClick={() => drawerClick('user-dashboard')} className={classes.nested}>
                      <ListItemText key="dash-text">Профиль</ListItemText>
                      </ListItem>
                      <ListItem key="logout" button onClick={() => {
                        logoutUser();
                        drawerClick('login');}} className={classes.nested}>
                      <ListItemText key="logout-text">Выйти</ListItemText>
                      </ListItem>
                </Collapse>
      </React.Fragment>
      );
    }

  return (
    <div key="appbar">
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
      <Divider key="divider"/>
      {isAuthenticated && drawerItems.map((item) => {
        if (item.collapsable) {
          return(
            <React.Fragment >
            <ListItem key={`m${item.text}`} button onClick={item.click}>
            <ListItemIcon key={`icon${item.text}`}>{item.icon}</ListItemIcon>
            <ListItemText key={`text${item.text}`}>{item.text} </ListItemText>
            {item.condition ? <ExpandLess /> : <ExpandMore />} 
            </ListItem>
                  <Collapse key={`coll${item.text}`} in={item.condition} timeout="auto" unmountOnExit>
                    {item.nestedItems.map((item) => {
                      return(
                      <div key={`div${item.text}`}>
                      <ListItem key={`n${item.text}`} button onClick={item.click} className={classes.nested}>
                      <ListItemText key={`textn${item.text}`}>{item.text}</ListItemText>
                      {item.icon ? item.icon : null}
                      </ListItem>
                      </div>
                      );})}
                </Collapse>
            </React.Fragment>
          );
        } else {
          return(
            <React.Fragment>
            <ListItem key={`f${item.text}`} button onClick={item.click}>
            <ListItemIcon key={`icon2${item.text}`}>{item.icon}</ListItemIcon>
            <ListItemText key={`text2${item.text}`}>{item.text}</ListItemText>
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
      purchasesAssignedCount: state.pur.purchasesAssignedCount,
      purchasesNotAssignedCount: state.pur.purchasesNotAssignedCount,
      purchasesNotReceivedCount: state.pur.purchasesNotReceivedCount,
      purchasesTotalNotCount: state.pur.purchasesTotalNotCount,
  };
};

export default connect(mapStateToProps, 
  { logoutUser, unloadEverything, getPurchasesNotAssignedAndReceivedCount })(withRouter(MainDrawer));