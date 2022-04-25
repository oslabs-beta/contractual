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

  /** CREATE ENDPOINTS OBJECT ARRAY FOR ENUM IN BACKENDPOINT COMPONENT */
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

  /** RECORD CHANGES TO REQ TYPE DROPDOWN IN BACKENDPOINT COMPONENT 
   *  NOTE: DROPDOWN CURRENTLY CHANGED TO DISPLAY ONLY FOR TESTING.
   *        DEVELOPER DECISION TO REMOVE
  */
  const handleSetReqMethod = (e: string): void => {
    // const method: string = e.target.value;
    // console.log("method changed: ", method);
    setReqMethod(e);
  };

  /**  RECORD STATE CHANGES IN DOMAIN INPUT FIELD IN BACKENDPOINT COMPONENT */
  const handleSetURL = (e: any): void => {
    const URLString: string = e.target.value;
    console.log("current URL string: ", e.target.value);
    setURLString(URLString);
  };

  /** RECORD INPUTS OF KEY/TYPE/VALUE TRIOS IN THE REQUEST BODY SECTION IN COMPONENT LEVEL STATE */
  const handleSetReqInputs = (index, e) => {
    let data = [...reqInputs];
    data[index][e.target.name] = e.target.value;
    console.log("Request Box changed: ", data);


    /// TESTING

    console.log('Target is : ', e.target.name)
    console.log('Value is : ', e.target.value)
    if (data[index][e.target.name] === 'boolean') {
      data[index].reqVal = true
    }
    else if (data[index][e.target.name] === 'string') {
      data[index].reqVal = ''
    }
    else if (data[index][e.target.name] === 'number') {
      data[index].reqVal = ''
    }
    else if (data[index][e.target.name] === 'array-any-any') {
      data[index].reqVal = ''
    }

    /// END OF TEST
    setReqInputs(data);
  };
  
  /** CHANGE THE DEFAULT VALUE OF VALUE FIELD WHEN MODIFYING THE DATATYPE DROPDOWN */
  const updateDefaultValue = (index, e) => {
    let data = [...reqInputs]
  }
  /**  UPDATE CURRENT INPUT FIELDS STATE VARIABLES BASED ON COMBOBOX DROPDOWN ENUM SELECTION */
  const updateReqFields = (reqEndpointKey: string):void => {
    const endpointKeys: Contracts = currentContract[reqEndpointKey]
    let keys = [];
    for (let key in endpointKeys) {
      const k = {reqKey: key, reqValType: endpointKeys[key], reqVal: ''};
      if (k.reqValType === 'boolean') k.reqVal = 'true';
      else if (k.reqValType === 'array-any-any') k.reqVal = '[]'
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
  );
}
