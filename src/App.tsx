import React, { useState, useEffect } from 'react';
import {useDispatch} from "react-redux";
import {v4 as uuidv4} from 'uuid';
import store, { setMessages, setUsers } from './store';
import './Chat.css';

const Messages = (props: any) => props.data.map((m: any) => props.pk === m.id ? (<li key={m.pk}><strong>{m.name}</strong> : <div className="innermsg">{m.message}</div></li>) : (<li key={m.pk} className="update">{m.message}</li>));

const Online = (props: any) => props.data.map((m: any) => <li key={m.pk}>{m.name}</li>);

const App = () => {
  const [id, setId]: any = useState({'pk': '', 'name': ''});
  const [nameInput, setNameInput] = useState("");
  const [messageInput, setMessageInput] = useState('');
  const [updated, setUpdated] = useState(false);
  const dispatch = useDispatch();

  const messages: any = store.getState().messages; //useSelector((state: any) => state.chat.messages);
  const online: any = store.getState().users; // useSelector((state: any) => state.chat.users);

  const handleNameSubmit = (e: any) => {
    e.preventDefault();
    if (!nameInput) {
      return alert("Name can't be empty");
    }
    const pk = uuidv4();
    const user: any = {pk, name: nameInput};
    // check if name exists ...
    // const check = [...online].filter((data) => data.name === nameInput)
    setId(user);
    dispatch(setUsers({pk, 'name' : user.name}));
  };

  const handleMessageSend = (e: any) => {
    e.preventDefault();
    if (messageInput !== '') {
      dispatch(setMessages({'pk': uuidv4(), 'id': id.pk, 'name': nameInput, 'message': messageInput}));
      setMessageInput('');
      window.dispatchEvent( new Event('storage') );
    }
  };

  useEffect(() => {
    window.addEventListener("storage", (e)=> { setUpdated(!updated) } );
    return () => {
      window.removeEventListener("storage", (e)=> { setUpdated(!updated) } );
    };
  }, [updated]);

  return id.pk !== "" ? (
    <section style={{ display: "flex", flexDirection: "row" }}>
      <ul id="messages">
        <Messages data={messages} users={online} pk={id.pk} />
      </ul>
      <ul id="online">
        {" "}
        &#x1f310; : <Online data={online} />{" "}
      </ul>
      <div id="sendform">
        <form onSubmit={e => handleMessageSend(e)} style={{ display: "flex" }}>
          <input id="m" value={messageInput} onChange={(e) => {setMessageInput(e.target.value.trim())}} />
          <button style={{ width: "75px" }} type="submit">
            Send
          </button>
        </form>
      </div>
    </section>
  ) : (
    <div style={{ textAlign: "center", margin: "30vh auto", width: "70%" }}>
      <form onSubmit={event => handleNameSubmit(event)}>
        <input
          id="name"
          onChange={e => setNameInput(e.target.value.trim())}
          required
          placeholder="Enter your name .."
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
