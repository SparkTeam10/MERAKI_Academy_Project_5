import io from "socket.io-client"
const socketInit=({user_id,token})=>{
   return io("http://localhost:5001",{
        extraHeaders:{
            user_id,
            token,
        }
    })
}
export default socketInit