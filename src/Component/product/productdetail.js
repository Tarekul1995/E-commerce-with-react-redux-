import React, { Component } from "react";
import { Paper, Grid, Typography, withStyles, Button,CircularProgress } from "@material-ui/core";
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import "typeface-roboto";
import BodyBackgroundColor from "react-body-backgroundcolor";
import Productdetail2 from './productdetail2'
import { connect } from "react-redux";
import { fetchDetailProducts } from "./../../store/action/actionProductDetail";
import { AddCart } from './../../store/action/actionCart'
import { Redirect } from 'react-router-dom'
import NavBar from './../layout/NavBar'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: "50%",
    [theme.breakpoints.down('sm')]:{
      width:'80%'
    },
    margin: "auto",
    marginTop: "50px",
    height: "70%",
    flexGrow: 1
  },
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  progress: {
    margin: '100px 50% 0px 45%',
    
},
head:{
    margin:'0px 50% 0px 35%'
}
});

class Productdetail extends Component {

  state = {
    redireact:false
  }

  componentDidMount() {
    this.props.fetchDetail(this.props.match.params.id)
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
    const { classes, loading, productDetail} = this.props;

    return (
      <div>
        <NavBar path={this.props.location.pathname}/>
        <BodyBackgroundColor backgroundColor="#FF00FF">
        {loading ? <Loading classes={classes}/>:
        <Paper className={classes.root} elevation={1}>
            <Show classes={classes} item={productDetail} Id={this.props.match.params.id} cart={this.handelAddCart}  /> 
          {this.state.redireact ? <Redirect to={{pathname:'/SignIn',state:{message:"please login before add cart"}} }/> : null}
        </Paper>}
      </BodyBackgroundColor>
      </div>

    );

   
  }
}


function Show(props) {
  return (
    <React.Fragment>
      <Grid container spacing={16}>
      <Grid item xs={12} md={6} lg={6}>
        <img src={props.item.imageUrl} alt="" width="300px" height="400px" />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <ul style={{ listStyleType: "none" }}>
          <li>
            <Typography variant="h3" gutterBottom>
              {props.item.Name}
            </Typography>
          </li>
          <li>
            <Typography component="h2" variant="display1" gutterBottom>
              {props.item.Brand}
            </Typography>
          </li>
          <li>
            <Typography variant="title" gutterBottom>
              TK. {props.item.price}
            </Typography>
          </li>
          <li>
            <Button variant="contained" color="secondary" className={props.classes.button} onClick={(e)=>props.cart(e,props.Id)} >
              Add Cart
        <ShoppingCart className={props.classes.leftIcon} />
            </Button>
          </li>
        </ul>
      </Grid>
    </Grid>
    <Grid container spacing={8}>
      <Grid item xs={12} >
        <Productdetail2 spec={props.item.Specification} />
      </Grid>
    </Grid>
    </React.Fragment>
  )
}

function Loading(props) {
  const { classes } = props
  return (
    <div>
      <CircularProgress className={classes.progress} color="primary" size={100}/>
        <Typography className={classes.head} component="h2" variant="display4" gutterBottom>
          Loading...
        </Typography>
    </div>
  )
}

const mapStateToProps = state => ({
  productDetail: state.productDetail.items,
  loading: state.productDetail.loading,
  error: state.productDetail.error
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDetail: (id) => dispatch(fetchDetailProducts(id)),
    addCart:(id)=>dispatch(AddCart(id))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Productdetail));