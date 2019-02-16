import React, { Component } from 'react';
import NavBar from './../layout/NavBar'
import Carousel from "./../layout/Carousel";
import { fetchProducts } from "./../../store/action/actionProduct";
import Productlist from './../product/productlist'
import { connect } from 'react-redux'
import {CircularProgress,withStyles,Typography} from '@material-ui/core'

const styles = theme => ({
   
    progress: {
        margin: '100px 50% 0px 45%',
        
    },
    head:{
        margin:'0px 50% 0px 35%'
    }
   
});

class Home extends Component {
    
    
    componentDidMount() {
        this.props.process()
    }

    render() { 

        const { classes,loading } =this.props

        return (
            <div>
               <NavBar path={this.props.location.pathname}/>
               <Carousel />
               {!loading ? 
               
                   ['Huawei','Oppo','Xiaomi','Samsung'].map((brand)=>{
                    return <Productlist key={brand} phoneName={brand} />
                   })
                : <Loading classes={classes} /> }
               
            </div>
        );
    }
}

function Loading(props) {
    const { classes } = props
    return (
      <div>
        <CircularProgress className={classes.progress} color="secondary" size={100}/>
        <Typography className={classes.head} component="h2" variant="display4" gutterBottom>
          Loading...
        </Typography>
      </div>
    )
  }

const mapStateToProps = state =>{
    return{
        cart:state.cart,
        loading: state.product.loading,
    }
}

const mapDispatchToProps =(dispatch)=>{
    return {
        process: ()=> dispatch(fetchProducts())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Home));