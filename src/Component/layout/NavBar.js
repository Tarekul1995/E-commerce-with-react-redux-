import React from "react";
import {
  withStyles,
  AppBar,
  Toolbar,
  Typography,
  colors,
  InputBase,
  Menu,
  MenuItem,IconButton,Badge,Tooltip,Button
} from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import "typeface-roboto";
// import LoginNav from './LoginNav'
import {
  fade
} from '@material-ui/core/styles/colorManipulator'
import SearchIcon from "@material-ui/icons/Search";
import Link from '@material-ui/core/Link';
import MoreIcon from '@material-ui/icons/MoreVert';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import { connect } from 'react-redux'
import { ActionSingOut } from './../../store/action/actionAuth'
import CustomizedSnackbars from "./../layout/Snackbars";
import { Authentication } from "./../../store/action/actionAuth";
import { fetchCartItem } from './../../store/action/actionCart'

const styles = theme =>({
  root: {
    width: '100%'
  },
  grow: {
    flexGrow: 1,
  },
      inputRoot: {
          color: 'inherit',
          width: '100%',
        },
        inputInput: {
          paddingTop: theme.spacing.unit,
          paddingRight: theme.spacing.unit,
          paddingBottom: theme.spacing.unit,
          paddingLeft: theme.spacing.unit * 10,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('md')]: {
            width: 400,
          },
        },
        search: {
          position: 'relative',
          borderRadius: theme.shape.borderRadius,
          backgroundColor: fade(theme.palette.common.white, 0.15),
          '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
          },
          marginRight: theme.spacing.unit * 2,
          marginLeft: '0px',
          width: '100%',
          [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
          },
        },
        searchIcon: {
          width: theme.spacing.unit * 9,
          height: '100%',
          position: 'absolute',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        sectionDesktop: {
          display: 'none',
          [theme.breakpoints.up('md')]: {
            display: 'flex',
          },
        },
        sectionMobile: {
          display: 'flex',
          [theme.breakpoints.up('md')]: {
            display: 'none',
          },
        },
});

const theme = createMuiTheme({
  palette: {
        primary: {main:colors.grey[800]}
  }
});

class NavBar extends React.Component {

  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    brandanchorEl:null
  };

  handleClick = event =>{
    this.setState({ brandanchorEl: event.currentTarget });
  }

  handleClose = () => {
    this.setState({ brandanchorEl: null });
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handlelogOut = () =>{
    this.props.SignOut()
    this.props.Auth()
    window.location.reload(true);
  }
  componentDidMount() {
    this.props.cartfetch()
}

  render(){
    const { anchorEl, mobileMoreAnchorEl,brandanchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const isAuth = JSON.parse(localStorage.getItem('isAuth'))
    
    
    
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handlelogOut}>LogOut</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        
        {this.props.path === '/' ? null : <MenuItem><Link href={`/`} underline="none" style={{ margin:'10px',color:'black' }} >HOME</Link></MenuItem>}
        {(this.props.path === '/SignIn') || isAuth ? null : <MenuItem><Link href={`/SignIn`} underline="none"  style={{ margin:'10px',color:'black' }}>LOGIN</Link></MenuItem>}
        {(this.props.path === '/SignUp')  || isAuth ? null :<MenuItem> <Link href={`/SignUp`} underline="none"  style={{ margin:'10px',color:'black' }} >SIGNUP</Link></MenuItem>}
        <MenuItem>
            <Badge style={{ margin:'10px' }} badgeContent={0} color="secondary" >
              <ShoppingCart />
            </Badge>
            <p>ShoppingCart</p>
        </MenuItem>
        <MenuItem style={{ margin:'10px' }} onClick={this.handleClick}>
        BRAND
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Electronics 
            </Typography>
           
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                />
            </div>
            < div className = {
              classes.grow
            }
            />
            <div className={classes.sectionDesktop}>
              
              {this.props.path === '/' ? null : <Link href={`/`} underline="none" style={{ margin:'10px',color:'white' }} >HOME</Link>}
              {(this.props.path === '/SignIn') || isAuth ? null : <Link href={`/SignIn`} underline="none"  style={{ margin:'10px',color:'white' }}  >LOGIN</Link>}
              {(this.props.path === '/SignUp')  || isAuth ? null : <Link href={`/SignUp`} underline="none"  style={{ margin:'10px',color:'white' }} >SIGNUP</Link>}
              <Tooltip title='Open Mobile brand name'>
              <Button
              aria-owns={anchorEl ? 'simple-menu' : undefined}
              aria-haspopup="true"
              onClick={this.handleClick}
              style={{color:'white'}}
              >
              Brand
              </Button>
              </Tooltip>
              <Menu
              id="simple-menu"
              anchorEl={brandanchorEl}
              open={Boolean(brandanchorEl)}
              onClose={this.handleClose}
              >
              {['Huawei','Oppo','Samsung','Xiaomi'].map((val)=>
                <MenuItem onClick={this.handleClose} key={val}><Link href={`/Brand/${val}`} underline="none"  style={{ color:'black' }}>{val}</Link></MenuItem>
              )}
              </Menu>
              <Tooltip title='ShoppingCart' >
              <Badge style={{ margin:'10px' }} badgeContent={this.props.cartItem ? parseInt(this.props.cartItem.length) : 0} color="secondary" >
                <Link href={`/CartList`} underline="none" style={{ color:'white' }}><ShoppingCart /></Link>
              </Badge>
              </Tooltip>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true" 
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </MuiThemeProvider>
      {renderMenu}
      {renderMobileMenu}
      {this.props.LogOut ? <CustomizedSnackbars variant='success' message='LogOut Success' /> : null}
    </div>
  );

   

  }
  
}

const mapStateToProps = state =>({
  LogOut:state.auth.SignOut,
  cartItem: state.cart.items.Cartproducts,
})

const mapDispatchToProps = (dispatch) =>{
  return {
      SignOut: ()=>dispatch(ActionSingOut()),
      Auth: ()=>dispatch(Authentication()),
      cartfetch: () => dispatch(fetchCartItem()),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(NavBar));