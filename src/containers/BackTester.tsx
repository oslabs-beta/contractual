import BackEndpoint from '../components/BackEndpoint';
import BackLog from '../components/BackLog';

export default function BackTester() {

  return (
    <div className='bg-gray-900 h-screen'>
      <BackEndpoint/>
      <BackLog/>
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