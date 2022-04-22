import FrontLog from '../components/FrontLog';
import { useState, useEffect } from 'react';
import { RootState } from '../state/store';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function FrontTester() {
  const {  currentContractToken } = useSelector((store: RootState) => store.contract);
  const sendToken = () => {
    axios
      .get(`http://localhost:1234/contract/${currentContractToken}`)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log('Error is: ', error)
      })
  }

  return (
    <div className='bg-gray-900 h-screen'>
      <button style={{color: 'white'}} onClick={sendToken}>CONNECT CONTRACT</button>
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
