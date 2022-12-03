export const SaveUser=(data)=>{
    return{
        type:"SAVE_USER",
        payload:data,
    }
}
export const GetUser=()=>{
    return{
        type:"GET_USER",
        
    }
}
export const DeleteUser=()=>{
    return{
        type:"DELETE_USER",
        
    }
}