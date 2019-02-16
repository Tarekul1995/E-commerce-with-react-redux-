import React, { Component } from 'react';
import { withStyles, Grid, Paper, Typography ,Button } from "@material-ui/core";
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import { connect } from "react-redux";
import 'typeface-roboto'
import { AddCart } from './../../store/action/actionCart'
import { Redirect } from 'react-router-dom'
import CustomizedSnackbars from './../layout/Snackbars'

const styles = theme => ({
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 1,
        width: '70%',
        margin: 'auto',
        marginTop: '30px'
    },
    grid: {
        flexGrow: 1
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
    button: {
        marginLeft: '30%'
      },
    leftIcon: {
        marginRight: theme.spacing.unit
      }
});


class Productlist extends Component {

    state = {
        hover: false,
        point: '0',
        redireact:false,
        cartSuccess:false,
        cartError:false
    }

    handelOverEvent = (event, key) => {
        event.persist();
        this.setState({ hover: true, point: key })
    }
    handelOutEvent = (event) => {
        event.preventDefault();
        this.setState({ hover: false, point: '0' })
    }


    handelAddCart = (event,id) =>{
        event.preventDefault();
        if(JSON.parse(localStorage.getItem('isAuth'))){
            this.setState({redireact:false})
            this.props.addCart(id)
            setTimeout(()=>{
                console.log(this.props.decision);
                
                if (this.props.decision === 'addCart') {
                
                
                    this.setState({cartSuccess:false});
                    this.setState({cartSuccess:true});
                    setTimeout(()=>{
                        this.setState({cartSuccess:false});
                    },6000)
                } else if(this.props.decision === 'notaddcart') {
                    this.setState({cartError:false});
                    this.setState({cartError:true});
                    setTimeout(()=>{
                        this.setState({cartError:false});
                    },6000)
                }
            },1300)
          }else{
            this.setState({redireact:true})
          }
    }
    render() {

        const { classes,  products, phoneName } = this.props;

        return (
            <React.Fragment>
                <DesignProduct classes={classes} item={products} cart={this.handelAddCart} hover={this.state.hover} ID={this.state.point} over={this.handelOverEvent} out={this.handelOutEvent} brand={phoneName} /> 
                {this.state.redireact ? <Redirect to={{pathname:'/SignIn',state:{message:"please login before add cart"}} }/> : null}
                {this.state.cartSuccess && <CustomizedSnackbars message='cart added successful' variant='success' />}
                {this.state.cartError && <CustomizedSnackbars variant='warning' message="It's already include in cart option" />}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    products: state.product.items,
    
    error: state.product.error,
    decision:state.cart.decision
});

const mapDispatchToProps = dispatch =>{
    return{
        addCart:(id)=>dispatch(AddCart(id))
    }
}




function DesignProduct(props) {

    const { item, brand } = props
    const newItem = item[brand].slice(0, 4)

    return (
        <Paper className={props.classes.paper}>
            <Typography component="h2" variant="headline" gutterBottom >{brand}</Typography>
            <Grid container justify='center' spacing={8} >
                {
                    newItem.map((value) => {
                        return (
                            <Grid item key={value.id} xs={12} md={3} onMouseEnter={(e) => props.over(e, value.id)} onMouseLeave={(e) => props.out(e)}>
                                <div style={props.hover && (value.id===props.ID) ? { border:'2px solid orange',padding:'5px' }:{}} >
                                    <img src={value.imageUrl} alt="" width='250px' height="250px" />
                                    <a href={`/Product/${value.id}`}><Typography variant="title" gutterBottom style={{ marginLeft: '30%' }} >{value.Name}</Typography></a>
                                    <Typography variant="subheading" style={{ marginLeft: '30%', color: '#F01818' }} gutterBottom>{value.price}</Typography>
                                    {props.hover && (value.id===props.ID) &&  <Button  variant="contained" color="secondary" className={props.classes.button} onClick={(e)=>props.cart(e,value.id)} >Add Cart<ShoppingCart className={props.classes.leftIcon} /></Button>}
                                </div>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Paper>
    )
}




export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Productlist));