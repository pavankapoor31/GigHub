import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Messages.css'; // Import the CSS file for styling
import { TextField, Button } from '@mui/material';
import { setIsSeller,setRole } from '../../redux/actions/gighub.actions';
import { useSelector,useDispatch } from 'react-redux'
function Messages() {
  const { messagerId } = useParams();
  const [profileId, setProfileId] = useState('');
  const [profileUserName, setProfileUserName] = useState('');
  const [isClient, setIsClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messegerUserName, setMessagerUserName] = useState('');
  const [userTypeIsSet, setUserTypeIsSet] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const isSeller = useSelector((state)=>state.gighubReducer.isSeller)
  const freelancerId = useSelector((state)=>state.gighubReducer.freelancerId)
  console.log(isSeller,'isSeller')
  console.log(freelancerId,"isSeller1234")
  useEffect(() => {
    if(isSeller){
      setProfileId(freelancerId)
    }
    else{
      let storedProfileId = localStorage.getItem('profile.id');
      setProfileId(JSON.parse(storedProfileId));
    }
  }, []);

  const fetchMessages = async () => {
    try {
      if (isSeller !== null && profileId !== null && messagerId!== null) {
        const clientId = isSeller ? profileId : messagerId;
        const freelancerId = isSeller ? messagerId : profileId;
        const response = await fetch(`http://172.208.57.14:3001/api/messages?filter={"where":{"client_id":"${clientId}","freelancer_id":"${freelancerId}"},"order":"timestamp ASC"}`);
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
    const intervalId = setInterval(fetchMessages, 10000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (profileId) {
      fetch(`http://172.208.57.14:3001/api/freelancers?filter={"where":{"id":"${profileId}"}}`)
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            setIsClient(false);
            setUserTypeIsSet(true);
          } else {
            fetch(`http://172.208.57.14:3001/api/clients?filter={"where":{"id":"${profileId}"}}`)
              .then(response => response.json())
              .then(data => {
                if (data.length > 0) {
                  setIsClient(true);
                  setUserTypeIsSet(true);
                }
              })
              .catch(error => console.error('Error fetching client:', error));
          }
        })
        .catch(error => console.error('Error fetching freelancer:', error));
    }
  }, [profileId]);

  useEffect(() => {
    if (isSeller !== null && profileId !== null && messagerId!== null) {
      const clientId = isSeller ? profileId : messagerId;
      const freelancerId = isSeller ? messagerId : profileId;

      fetch(`http://172.208.57.14:3001/api/messages?filter={"where":{"client_id":"${clientId}","freelancer_id":"${freelancerId}"}}`)
        .then(response => response.json())
        .then(data => setMessages(data))
        .catch(error => console.error('Error fetching messages:', error));
    }
  }, [isSeller, profileId, messagerId]);
  const sendMessage = async () => {
    try {
      if (profileId && messagerId && newMessage.trim() !== '') {
        const response = await fetch('http://172.208.57.14:3001/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            client_id: isSeller ? profileId : messagerId,
            freelancer_id: isSeller ? messagerId : profileId,
            message: newMessage,
            timestamp: new Date().toISOString(),
            sentBy: profileId
          })
        });
        if (response.ok) {
          setNewMessage('');
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
    <div className="chat-container">
      {messages.map(message => (
        <div key={message.id} className={message.sentBy === profileId ? 'sent' : 'received'}>
          <p>{message.message}</p>
        </div>
      ))}
      <div className="message-input">
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

export default Messages;
