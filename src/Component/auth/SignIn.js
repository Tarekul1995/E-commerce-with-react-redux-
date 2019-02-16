import React, { Component } from 'react';
import { withStyles, Paper, Typography, Avatar, Button, FormControl, InputLabel, FormGroup, Grid,Input } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/LockOutlined';
import Lock from '@material-ui/icons/Lock'
import BodyBackgroundColor from "react-body-backgroundcolor";
import NavBar from './../layout/NavBar'
import { connect } from 'react-redux'
import { ActionSignIn } from './../../store/action/actionAuth'
import CustomizedSnackbars from "./../layout/Snackbars";
import { Authentication } from "./../../store/action/actionAuth";
import { Redirect } from 'react-router-dom'
import RedirectSnackbar from './../layout/RedirectSnackbar'

const styles = theme => ({

    layout: {
        width: 'auto',
        display: 'block', // Fix IE11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    margin: {
        margin: theme.spacing.unit,
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    textField: {
        marginTop: theme.spacing.unit,
        width: 200,
    },

});

class SignIn extends Component {

    state = {
        email: '',
        password: ''
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.SignIn(this.state)
        this.props.Auth()
      }

    render() {
        const { classes } = this.props
        
        
        if(JSON.parse(localStorage.getItem('isAuth'))) return <Redirect to='/' />
        
        
        return (
            <React.Fragment>
                <NavBar path={this.props.location.pathname}  />
                < BodyBackgroundColor backgroundColor="#29C4C6" >

                    <main className={classes.layout}>

                        <Paper className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <form  onSubmit={(e)=>this.handleSubmit(e)}>
                                <FormGroup className={classes.margin}>
                                    <Grid container spacing={8} alignItems="flex-end">
                                        <Grid item>
                                            <AccountCircle />
                                        </Grid>
                                        <Grid item>
                                            <FormControl required={true} className={classes.textField} >
                                                <InputLabel htmlFor="email" >E-mail</InputLabel>
                                                <Input id="email" value={this.state.email} onChange={this.handleChange("email")} type="email" />
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={8} alignItems="flex-end">
                                        <Grid item>
                                            <Lock />
                                        </Grid>
                                        <Grid item>
                                            <FormControl required={true} className={this.props.classes.textField} >
                                                <InputLabel htmlFor="password" >Password</InputLabel>
                                                <Input id="password" value={this.state.password} onChange={this.handleChange("password")} type="password" />
                                            </FormControl>
                                        </Grid>
                                    </Grid>

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >
                                        Sign in
                                    </Button>
                                </FormGroup>
                            </form>
                        </Paper>
                        {this.props.loginError ? <CustomizedSnackbars variant='error' message={this.props.message}  /> : null }
                        {this.props.login ? <CustomizedSnackbars variant='success' message={this.props.message} /> : null}
                        {this.props.location.state && <RedirectSnackbar message={this.props.location.state.message} />}
                    </main>
                </BodyBackgroundColor>
            </React.Fragment>

        );
    }
}

const mapStateToProps = state =>{
    
    
    return{
        loginError:state.auth.LoginError,
        login:state.auth.Login,
        message:state.auth.message
    }
    
}

const mapDispatchToProps = (dispatch) =>{
    return {
        SignIn: (value)=>dispatch(ActionSignIn(value)),
        Auth: ()=>dispatch(Authentication())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(SignIn));