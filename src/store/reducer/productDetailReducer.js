const initialState = {
    items: {},
    loading: true,
    error: null
 }
 
 const productDetailReducer = (state = initialState, action) => {
    switch (action.type) {
       case "FETCH_BEGIN_DETAIL":
          return {
             ...state,
             loading: true,
             error: null
          };
       case "FETCH_SUCCESS_DETAIL":
          return {
             ...state,
             loading: false,
             items: action.payload.products
          };
       case "FETCH_FAILURE_DETAIL":
          return {
             ...state,
             loading: false,
             error: action.payload.error,
             items: []
          };
       default:
          return state
    }
 }
 
 export default productDetailReducer;