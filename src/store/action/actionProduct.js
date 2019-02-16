import firebase from './../../config/fbConfig'

const db = firebase.firestore()

export const fetchProducts = () =>{
    return (dispatch,getState)=>{
        dispatch(fetchProductsBegin());
        db.collection('phoneFetch').doc('Phoneinfo').get().then((doc)=>{
            dispatch(fetchProductsSuccess(doc.data()))
        })
        .catch((error)=>{
            dispatch(fetchProductsFailure(error))
        })
    }
}

export const fetchProductsBegin = () => ({
    type: "FETCH_BEGIN"
  });
  
  export const fetchProductsSuccess = products => ({
    type: "FETCH_SUCCESS",
    payload: { products }
  });
  
  export const fetchProductsFailure = error => ({
    type: "FETCH_FAILURE",
    payload: { error }
  });