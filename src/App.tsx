import React, { Component } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import CounterContainer from './containers/CounterContainer';
import Nav from './components/Nav';
import ContractBuilder from './containers/ContractBuilder';
import FrontTester from './containers/FrontTester';
import DocumentCreator from './containers/DocumentCreator';
import BackTester from './containers/BackTester';


// export default class App extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <div>
//        <Router>
//         <div className="App">
//           <Nav/>
//           <Routes>
//             <Route path="/contractbuilder" element={<> <ContractBuilder/> </>}/>
//             <Route path="/fronttester" element={<> <ContractBuilder/> </>}/>
//             <Route path="/backtester" element={<> <ContractBuilder/> </>}/>
//             <Route path="/documentcreator" element={<> <ContractBuilder/> </>}/>
//           </Routes>
//         </div>
//       </Router>
//        <CounterContainer />
//       </div>
//     )
//   }
// };

export default function App () {
 
  return (
    <div>
     <Router>
      <div className="App">
        <Nav/>
        <Routes>
          <Route path="/contractbuilder" element={<> <ContractBuilder/> </>}/>
          <Route path="/fronttester" element={<> <FrontTester/> </>}/>
          <Route path="/backtester" element={<> <BackTester/> </>}/>
          <Route path="/documentcreator" element={<> <DocumentCreator/> </>}/>
        </Routes>
      </div>
    </Router>
     <CounterContainer />
    </div>
  )
};