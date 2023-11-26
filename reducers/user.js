
const user=(state=null,action)=>{
    if(action.type === 'SET_USER'){
        return action.value;
    }
    return state
}
export default user;
export const storeUser=(value)=>{
    return{
        type:"SET_USER",
        value:value
    }
}