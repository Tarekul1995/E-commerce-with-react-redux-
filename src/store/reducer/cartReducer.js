const initState = {
    isEmpty:true,
    loading:true,
    items:[]
}

const cartReducer = (state=initState,action)=>{
    switch(action.type){
        case "ADD_CART":
            return{
                ...state,
                isEmpty:false,
                decision:'addCart',
            }
        case "CART_FETCH_BEGIN":
            return{
                ...state,
                isEmpty:false,
            }
        case "CART_FETCH_SUCCESS":
            return{
                ...state,
                isEmpty:false,
                loading:false,
                items:action.payload
            }
        case "CART_REMOVE":
            console.log(action.payload);
            return state;
        case "NOT_ADD_CART":
            return{
                ...state,
                isEmpty:false,
                loading:false,
                decision:'notaddcart', 
            }
        case "UPDATE_QUANTITY":
            return state;
        default:
            return state
            
    }
}

export default cartReducer;