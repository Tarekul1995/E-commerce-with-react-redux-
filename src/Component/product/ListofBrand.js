import React, { Component } from 'react'
import { withStyles, Paper, Grid, Typography,Link,Button } from '@material-ui/core'
import "typeface-roboto";
import BodyBackgroundColor from "react-body-backgroundcolor";
import { connect } from "react-redux";
import { fetchProducts } from "./../../store/action/actionProduct";
import NavBar from './../layout/NavBar'
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import { AddCart } from './../../store/action/actionCart'
import { Redirect } from 'react-router-dom'

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        width:'70%',
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        margin:'auto',
        marginTop:'20px'
    },
    link:{
        color:'#193E91',
        '&:hover':{
            color:'red'
        }
    },
    button: {
        marginLeft: '30%'
      },
    leftIcon: {
        marginRight: theme.spacing.unit
      }
});

class BrandList extends Component {

    state = {
        hover: false,
        point: '0',
        redireact:false
    }

    componentDidMount() {
        this.props.process()
    }

    handelOverEvent = (event, key) => {
        event.persist();
        this.setState({ hover: true, point: key })
    }
    handelOutEvent = (event) => {
        event.persist();
        this.setState({ hover: false, point: '0' })
    }

    handelAddCart = (event,id) =>{
        event.preventDefault();
        if(JSON.parse(localStorage.getItem('isAuth'))){
            this.setState({redireact:false})
            this.props.addCart(id)
          }else{
            this.setState({redireact:true})
          }
    }

    render() {

        const item = this.props.products[this.props.match.params.name]
        const { classes } = this.props
        
        
        return (
            <React.Fragment>
                <NavBar path={this.props.location.pathname}/>
                <BodyBackgroundColor backgroundColor="#85F4FB">
                
                <div className={classes.root} >
                    <Grid container spacing={8} justify='flex-start'>
                        {item && item.map((value) => 
                            <Grid item key={value.id} xs={12} md={3} >
                                <Paper className={classes.paper} square={true} elevation={this.state.hover && (value.id===this.state.point) ? 10 : 1} onMouseEnter={(e) => this.handelOverEvent(e, value.id)} onMouseLeave={(e) => this.handelOutEvent(e, value.id)}>
                                    <img src={value.imageUrl} alt="" height="250px" width="250px"/>
                                    <Link href={`/Product/${value.id}`} underline='none' ><Typography component="h2" className={classes.link} variant="display1" gutterBottom>{value.Name.charAt(0).toUpperCase()+value.Name.slice(1)}</Typography></Link>
                                    <Typography variant="subheading" gutterBottom>{value.Brand}</Typography>
                                    <Typography variant="body2" style={{ color:'green' }} gutterBottom>{value.price}</Typography>
                                    <Button  variant="contained" color="secondary" onClick={(e)=>this.handelAddCart(e,value.id)} className={classes.button} >Add Cart<ShoppingCart className={classes.leftIcon} /></Button>
                                </Paper>
                            </Grid>
                        )}
                    </Grid>
                </div>
                
            </BodyBackgroundColor>
            {this.state.redireact ? <Redirect to={{pathname:'/SignIn',state:{message:"please login before add cart"}} }/> : null}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    products: state.product.items,
    loading: state.product.loading,
    error: state.product.error
});

const mapDispatchToProps = (dispatch) => {
    return {
        process: () => dispatch(fetchProducts()),
        addCart:(id)=>dispatch(AddCart(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BrandList));