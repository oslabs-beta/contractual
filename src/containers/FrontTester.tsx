import FrontLog from '../components/FrontLog';
import { useState, useEffect } from 'react';

<<<<<<< HEAD
const socket = new WebSocket('ws://localhost:1234');

export default function FrontTester() {
  const [message, updateMessage] = useState([]);
  socket.addEventListener('open', (event) => {
    console.log('CONNECTED TO WEB SOCKET FROM CLIENT Side');
  });

  socket.addEventListener('message', (event) => {
    // logic to display received data here
    // likely use state components
    console.log('MESSAGE RECEIVED FROM 1234: ', event.data);
    updateMessage([...message, event.data]);
  });

  const sendMessage = () => {
    socket.send('1. CLIENT 1 JUST SEND THIS MESSAGE TO SERVER!!!!');
  };
  useEffect(() => {}, []);

  return (
    <div className='bg-gray-900 h-screen'>
      <FrontLog />
      <button onClick={sendMessage} style={{ color: 'white' }}>
        SEND MESSAGE
      </button>
      <div style={{ color: 'white' }}>{message}</div>
=======



export default function FrontTester() {
  
  return (
    <div className='bg-gray-900 h-screen'>
      <FrontLog />
      {/* <button onClick={sendMessage} style={{ color: 'white' }}>
                SEND MESSAGE
      </button>
      {message.map((element, index) => {
        return (
        <div style={{color: 'white'}}>{element}</div>
        )})} */}
>>>>>>> 93625a40a5914727e2f812188552873103b1216a
    </div>
    // <div className="front-tester-container">
    //   <div className="api-dropdown"></div>
    //  <div className="request-log-container">
    //    <h2 className="request-log-title">Request Log:</h2>
    //  </div>
    //  <div className="custom-response-container">
    //     <h2 className="custom-response-title">Edit Response for:</h2>
    //    <div className="custom-response-method">POST /endpoint</div>
    //    <div className="custom-response-headers">Headers</div>
    //    <div className="custom-response-data-strucure">Data-Structure</div>
    //    <div className="custom-response-datatype-container">
    //      <ul className="datatype-list"></ul>
    //    </div>
    //  </div>
    // </div>
  );
}
