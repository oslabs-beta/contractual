import { useState } from 'react';
import ContractEndpoint from '../components/ContractEndpoint';
import ContractEditor from '../components/ContractEditor';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
/////TESTING DYNAMIC INPUTS
interface EnumEndpointItem {
  id: number;
  method: string;
  name: string;
}
type CurrentContract = {
  [key: string]: Contracts
}
type Contracts = {
  [key: string]: string
}

type KeyAndType = {
  [key: string]: string;
};
type BodyInputs = KeyAndType[];
/// TEST END///////

export default function ContractBuilder() {
  const [reqMethod, setReqMethod] = useState('GET');
  const [newEndpoint, setNewEndpoint] = useState('');
  const [reqInputs, setReqInputs] = useState<BodyInputs>([{ reqKey: '', reqValType: 'boolean' }])
  const [resInputs, setResInputs] = useState<BodyInputs>([{ resKey: '', resValType: 'boolean' }])
  const { currentContract } = useSelector((state: RootState) => state.contract);

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
    setNewEndpoint(endpoint);
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
  //BUG: RANDOMLY CAUSES APP REFRESH AFTER TWO ADDITIONS THEN A SUBTRACTION
  async function subtractReqField ()  {
    console.log('pressed')
    // const copy = reqInputs.slice(0, -1)
    // copy.pop()
    const newReqInputs = JSON.parse(JSON.stringify(reqInputs));
    await setReqInputs(newReqInputs.slice(0,-1));
  };

  const addResField = () => {
    let additional = { resKey: '', resValType: 'boolean' };
    console.log('new Response field added');
    setResInputs([...resInputs, additional]);
  };
  const subtractResField = () => {
    const copy = [...resInputs]
    copy.pop()
    setResInputs(copy);
  };

  const resetFields = () => {
    setReqInputs([{ reqKey: '', reqValType: 'boolean' }])
    setResInputs([{ resKey: '', resValType: 'boolean' }])
  }

  const getEndpoints = (contract: CurrentContract ):EnumEndpointItem[] => {
    const endpoints = [];
    let id = 1;
    for (let key in contract) {
      if (key.slice(0,3) === 'Req') {
        const endpoint = key.split('@')[2];
        const method = key.split('@')[1];
        endpoints.push({ id, method, name: endpoint });
        id++;
      }
    }
    return endpoints
  };

  const updateFieldsByEndpoint = (reqEndpointKey: string, resEndpointKey: string):void => {
    const reqEndpointKeys: Contracts = currentContract[reqEndpointKey]
    const resEndpointKeys: Contracts = currentContract[resEndpointKey]
    let reqKeys = [];
    let resKeys = [];
    for (let key in reqEndpointKeys) {
      const k = {reqKey: key, reqValType: reqEndpointKeys[key]};
      reqKeys.push(k)
    }
    for (let key in resEndpointKeys) {
      const k = {resKey: key, resValType: resEndpointKeys[key]};
      resKeys.push(k)
    }
    console.log('REQENDPOINT KEYS ARE: ', reqKeys)
    console.log('RESENDPOINT KEYS ARE: ', resKeys)
    setReqInputs(reqKeys);
    setResInputs(resKeys);
  };
  const reqEndpoints: EnumEndpointItem[] = getEndpoints(currentContract);
  return (
    <div className='bg-gray-900 h-screen'>
      <ContractEndpoint
        reqMethod={reqMethod}
        setReqMethod={setReqMethod}
        handleSetReqMethod={handleSetReqMethod}
        newEndpoint={newEndpoint}
        setNewEndpoint={setNewEndpoint}
        endpoints={reqEndpoints}
        setEndpoint={handleSetEndpoint}
        reqInputs={reqInputs}
        resInputs={resInputs}
        resetFields={resetFields}
        updateFieldsByEndpoint={updateFieldsByEndpoint}
      />
      <ContractEditor
        reqInputs={reqInputs}
        resInputs={resInputs}
        setReqInputs={handleSetReqInputs}
        setResInputs={handleSetResInputs}
        addReqField={addReqField}
        addResField={addResField}
        subtractReqField={subtractReqField}
        subtractResField={subtractResField}
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
