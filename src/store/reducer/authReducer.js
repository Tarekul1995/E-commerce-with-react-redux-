const initState = {
   message:''
}

const authReducer = (state=initState,action) =>{
    switch(action.type){
        case "SIGNUP_SUCCESS":
            return {
                ...state,
                variant:"success",
                message:"SignUp Successfuly",
                SignUp:true
            }
        case "SIGNUP_FAILED":
            return {
                ...state,
                isError:true,
                phoneError:false,
                isPassError:false,
                message:action.payload,
                variant:"error"
            }
        case "SIGNUP_PASSWORD_INCORRECT":
            return{
                ...state,
                isError:false,
                phoneError:false,
                isPassError:true,
                message:action.payload,
                variant:"error"
            }
        case "PHONE_UNIQUENESS":
            return{
                ...state,
                isError:false,
                phoneError:true,
                isPassError:false,
                variant:"error",
                message:action.payload
            }
        
        case "LOGIN_SUCCESS":
            return{
                ...state,
                Login:true,
                variant:"success",
                message:"Login Success",
            }
        case "LOGIN_FAILED":
            return{
                ...state,
                LoginError:true,
                variant:'error',
                message:action.payload
            }
        case "SIGNOUT_SUCCESS":
            return{
                ...state,
                SignOut:true,
                variant:"success",
                message:"SignOut Success"
            }
        case "AUTHENTICATION":
            return{
                ...state,
                isAuth:action.payload
            }
        case "RESET":
            let key = Object.keys(state);
            key.forEach((val)=>{
               if(val !== 'message'){
                delete state[val]
               }
            })
            return{
                ...state
            }
        default:
            return state
    }
}

export default authReducer;