import FrontLog from '../components/FrontLog';
import { useState, useEffect } from 'react';

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
