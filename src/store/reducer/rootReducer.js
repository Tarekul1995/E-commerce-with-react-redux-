import authReducer from './authReducer'
import { combineReducers } from 'redux'
import productReducer from "./productReducer";
import productDetailReducer from "./productDetailReducer";
import cartReducer from './cartReducer'
const rootReducer = combineReducers({
    auth:authReducer,
    product:productReducer,
    productDetail:productDetailReducer,
    cart:cartReducer
});

export default rootReducer;