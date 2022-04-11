import React, { Component } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import CounterContainer from './containers/CounterContainer';
import Nav from './components/Nav';
import Navbar from './components/Navbar';
import ContractBuilder from './containers/ContractBuilder';
import FrontTester from './containers/FrontTester';
import DocumentCreator from './containers/DocumentCreator';
import BackTester from './containers/BackTester';
import Login from './components/Login';
import SignUp from './components/SignUp';



export default function App () {
 
  return (
    <div>
     <Router>
      <div className="App">
        {/* <Routes>
            <Route> path="/" element={<Login />} </Route>
            <Route> path="/signup" element={<SignUp />} </Route>
        </Routes> */}
        {/* <Nav/> */}
        <Navbar/>
        <Routes>
          <Route path="/contract" element={<ContractBuilder/>}/>
          <Route path="/front" element={<> <FrontTester/> </>}/>
          <Route path="/back" element={<> <BackTester/> </>}/>
          <Route path="/document" element={<> <DocumentCreator/> </>}/>
        </Routes>
      </div>
    </Router>
    <SignUp/>
    <Login/>
    <CounterContainer/>
    </div>
  )
};