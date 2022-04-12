import { useState } from 'react'
import Navbar from '../components/Navbar';
import ContractEndpoint from '../components/ContractEndpoint';
import ContractEditor from '../components/ContractEditor';



export default function ContractBuilder() {

  const [reqMethod, setReqMethod] = useState('GET')
  const [endpoint, setEndpoint] = useState('')

  const handleSetReqMethod = (e: any): void => {
    const method:string = e.target.value
    console.log("method changed: ", method)
    setReqMethod(method);
  }

  const handleSetEndpoint = (e: any): void => {
    const endpoint: string = e.target.value;
    console.log("current endpoint string: ", e.target.value);
    setEndpoint(endpoint)
  }

  
  return (
    <div className='bg-gray-900'>
      <ContractEndpoint reqMethod={reqMethod} setReqMethod={handleSetReqMethod} endpoint={endpoint} setEndpoint={handleSetEndpoint}/>
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