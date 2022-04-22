import BackEndpoint from '../components/BackEndpoint';
import BackRequestEditor from '../components/BackRequestEditor';
import BackLog from '../components/BackLog';
import { useState } from 'react'

// type KeyAndType = {
//   [key: string]: string;
// };
// type BodyInputs = KeyAndType[];

type KeyTypeValue = {
  reqKey: string;
  reqValType: string;
  reqVal: string | number | boolean | any[]
};
type BodyInputs = KeyTypeValue[]

export default function BackTester() {
  const [reqMethod, setReqMethod] = useState('GET');
  const [endpoint, setEndpoint] = useState('');
  const [reqInputs, setReqInputs] = useState<BodyInputs>([{ reqKey: '', reqValType: 'boolean', reqVal: 'true' }])

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

  const addReqField = () => {
    let additional = { reqKey: '', reqValType: 'boolean', reqVal: 'true' };
    console.log('new Request field added');
    setReqInputs([...reqInputs, additional]);
  };

  const resetReqFields = () => {
    setReqInputs([{ reqKey: '', reqValType: 'boolean', reqVal: 'true' }])
  }

  return (
    <div className='bg-gray-900 h-screen'>
      <BackEndpoint
        reqMethod={reqMethod}
        setReqMethod={handleSetReqMethod}
        endpoint={endpoint}
        setEndpoint={handleSetEndpoint}
        reqInputs={reqInputs}
        resetFields={resetReqFields}
      />
      <BackRequestEditor
        reqInputs={reqInputs}
        setReqInputs={handleSetReqInputs}
        addReqField={addReqField}
      />
      <BackLog />
    </div>
    // <div className="back-tester-container">
    //   <div className="request-container">
    //     <div className="endpoint-container">
    //       <input type="text" className="endpoint" placeholder="Project name"/>
    //       <button className="send-request-button">Send Request</button>
    //     </div>
    //     <div>
    //       <button className="method-dropdown">Method-dropdown</button>
    //     </div>
    //   </div>
    //   <div className="api-dropdown"></div>
    // </div>
  );
}
