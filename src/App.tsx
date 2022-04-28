import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import ContractBuilder from './containers/ContractBuilder';
import FrontTester from './containers/FrontTester';
import DocumentCreator from './containers/DocumentCreator';
import BackTester from './containers/BackTester';
import Login from './components/Login';
import Register from './components/Register';

export default function App() {

  return (
    <div>
      <Router>
        <div className="App bg-gray-900">
          <Routes>
            <Route index element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="navbar" element={<Navbar />} >
              <Route index element={<ContractBuilder />} />
              <Route path="contract" element={<ContractBuilder />} />
              <Route path="front" element={<> <FrontTester /> </>} />
              <Route path="back" element={<> <BackTester /> </>} />
              <Route path="document" element={<> <DocumentCreator /> </>} />
            </Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}
