import firebase from "./../../config/fbConfig";

const db = firebase.firestore()

export const AddCart = (id) =>{
    return (dispatch)=>{
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                db.collection('User').doc(user.uid).get().then((doc)=>{
                    if(doc.data().CartItem){
                        const OldCartItem = doc.data().CartItem;
                        db.collection("Phone").where('id','==',id).get().then((snap)=>{
                            snap.forEach((doc1)=>{
                                let able = OldCartItem.findIndex((val)=> val.id === doc1.data().id )+1
                                if(able){
                                    dispatch({type:"NOT_ADD_CART"})
                                }else{
                                    OldCartItem.push({...doc1.data(),Quantity:1})
                                    db.collection('User').doc(user.uid).update({
                                        CartItem:OldCartItem
                                    }).then(()=>{
                                        dispatch({type:"ADD_CART"})
                                    })
                                }
                            })
                        })
                    }else{
                        db.collection("Phone").where('id','==',id).get().then((snap)=>{
                            snap.forEach((doc1)=>{
                                db.collection("User").doc(user.uid).set({...doc.data(),CartItem:[{...doc1.data(),Quantity:1}]})
                            })
                        }).then(()=>{
                            dispatch({type:"ADD_CART"})  
                        })
                    }
                })
            }
        })
    }
}

export const fetchCartItem = () =>{
    return dispatch=>{
        firebase.auth().onAuthStateChanged((user)=>{
            dispatch({type:"CART_FETCH_BEGIN"})
            db.collection('User').doc(user.uid).onSnapshot((doc)=>{
                dispatch(fetchCartProductsSuccess(doc.data().CartItem))
            })
        })
    }
}

 const fetchCartProductsSuccess = Cartproducts => ({
    type: "CART_FETCH_SUCCESS",
    payload: { Cartproducts }
  });



export const RemoveCartItem = (id) =>{
    return dispatch=>{
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                let UserCartItem = [];
                let removeCartItem = {};
                
                db.collection('User').doc(user.uid).get().then((doc)=>{
                    UserCartItem = doc.data().CartItem
                }).then(()=>{
                    db.collection("Phone").where('id','==',id).get().then((snap)=>{
                        snap.forEach((doc)=>{
                            removeCartItem = doc.data()
                        })
                    }).then(()=>{
                        db.collection('User').doc(user.uid).update({
                            CartItem: UserCartItem.filter((val)=>{
                                return val.id !== removeCartItem.id 
                            })
                        })
                    }).then(()=>{
                        dispatch({type:"CART_REMOVE"})
                    })
                })
            }
        })
    }
}

export const UpdateQuantity= (id,quantity) =>{
   return dispatch=>{
    firebase.auth().onAuthStateChanged((user)=>{
        if(user){
            let updatequantity = []
            db.collection('User').doc(user.uid).get().then((doc)=>{
                updatequantity = doc.data().CartItem
            }).then(()=>{
                if(quantity==='undefined'){
                    dispatch({type:'UPDATE_QUANTITY'})
                }else{
                    updatequantity[updatequantity.findIndex((val)=>val.id===id)].Quantity = quantity;
                    db.collection('User').doc(user.uid).update({
                        CartItem:updatequantity
                    }).then(()=>{
                        dispatch({type:'UPDATE_QUANTITY'})
                    })
                }
                
            })
            
        }
    })
   }
}