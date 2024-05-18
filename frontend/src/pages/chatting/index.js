import React, { useEffect, useState } from 'react'
import socketInit from '../../socketserver'
import { useDispatch, useSelector } from "react-redux";
import Message from './message';
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
const Chat = () => {
  const token = useSelector((state) => state.auth.token);
  const user_id = useSelector((state) => state.auth.userId);
  const [isConnected, setIsConnected] = useState(false)
  const navigate = useNavigate();
  // const [token, setToken] = useState(false)
  // const [user_id, setUser_id] = useState(false)
  console.log(token,'user',user_id);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    // add a an event listener on message events
    socket?.on("connect", () => {
     setIsConnected(true);
    });
    socket?.on("connect_error", (error) => {
      console.log(error.message);
      setIsConnected(false);
     });
   
     return ()=>{
      socket?.close()
      socket?.removeAllListeners();
      setIsConnected(false);
     }
  }, [socket]);
  return (
   <div>
     <h1>chat</h1>

<button onClick={()=>{
  setSocket(socketInit({user_id,token}))
}}>chat</button>
{socket && <Message socket={socket}/>}
<br />
      <div className="b1">
        <Button
          className="b11"
          variant="dark"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </Button>{" "}
        <Button
          className="b11"
          variant="dark"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </Button>
      </div>
   </div>
  )
}

export default Chat