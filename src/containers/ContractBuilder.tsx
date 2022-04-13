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


  ///// RECORD CHANGES TO REQ TYPE DROPDOWN IN CONTRACTENDPOINT COMPONENT
  const handleSetReqMethod = (e: any): void => {
    const method:string = e.target.value
    console.log("method changed: ", method)
    setReqMethod(method);
  };


  //// RECORD CHANGES IN ENDPOINT INPUT FIELD IN CONTRACTENDPOINT COMPONENET
  const handleSetEndpoint = (e: any): void => {
    const endpoint: string = e.target.value;
    console.log("current endpoint string: ", e.target.value);
    setEndpoint(endpoint)
  };

  //// NEED TO MODIFY THESE WHEN MAKING REQ/RES KEY VALUE PAIRS DYNAMIC
  const [reqKey, setReqKey] = useState('')
  const [resKey, setResKey] = useState('')
  const [reqValueType, setReqValueType] = useState('Boolean')
  const [resValueType, setResValueType] = useState('Boolean')
  

  //////// RECORDS ALL INPUT FIELD CHANGES FOR REQ BODY AND RES BODY CHANGES
  const handleBodyInput = (e: any): void => {
    if (e.target.id === 'reqKey') {
      const requestKey: string = e.target.value;
      console.log("requestKey changed: ", requestKey);
      setReqKey(requestKey);
    }
    if (e.target.id === 'reqValType') {
      const requestValueType: string = e.target.value;
      console.log("requestValueType changed: ", requestValueType);
      setReqValueType(requestValueType);
    }
    if (e.target.id === 'resKey') {
      const responseKey: string = e.target.value;
      console.log("responseKey changed: ", responseKey);
      setResKey(responseKey);
    }
    if (e.target.id === 'resValType') {
      const responseValueType: string = e.target.value;
      console.log("responseValueType changed: ", responseValueType);
      setResValueType(responseValueType);
    }
  };

  ///// FUNCTIONS NOT CURRENTLY USED. LIKELY WILL USE WHEN WE MAKE KEY/VALUE FIELDS DYNAMIC
  const handleSetReqBody = (obj) => {
    setReqBody(obj)
  }
  const handleSetResBody = (obj) => {
    setResBody(obj)
  }
  ///////////////////////////////
  
  return (
    <div className='bg-gray-900 h-screen'>
      <ContractEndpoint 
        reqMethod={reqMethod} 
        setReqMethod={handleSetReqMethod} 
        endpoint={endpoint} 
        setEndpoint={handleSetEndpoint}
        reqKey={reqKey}
        resKey={resKey}
        reqValueType={reqValueType}
        resValueType={resValueType}
        setReqBody={handleSetReqBody}
        setResBody={handleSetResBody}
      />
      <ContractEditor  
        handleBodyInput={handleBodyInput}
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