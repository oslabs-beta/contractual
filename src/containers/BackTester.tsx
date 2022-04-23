import BackEndpoint from "../components/BackEndpoint";
import BackRequestEditor from "../components/BackRequestEditor";
import BackLog from "../components/BackLog";
import { useState } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { checkInput } from "../express/testing_server/controllers/contractOp";

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
type KeyTypeValue = {
  reqKey: string;
  reqValType: string;
  reqVal: string | number | boolean | any[];
};
type BodyInputs = KeyTypeValue[];

export default function BackTester() {
  const [reqMethod, setReqMethod] = useState("GET");
  const [endpoint, setEndpoint] = useState("");
  const [URLString, setURLString] = useState("");
  const [reqInputs, setReqInputs] = useState<BodyInputs>([
    { reqKey: "", reqValType: "boolean", reqVal: "true" },
  ]);
  const { currentContract } = useSelector((state: RootState) => state.contract);
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
    // return reqKeys;
    // console.log(getReqKeys(currentContract));
  };
  const reqEndpoints: EnumEndpointItem[] = getEndpoints(currentContract);
  ///// RECORD CHANGES TO REQ TYPE DROPDOWN IN BACKENDPOINT COMPONENT
  const handleSetReqMethod = (e: string): void => {
    // const method: string = e.target.value;
    // console.log("method changed: ", method);
    setReqMethod(e);
  };

  //// RECORD CHANGES IN ENDPOINT INPUT FIELD IN BACKENDPOINT COMPONENET
  const handleSetURL = (e: any): void => {
    const URLString: string = e.target.value;
    console.log("current URL string: ", e.target.value);
    setURLString(URLString);
  };

  // REQUIRES MODIFICATION
  const handleSetReqInputs = (index, e) => {
    let data = [...reqInputs];
    data[index][e.target.name] = e.target.value;
    console.log("Request Box changed: ", data);
    setReqInputs(data);
  };

  // NEW FUNCTION TEST: WORKING
  // [ { reqKey: "", reqValType: "boolean", reqVal: "true" },]
  const updateReqFields = (reqEndpointKey: string):void => {
    const endpointKeys: Contracts = currentContract[reqEndpointKey]
    let keys = [];
    for (let key in endpointKeys) {
      const k = {reqKey: key, reqValType: endpointKeys[key], reqVal: ''};
      if (k.reqValType === 'boolean') k.reqVal = 'true';
      keys.push(k)
    }
    console.log('ENDPOINT KEYS ARE: ', keys)
    setReqInputs(keys);
  };


  return (
    <div className="bg-gray-900 h-screen">
      <BackEndpoint
        reqMethod={reqMethod}
        setReqMethod={handleSetReqMethod}
        URLString={URLString}
        setURLString={handleSetURL}
        reqInputs={reqInputs}
        setReqInputs={handleSetReqInputs}
        updateReqFields={updateReqFields}
        // resetFields={resetReqFields}
        endpoints={reqEndpoints}
        currentContract={currentContract}
      />
      <BackRequestEditor
        reqInputs={reqInputs}
        setReqInputs={handleSetReqInputs}
        reqMethod={reqMethod}
        // addReqField={addReqField}
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
