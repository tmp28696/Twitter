const Store = {
    authFlag : false,
    message : "",
    
}

const reducersignup = (state = Store,action) => {
    if(action.type === "SIGNUP" && action.statusCode == 200){
        return {
            ...state,
            authFlag :action.payload.data.status,
            message : action.payload.data.message 
            
        }
    }
    if(action.type === "SIGNUP" && action.statusCode == 403){
        return {
            ...state,
            authFlag : action.payload.success,
            message : "invalid email"
        }
     }
    return state;
}

export default reducersignup;