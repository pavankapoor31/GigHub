import React from 'react'
import'./lastchats.css'
import ChatCard from './ChatCard'

export default function LastChats() {
  return (
    <div className='d-flex flex-column fit-content border h-100'>
      {/* <ChatCard />
      <ChatCard />
      <ChatCard /> */}
        <List>
          {/* {messages.map(message => (
            <ListItem key={message.id}>
              <ListItemAvatar>
                <Avatar alt={message.user.name} src={message.user.profilePic} className={classes.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={<Typography variant="subtitle1" component="div">{message.user.name}</Typography>}
                secondary={message.text}
              />
            </ListItem>
          ))} */}
        </List>
    </div>
  )
}
