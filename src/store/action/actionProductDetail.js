import firebase from './../../config/fbConfig'

const db = firebase.firestore()

export const fetchDetailProducts = (id) =>{
    return (dispatch,getState)=>{
        dispatch(fetchProductsBegin());
        db.collection('Phone').where('id','==',id).get().then((snap)=>{
            snap.forEach((doc)=>{
                dispatch(fetchProductsSuccess(doc.data()))
            })
        })
        .catch((error)=>{
            dispatch(fetchProductsFailure(error))
        })
    }
}

export const fetchProductsBegin = () => ({
    type: "FETCH_BEGIN_DETAIL"
  });
  
  export const fetchProductsSuccess = products => ({
    type: "FETCH_SUCCESS_DETAIL",
    payload: { products }
  });
  
  export const fetchProductsFailure = error => ({
    type: "FETCH_FAILURE_DETAIL",
    payload: { error }
  });