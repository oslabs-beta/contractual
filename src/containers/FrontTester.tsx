import FrontLog from "../components/FrontLog";
import { useEffect } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket("ws://127.0.0.1:1234");

export default function FrontTester() {
  useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      console.log(message);
    };
  }, []);
  return (
    <div className="bg-gray-900 h-screen">
      <FrontLog />
    </div>
    // <div className="front-tester-container">
    //   <div className="api-dropdown"></div>
    //  <div className="request-log-container">
    //    <h2 className="request-log-title">Request Log:</h2>
    //  </div>
    //  <div className="custom-response-container">
    //     <h2 className="custom-response-title">Edit Response for:</h2>
    //    <div className="custom-response-method">POST /endpoint</div>
    //    <div className="custom-response-headers">Headers</div>
    //    <div className="custom-response-data-strucure">Data-Structure</div>
    //    <div className="custom-response-datatype-container">
    //      <ul className="datatype-list"></ul>
    //    </div>
    //  </div>
    // </div>
  );
}
