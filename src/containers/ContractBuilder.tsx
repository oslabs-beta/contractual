import { useState } from 'react';
import ContractEndpoint from '../components/ContractEndpoint';
import ContractEditor from '../components/ContractEditor';

/////TESTING DYNAMIC INPUTS
type KeyAndType = {
  [key: string]: string;
};
type BodyInputs = KeyAndType[];
/// TEST END///////

export default function ContractBuilder() {
  const [reqMethod, setReqMethod] = useState('GET');
  const [endpoint, setEndpoint] = useState('');
  const [reqInputs, setReqInputs] = useState<BodyInputs>([{ reqKey: '', reqValType: 'Boolean' }])
  const [resInputs, setResInputs] = useState<BodyInputs>([{ resKey: '', resValType: 'Boolean' }])

  ///// RECORD CHANGES TO REQ TYPE DROPDOWN IN CONTRACTENDPOINT COMPONENT
  const handleSetReqMethod = (e: any): void => {
    const method: string = e.target.value;
    console.log('method changed: ', method);
    setReqMethod(method);
  };

  //// RECORD CHANGES IN ENDPOINT INPUT FIELD IN CONTRACTENDPOINT COMPONENET
  const handleSetEndpoint = (e: any): void => {
    const endpoint: string = e.target.value;
    console.log('current endpoint string: ', e.target.value);
    setEndpoint(endpoint);
  };


  const handleSetReqInputs = (index, e) => {
    let data = [...reqInputs];
    data[index][e.target.name] = e.target.value;
    console.log('Request Box changed: ', data);
    setReqInputs(data);
  };
  const handleSetResInputs = (index, e) => {
    let data = [...resInputs];
    data[index][e.target.name] = e.target.value;
    console.log('Response Box changed: ', data);
    setResInputs(data);
  };

  const addReqField = () => {
    let additional = { reqKey: '', reqValType: 'boolean' };
    console.log('new Request field added');
    setReqInputs([...reqInputs, additional]);
  };
  const addResField = () => {
    let additional = { resKey: '', resValType: 'boolean' };
    console.log('new Response field added');
    setResInputs([...resInputs, additional]);
  };

  const resetFields = () => {
    setReqInputs([{ reqKey: '', reqValType: 'boolean' }])
    setResInputs([{ resKey: '', resValType: 'boolean' }])
  }

  return (
    <div className='bg-gray-900 h-screen'>
      <ContractEndpoint
        reqMethod={reqMethod}
        setReqMethod={handleSetReqMethod}
        endpoint={endpoint}
        setEndpoint={handleSetEndpoint}
        reqInputs={reqInputs}
        resInputs={resInputs}
        resetFields={resetFields}
      />
      <ContractEditor
        reqInputs={reqInputs}
        resInputs={resInputs}
        setReqInputs={handleSetReqInputs}
        setResInputs={handleSetResInputs}
        addReqField={addReqField}
        addResField={addResField}
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
