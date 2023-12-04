const initialState=null;
const deliverData=(state=initialState,action)=>{
    if(action.type==="DELIVER_DATA"){
        return action.value
    }
    return state
}
export default deliverData
export const storeDeliver=(value)=>{
    return{
        type:"DELIVER_DATA",
        value:value
    }
}