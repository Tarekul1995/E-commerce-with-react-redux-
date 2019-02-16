const initialState = {
   items: {},
   loading: true,
   error: null
}

const productReducer = (state = initialState, action) => {
   switch (action.type) {
      case "FETCH_BEGIN":
         return {
            ...state,
            loading: true,
            error: null
         };
      case "FETCH_SUCCESS":
         return {
            ...state,
            loading: false,
            items: action.payload.products
         };
      case "FETCH_FAILURE":
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

export default productReducer;