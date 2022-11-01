import React, { useState, useEffect } from 'react';
import {useDispatch} from "react-redux";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {v4 as uuidv4} from 'uuid';
import store, { setMessages, setUsers } from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Chat.css';

const Messages = (props: any) => (
  <>
    {props.data.map((m: any) => props.pk === m.id ? (
      <div className="outgoing_msg" key={m.pk}>
        <div className="sent_msg">
          <p>{m.message} </p>
          <span className="time_date">{m.name} | {m.time}</span> 
        </div>
      </div>
    ) : (
      <div  key={m.pk}>
        <div className="incoming_msg">
          <div className="incoming_msg_img"> 
            <img src="https://ptetutorials.com/images/user-profile.png" alt="chatimg" /> 
          </div>
          <div className="received_msg">
            <div className="received_withd_msg">
              <p>{m.message}</p>
              <span className="time_date">{m.name} | {m.time}</span></div>
          </div>
        </div>
      </div>
    ))}
  </>
);

const Online = (props: any) => (
  <>
    {props.data.map((m: any) => (
      <div key={m.pk} className="chat_list">
        <div className="chat_people">
          <div className="chat_ib">
              <h5>{m.name}</h5>
          </div>
        </div>
      </div>
    ))}
  </>
);

const App = () => {
  const [id, setId]: any = useState({'pk': '', 'name': ''});
  const [nameInput, setNameInput] = useState("");
  const [messageInput, setMessageInput] = useState('');
  const [updated, setUpdated] = useState(false);
  const dispatch = useDispatch();

  const messages: any = store.getState().messages;
  const online: any = store.getState().users;

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
      const today = new Date(Date.now());
      dispatch(setMessages({'pk': uuidv4(), 'id': id.pk, 'name': nameInput, 'message': messageInput, 'time' : today.toDateString()}));
      setMessageInput('');
      e.target.reset();
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
    <>
    <div className="container">
      <div className='messaging'>
          <div className='inbox_msg'>
            <div className="inbox_people">
              <div className='inbox_chat'>
                <Online data={online} />
              </div>
            </div>
            <div className='mesgs'>
              <div className="msg_history">
                <Messages data={messages} users={online} pk={id.pk} />
              </div>
              <div className="type_msg">
                <form onSubmit={e => handleMessageSend(e)}>
                  <div className="input_msg_write">
                      <input id="m" type="text" className="write_msg" onChange={(e) => {setMessageInput(e.target.value.trim())}} />
                      <button className="msg_send_btn" type="submit"><FontAwesomeIcon icon={faPaperPlane} /></button>
                    </div>
                </form>
                <br/>
              </div>
            </div>
          </div>
      </div>
    </div>
    </>
 
  ) : (
    <>
      <div style={{ textAlign: "center", margin: "30vh auto", width: "70%" }}>
        <Form onSubmit={event => handleNameSubmit(event)}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Name" onChange={e => setNameInput(e.target.value.trim())} required />
            <Form.Text className="text-muted">
              Register Your Name
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default App;
