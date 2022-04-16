import FrontLog from "../components/FrontLog";
import { useEffect } from "react";

// console.log(client)

export default function FrontTester() {
  // const client = new WebSocket('ws://localhost:1234');

  // client.addEventListener('open', function (event) {
  //   client.send('Hello Backend!');
  // });

  // client.addEventListener('message', function (event) {
  //   console.log('Message from ze back', event.data);
  // });

  useEffect(() => {
    const client = new WebSocket('ws://localhost1234')
    client.onopen = () => {
      console.log('Connected to socket');
    }

    client.onmessage = (event) => {
      const message = event.data;
      console.log(message);
    }
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
