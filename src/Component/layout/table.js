import React from 'react';
import { withStyles, Paper,Table,TableBody,TableRow,TableCell} from '@material-ui/core'

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    height: "280px",
    margin: "auto",
    overflow: "auto"
  },
  table: {
    minWidth: 700
  }
});

function Table1(props) {

    const {classes} = props

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
            <TableBody>
                {['Battery','CPU','Chipset','Display','GPU','Main Camera','Memory','Network','Resolution','Selfie Camera','Size','os'].map(row=>{
                    return (
                        <TableRow key={row} >
                            <TableCell style={{ color:'red',fontWeight:'bold' }} >{row}:</TableCell>
                            <TableCell align="right">{props.Specification[row]}</TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
            </Table>
        </Paper>
        
    );


}

export default withStyles(styles)(Table1);