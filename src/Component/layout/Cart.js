import React, { Component } from 'react';
import { Paper, Table, TableHead, TableBody, withStyles, TableCell, TableRow,Tooltip  } from '@material-ui/core'
import { connect } from 'react-redux'
import NavBar from './../layout/NavBar'
import { Redirect } from 'react-router-dom'
import { fetchCartItem,RemoveCartItem,UpdateQuantity } from './../../store/action/actionCart'
import Delete from '@material-ui/icons/Delete'
import Update from '@material-ui/icons/Update'

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '70%',
        margin: 'auto',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
    iconUpdate:{
        color:'#1D3DAF',
        position:'absolute'
    }
});

class Cart extends Component {

    state = {

    }

    componentDidMount() {
        this.props.cartfetch()
    }

    handelchange = (event) =>{
        console.log(event.target.name);
        
        this.setState({[event.target.name]:event.target.value})
    }

    handelRemoveItem = (event,id) =>{
        event.preventDefault();
        this.props.removeCart(id)
        
    }

    handelQuantity = (event,id,Quantity)=>{
        event.preventDefault();
        this.props.updateQuantity(id,Quantity)
    }

    render() {
        const { classes } = this.props;
        
        if (!JSON.parse(localStorage.getItem('isAuth'))) return <Redirect to={{ pathname: '/SignIn', state: { message: "please login before add cart" } }} />
        return (
            <React.Fragment>
                <NavBar path={this.props.location.pathname} />
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <CustomTableCell>Image</CustomTableCell>
                                {['Name', 'Price', 'Quantity', 'Toatal Price', 'Remove'].map((val) => <CustomTableCell key={val} align="right">{val}</CustomTableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {this.props.cartItem && this.props.cartItem.map((value) =>
                                <TableRow key={value.id}>
                                    <CustomTableCell> <img src={value.imageUrl} alt="" width="100px" height="100px" /> </CustomTableCell>
                                    <CustomTableCell style={{ color:'blue', fontSize:'25px' }}align="right">{value.Name}</CustomTableCell>
                                    <CustomTableCell style={{ color:'red', fontSize:'25px' }} align="right">{value.price}</CustomTableCell>
                                    <CustomTableCell style={{ position:'relative' }} align="right"><input style={{ width:'50px',borderRadius:'25px',textAlign:'center',}} name={`quantity${value.id}`} onChange={(e)=>this.handelchange(e)} type="number" value={this.state[`quantity${value.id}`]  ? this.state[`quantity${value.id}`] : value.Quantity  } /><Tooltip title='update your quantity'><Update className={classes.iconUpdate} onClick={(e)=>this.handelQuantity(e,value.id,this.state[`quantity${value.id}`])}  /></Tooltip></CustomTableCell>
                                    <CustomTableCell style={{ color:'green', fontSize:'25px' }} align="right">{parseInt(value.price.replace(',',''))*parseInt(value.Quantity)}</CustomTableCell>
                                    <CustomTableCell align="right"><Delete onClick={(e)=>this.handelRemoveItem(e,value.id)} /></CustomTableCell>
                                </TableRow>
                            )}

                        </TableBody>
                    </Table>
                </Paper>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        cartfetch: () => dispatch(fetchCartItem()),
        removeCart:(id)=>dispatch(RemoveCartItem(id)),
        updateQuantity: (id,quantuty)=>dispatch(UpdateQuantity(id,quantuty))
    }
}

const mapStateToProps = state => {
    return {
        cartItem: state.cart.items.Cartproducts,
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Cart));