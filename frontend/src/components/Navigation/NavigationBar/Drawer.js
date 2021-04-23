import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import DescriptionIcon from '@material-ui/icons/Description';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../../store/actions/auth';
import { loadPageName } from '../../../store/actions/info';

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

const MainDrawer = props => {
    
    const classes = useStyles();
    // Drawer opening
    const [state, setState] = useState({ open: false });
    // Drawer sub menus opening
    const [openInv, setOpenInv] = useState(false);
    const [openReq, setOpenReq] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);

    const toggleDrawer = (open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setState({ ...state, open: open });
      };

    const drawerClick = (adress, pageName) => {
      setState({ ...state, open: false });
      props.history.push(`/${adress}`);
    };
    
    const drawerItems = [
        {
          text: 'Главная',
          icon: <HomeIcon />,
          collapsable: false,
          click: () => drawerClick(''),
        },
        {
          text: 'Заявки',
          icon: <DescriptionIcon />,
          collapsable: true,
          click: () => {setOpenReq(!openReq)},
          condition: openReq,
          nestedItems: [
            {
              text: 'Создать заявку',
              click: () => drawerClick(''),
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
              text: 'Добавить платежку',
              click: () => drawerClick('invoices'),
            }
          ],
        },
        {
          text: 'Receipts',
          icon: <ReceiptIcon />,
          collapsable: false,
          click: () => drawerClick(''),
        },
      ];

    let profileItems = (
      <React.Fragment key="login" >
      <ListItem button onClick={() => drawerClick('login')}>
            <ListItemIcon ><AccountBoxIcon /></ListItemIcon>
            <ListItemText >Войти </ListItemText>
      </ListItem>
      </React.Fragment>
    );
    
    if (props.isAuthenticated) {
      profileItems = (
      <React.Fragment key="profile-full" >
            <ListItem button onClick={() => setOpenProfile(!openProfile)}>
            <ListItemIcon ><AccountBoxIcon /></ListItemIcon>
            <ListItemText >{props.firstName} {props.lastName} {openProfile ? <ExpandLess /> : <ExpandMore />} </ListItemText>
            </ListItem>
                  <Collapse in={openProfile} timeout="auto" unmountOnExit>
                      <ListItem key="dashboard" button onClick={() => drawerClick('user-dashboard')} className={classes.nested}>
                      <ListItemText >Профиль</ListItemText>
                      </ListItem>
                      <ListItem key="logout" button onClick={() => {
                        props.logoutUser();
                        drawerClick('');}} className={classes.nested}>
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
      {props.pageName}
    </Typography>
    </Toolbar>
    </AppBar>
    <Drawer anchor={'left'} open={state['open']} onClose={toggleDrawer(false)}>
      <List>
      {profileItems}
      <Divider />
      {props.isAuthenticated && drawerItems.map((item) => {
        if (item.collapsable) {
          return(
            <React.Fragment key={item.text} >
            <ListItem button onClick={item.click}>
            <ListItemIcon >{item.icon}</ListItemIcon>
            <ListItemText >{item.text} {item.condition ? <ExpandLess /> : <ExpandMore />} </ListItemText>
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
}


const mapStateToProps = state => {
  return {
      isAuthenticated: state.auth.isAuthenticated,
      firstName: state.auth.firstName,
      lastName: state.auth.lastName,
  };
};

export default connect(mapStateToProps, { logoutUser, loadPageName })(withRouter(MainDrawer));