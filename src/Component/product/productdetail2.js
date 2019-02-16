import React, { Component } from 'react';
import { AppBar,Tab,Tabs,withStyles,Typography } from '@material-ui/core'
import Table1 from './../layout/table'
function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    table: {
        minWidth: 700,
    },
});

class Productdetail2 extends Component {

    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {

        const {classes,spec} = this.props
        const {value} = this.state

        return <div className={classes.root}>
            <AppBar position="static" style={{ background: "#283747" }}>
              <Tabs value={value} onChange={this.handleChange}>
                <Tab label="Specification" />
                <Tab label="Detail" />
              </Tabs>
            </AppBar>
            {value === 0 && <TabContainer>
                <Table1 Specification={spec} />
              </TabContainer>}
            {value === 1 && <TabContainer>Item Two</TabContainer>}
          </div>;
    }
}

export default withStyles(styles)(Productdetail2);