import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../../Service/redux/reducers/auth";
import axios from "axios";
const Message = ({ socket }) => {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const from = useSelector((state) => state.auth.userId);
  const users = useSelector((state) => state.auth.users);
  console.log(users);
  console.log(from);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`http://localhost:5001/users/all/all`)
      .then((res) => {
        dispatch(setUsers(res.data.result));
      })
      .catch((error) => {
        console.log(error);
      });
    socket.on("message", receivedMessage);

    return () => {
      socket.off("message", receivedMessage);
    };
  }, [messages]);
  const sendMessage = () => {
    socket.emit("message", { from, to, message });
  };
  const receivedMessage = (data) => {
    console.log(data);
    setMessages([...messages, data]);
  };
  return (
    <div>
      <h1>Message</h1>

      <input
        type="text"
        placeholder="message"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <select
        onChange={(e) => {
          setTo(e.target.value);
        }}
      >
        {" "}
        {users.length &&
          users.map((elem, i) => {
            // console.log(elem.id);
            return (
              <option id={elem.id} key={i} value={elem.id} data-extra={elem.username}>
               {elem.id} {elem.username}
              </option>
              
            );
          })}
      </select>
      {/* <input type='text' placeholder='to' onChange={(e)=>{
  setTo(e.target.value)
}}/> */}
      <button
        onClick={() => {
          sendMessage();
        }}
      >
        send
      </button>
      {messages.length > 0 &&
        messages.map((elem, i) => {
          return (
            <p key={i}>
              {" "}
              <small>
                from: {elem.from} {elem.message}
              </small>
            </p>
          );
        })}
    </div>
  );
};

export default Message;
