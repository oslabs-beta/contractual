import { useState } from 'react'
import ContractEndpoint from '../components/ContractEndpoint';
import ContractEditor from '../components/ContractEditor';

interface Body {
  [key: string]: string
}

export default function ContractBuilder() {

  const [reqMethod, setReqMethod] = useState('GET');
  const [endpoint, setEndpoint] = useState('');
  const [reqBody, setReqBody] = useState<Body>({});
  const [resBody, setResBody] = useState<Body>({});

  const handleSetReqMethod = (e: any): void => {
    const method:string = e.target.value
    console.log("method changed: ", method)
    setReqMethod(method);
  };

  const handleSetEndpoint = (e: any): void => {
    const endpoint: string = e.target.value;
    console.log("current endpoint string: ", e.target.value);
    setEndpoint(endpoint)
  };

  const handleSetReqBody = (obj) => {
    setReqBody(obj)
  }
  const handleSetResBody = (obj) => {
    setResBody(obj)
  }

  
  return (
    <div className='bg-gray-900 h-screen'>
      <ContractEndpoint 
        reqMethod={reqMethod} 
        setReqMethod={handleSetReqMethod} 
        endpoint={endpoint} 
        setEndpoint={handleSetEndpoint}
      />
      <ContractEditor 
      reqBody={reqBody} 
      setReqBody={handleSetReqBody}
      resBody={reqBody} 
      setResBody={handleSetResBody}
      />
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