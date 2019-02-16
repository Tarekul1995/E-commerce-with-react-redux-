import React, { Component } from "react";
import {
  withStyles,
  Paper,
  Typography,
  Avatar,
  Button,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  FormGroup,
  Input,
  Select
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import AccountBox from "@material-ui/icons/AccountBox";
import Lock from "@material-ui/icons/Lock";
import Mail from "@material-ui/icons/Mail";
import Home from "@material-ui/icons/Home";
import Phone from "@material-ui/icons/Phone";
import Accessibility from '@material-ui/icons/Accessibility'
import PermIdentity from '@material-ui/icons/PermIdentity'
import NavBar from './../layout/NavBar'
import { connect } from 'react-redux'
import { ActionSignUp } from './../../store/action/actionAuth'
import CustomizedSnackbars from "./../layout/Snackbars";
import { Redirect } from 'react-router-dom'


const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  margin: {
    marginTop: theme.spacing.unit
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  textField: {
    marginTop: theme.spacing.unit,
    width: 200,
  },
});

const gender = [
  {
  value: "Male",
  label: "Male"
}, {
  value: "Female",
  label: "Female"
}]

class SignUp extends Component {
  state = {
    name: "",
    email: "",
    Address: "",
    contact: "",
    Gender: "",
    Age: "",
    password: "",
    re_password: "",
   
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.SignUp(this.state)
  }

  render() {
    
    
    if(JSON.parse(localStorage.getItem('isAuth'))) return <Redirect to='/' />
    
    return (
      <div>
        <NavBar path={this.props.location.pathname} />
        <main className={this.props.classes.layout}>
          <Paper className={this.props.classes.paper}>
            <Avatar className={this.props.classes.avatar}>
              <AccountBox />
            </Avatar>
            <Typography component="h1" variant="h5">
              User Register
            </Typography>
            <form onSubmit={(e)=>{this.handleSubmit(e)}}>
              <FormGroup className={this.props.classes.margin}>
                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item>
                    <AccountCircle />
                  </Grid>
                  <Grid item>
                    <FormControl required={true} className={this.props.classes.textField}>
                      <InputLabel htmlFor="fullname" >Name</InputLabel>
                      <Input  id="fullname" value={this.state.name} onChange={this.handleChange("name")}  />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item>
                    <Mail />
                  </Grid>
                  <Grid item>
                    
                    <FormControl required={true} className={this.props.classes.textField}>
                      <InputLabel htmlFor="email" >E-mail</InputLabel>
                      <Input  id="email" value={this.state.email} onChange={this.handleChange("email")}  type="email" />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item>
                    <Home />
                  </Grid>
                  <Grid item>
                    
                    <FormControl required={true} className={this.props.classes.textField}>
                      <InputLabel htmlFor="address" >Address</InputLabel>
                      <Input  id="address" value={this.state.Address} onChange={this.handleChange("Address")}  />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item>
                    <Accessibility />
                  </Grid>
                  <Grid item>
                    
                    <FormControl required={true} className={this.props.classes.textField}>
                    <InputLabel htmlFor="gender" >Gender</InputLabel>
                      <Select value={this.state.Gender} onChange={this.handleChange("Gender")} inputProps={{name:'gender',id:'gender'}}>
                      {gender.map(option => (
                        <MenuItem key={option.value} value={option.value} >
                          {option.label}
                        </MenuItem>
                      ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item>
                    <PermIdentity />
                  </Grid>
                  <Grid item>
                    
                    <FormControl required={true} className={this.props.classes.textField}>
                      <InputLabel htmlFor="age" >Age</InputLabel>
                      <Input id="age" value={this.state.Age} onChange={this.handleChange("Age")}  type="number" />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item>
                    <Phone />
                  </Grid>
                  <Grid item>
                    
                    <FormControl required={true} className={this.props.classes.textField} error={this.props.isPhoneError} >
                      <InputLabel htmlFor="phone" >Mobile No:</InputLabel>
                      <Input  id="phone" value={this.state.contact} onChange={this.handleChange("contact")}  />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item>
                    <Lock />
                  </Grid>
                  <Grid item>
                    <FormControl required={true} className={this.props.classes.textField} error={this.props.isPassWord}>
                      <InputLabel htmlFor="password" >Password</InputLabel>
                      <Input  id="password" value={this.state.password} onChange={this.handleChange("password")} type="password" />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item>
                    <Lock />
                  </Grid>
                  <Grid item>
                    <FormControl required={true} className={this.props.classes.textField}>
                      <InputLabel htmlFor="re-password" >Retype Password</InputLabel>
                      <Input  id="re-password" value={this.state.re_password} onChange={this.handleChange("re_password")} type="password" />
                    </FormControl>
                  </Grid>
                </Grid>
              </FormGroup>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={this.props.classes.submit}
              >
                SignUp
            </Button>
            </form>
          </Paper>
        </main>
        {this.props.isPassWord ?<CustomizedSnackbars /> : null  }
        {this.props.isPhoneError ?<CustomizedSnackbars /> : null  }
        {this.props.isSignUp ?<CustomizedSnackbars /> : null  }
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return{
    isError:state.auth.isError,
    isPhoneError:state.auth.phoneError,
    isPassWord:state.auth.isPassError,
    isSignUp:state.auth.SingnUp,
    Error:state.auth.Error,
    
  }
}

const mapDispatchToProps = dispatch => {
  return {
    SignUp: (value) => dispatch(ActionSignUp(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignUp));