import BackEndpoint from "../components/BackEndpoint";
import BackRequestEditor from "../components/BackRequestEditor";
import BackLog from "../components/BackLog";
import { useState } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { checkInput } from "../express/testing_server/controllers/contractOp";

// type KeyAndType = {
//   [key: string]: string;
// };
// type BodyInputs = KeyAndType[];

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
  const getEndpoints = (contract) => {
    const endpoints = [];
    let id = 1;
    for (let key in contract) {
      if (key.slice(0,3) === 'Req') {
        const endpoint = key.split('@')[2];
        endpoints.push({ id, name: endpoint });
        id++
      }
    }
    return endpoints
    // return reqKeys;
    // console.log(getReqKeys(currentContract));
  };
  const reqEndpoints = getEndpoints(currentContract);
  ///// RECORD CHANGES TO REQ TYPE DROPDOWN IN BACKENDPOINT COMPONENT
  const handleSetReqMethod = (e: any): void => {
    const method: string = e.target.value;
    console.log("method changed: ", method);
    setReqMethod(method);
  };

  //// RECORD CHANGES IN ENDPOINT INPUT FIELD IN BACKENDPOINT COMPONENET
  const handleSetURL = (e: any): void => {
    const URLString: string = e.target.value;
    console.log("current URL string: ", e.target.value);
    setURLString(URLString);
  };
  const handleSetEndpoint = (e: any): void => {
    const endpoint: string = e.target.value;
    console.log("current endpoint string: ", e.target.value);
    setEndpoint(endpoint);
  };

  const handleSetReqInputs = (index, e) => {
    let data = [...reqInputs];
    data[index][e.target.name] = e.target.value;
    console.log("Request Box changed: ", data);
    setReqInputs(data);
  };

  const addReqField = () => {
    let additional = { reqKey: "", reqValType: "boolean", reqVal: "true" };
    console.log("new Request field added");
    setReqInputs([...reqInputs, additional]);
  };

  const resetReqFields = () => {
    setReqInputs([{ reqKey: "", reqValType: "boolean", reqVal: "true" }]);
  };

  return (
    <div className="bg-gray-900 h-screen">
      <BackEndpoint
        reqMethod={reqMethod}
        setReqMethod={handleSetReqMethod}
        URLString={URLString}
        setURLString={handleSetURL}
        reqInputs={reqInputs}
        resetFields={resetReqFields}
        endpoints={reqEndpoints}
        currentContract={currentContract}
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
