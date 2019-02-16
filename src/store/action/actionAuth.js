import firebase from "./../../config/fbConfig";

const db = firebase.firestore()

export const ActionSignUp =(credentials)=>{
    return dispatch=>{
        db.collection("User").where("Phone",'==',credentials.contact).get().then((snap)=>{
            if(snap.empty){
                if (credentials.password===credentials.re_password) {
                    firebase.auth().createUserWithEmailAndPassword(credentials.email,credentials.password).then((respons)=>{
                        return db.collection("User").doc(respons.user.uid).set({
                            Name:credentials.name,
                            Address:credentials.Address,
                            Phone:credentials.contact,
                            Gender:credentials.Gender,
                            Age:credentials.Age
                        }).then(()=>{
                            dispatch({type:"SIGNUP_SUCCESS"})
                        }).catch((err)=>{
                            dispatch({type:"SIGNUP_FAILED",payload:err})
                        })
                    })
                } else {
                    dispatch({type:"SIGNUP_PASSWORD_INCORRECT",payload:"Password don't match"})
                }
            }else{
                dispatch({type:"PHONE_UNIQUENESS",payload:"phone number has already saved database.please try another number"})
            }
        })
    }
}



export const ActionSignIn = (credentials) =>{
    return dispatch=>{
        firebase.auth().signInWithEmailAndPassword(credentials.email,credentials.password).then((user)=>{
            dispatch({type:"LOGIN_SUCCESS"})
        }).catch((err)=>{
            dispatch({type:"LOGIN_FAILED",payload:err.message})
        })

        setTimeout(()=>{
            dispatch({type:"RESET"})
        },6000)
        
    }
}


export const ActionSingOut = () =>{
    return dipatch=>{
        firebase.auth().signOut().then(()=>{
            firebase.auth().onAuthStateChanged((user)=>{
                if(user){
                    console.log('Sorry SinOut problem');
                    
                }else{
                    localStorage.setItem("isAuth",false)
                    dipatch({type:"SIGNOUT_SUCCESS"})
                }
            })
        })
    }
}

export const Authentication = ()=>{
    return dispatch=>{
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                console.log(user.uid);
                localStorage.setItem("isAuth",true)
                dispatch({type:"AUTHENTICATION"})
            }
        })
    }
}
