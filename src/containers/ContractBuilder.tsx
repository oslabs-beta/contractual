import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../state/actions/actions';

// MAP WHAT STATE PROPERTIES WE WANT TO PASS DOWN PASS DOWN
const mapStateToProps = () => ({

});

const mapDispatchToProps = () => ({

});

// WORKS AFTER SWITCHING TO CLASS COMPONENT
class ContractBuilder extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
       <div className="request-specification-container">
         <div className="request-method">Request type</div>
         <div>endpoint</div>
         <div>save as</div>
       </div>
       <div className="contract-container">
         <div className="request-box">request box</div>
         <div className="response-box">response box</div>
       </div>
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ContractBuilder);
