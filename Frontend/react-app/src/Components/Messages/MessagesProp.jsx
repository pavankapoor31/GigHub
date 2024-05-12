import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './Messages.css'; // Import the CSS file for styling
import { TextField, Button } from '@mui/material';
import { setIsSeller,setRole } from '../../redux/actions/gighub.actions';
import { useSelector,useDispatch } from 'react-redux'
import { BASE_URL } from '../../global_config';
import axios from 'axios';
function MessagesProp({messagerId}) {
  const [profileId, setProfileId] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [clientId, setClientId] = useState('');
  const [freelancerId, setFreelancerId] = useState('');
  const isSeller = useSelector((state)=>state.gighubReducer.isSeller)
  const role = useSelector((state)=>state.gighubReducer.role)
  // const freelancerId = useSelector((state)=>state.gighubReducer.freelancerId)
  console.log(isSeller,'isSeller')
  console.log(freelancerId,"isSeller1234")
  useEffect(() => {
    if(role==='buyer'){
      let storedProfileId = localStorage.getItem('client_data');
      if (!storedProfileId) return;
      console.log(storedProfileId,'storedProfileId')
      storedProfileId = JSON.parse(storedProfileId);
      storedProfileId = storedProfileId.id;
      setProfileId(storedProfileId);
      setClientId(storedProfileId);
      setFreelancerId(messagerId);
    }
    else{
      let storedProfileId = localStorage.getItem('freelancer_data');
      if(!storedProfileId) return;
      console.log(storedProfileId,'storedProfileId2')
      storedProfileId = JSON.parse(storedProfileId)
      storedProfileId = storedProfileId.id
      setProfileId(storedProfileId);
      setClientId(messagerId);
      setFreelancerId(storedProfileId);
    }
    console.log(clientId, freelancerId, profileId,'messagesdeets')
  }, []);

  const freelancerIdRef = useRef();
  const clientIdRef = useRef();
  useEffect(
    ()=>{
      freelancerIdRef.current = freelancerId;
      clientIdRef.current = clientId
    },[clientId,freelancerId]
  )
  const fetchMessages = async () => {
    try {
        if (clientId && freelancerId) {
          axios.get(`${BASE_URL}/api/messages?filter={"where":{"client_id":"${clientId}","freelancer_id":"${freelancerId}"},"order":"timestamp ASC"}`).then(
            (res)=>{
              console.log(res.data,'res.data')
              setMessages(res.data);
            }
          )
          // setMessages((prev) => [...prev, data]);
        } else {
          console.error('profileId or messagerId is null');
        }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };
  

  useEffect(() => {
    if (!profileId || !clientId ||   !freelancerId ) return;
    fetchMessages();
    const intervalId = setInterval(fetchMessages, 6000);
    return () => clearInterval(intervalId);
  }, [clientId,freelancerId]);

  useEffect(() => {
    if (profileId !== null && clientId !== null && freelancerId!== null) {
      fetch(`${BASE_URL}/api/messages?filter={"where":{"client_id":"${clientId}","freelancer_id":"${freelancerId}"},"order":"timestamp ASC"}`)
        .then(response => response.json())
        .then(data => setMessages(data))
        .catch(error => console.error('Error fetching messages:', error));
    }
    console.log(messages)
  }, [profileId, clientId, freelancerId]);
  const sendMessage = async () => {
    try {
      if (profileId && clientId && freelancerId.trim() !== '') {
        const response = await fetch(`${BASE_URL}/api/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            client_id: clientId,
            freelancer_id: freelancerId,
            message: newMessage,
            timestamp: new Date().toISOString(),
            sentBy: profileId
          })
        });
        if (response.ok) {
          setNewMessage('');
          // setMessages((prev) => [...prev, data]);
          fetchMessages();
        } else {
          console.error('Failed to send message');
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  return (
    <div className="chat-container position-absolute bottom-0 overflow-hidden">
      <div className='d-flex flex-column h-100 w-100 overflow-auto'>
        {messages.map(message => (
          <div className={`d-flex align-items-center border ${message.sentBy === profileId ? 'sent' : 'received'}`} key={message.id}>
            <p>{message.message}</p>
          </div>
        ))}
      </div>
      
      <div className="message-input d-flex border w-100">
      <TextField
          label="New Message"
          variant="outlined"
          fullWidth
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button variant="contained" onClick={sendMessage}>Send</Button>
      </div>
    </div>
    
  );
}

export default MessagesProp;
