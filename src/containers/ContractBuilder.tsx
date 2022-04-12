import { useState } from 'react'
import Navbar from '../components/Navbar';
import ContractEndpoint from '../components/ContractEndpoint';
import ContractEditor from '../components/ContractEditor';



export default function ContractBuilder() {

  const [reqMethod, setReqMethod] = useState('GET')

  // const [reqBody, setReqBody] = useState({})
  return (
    <div className='bg-gray-900'>
      <ContractEndpoint reqMethod={reqMethod} setReqMethod={setReqMethod}/>
      <ContractEditor reqMethod={reqMethod}/>
     {/* <div className="request-specification-container">
       <div className="request-method">Request type</div>
       <div>endpoint</div>
       <div>save as</div>
     </div>
     <div className="contract-container">
       <div className="request-box">request box</div>
       <div className="response-box">response box</div>
     </div> */}
    </div>
  );
}