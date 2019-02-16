import React, { Component } from "react";
import Home from "./Component/dashboard/Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignUp from "./Component/auth/SignUp";
import SignIn from "./Component/auth/SignIn";
import Productdetail from './Component/product/productdetail'
import BrandList from './Component/product/ListofBrand'
import Cart from  './Component/layout/Cart'


class App extends Component {

  render() {
    
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/" component={Home} exact  />
            <Route path="/SignUp" component={SignUp} />
            <Route path="/SignIn" component={SignIn} />
            <Route path="/Product/:id" component={Productdetail} />
            <Route path="/Brand/:name" component={BrandList} />
            <Route path="/CartList" component={Cart} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}


export default App;
