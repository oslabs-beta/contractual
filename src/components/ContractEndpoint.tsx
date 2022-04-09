import React from 'react';

export default function ContractEndpoint() {
  return (
    <div>
      <div className='wrapper-endpoint'>
        <form className='form-endpoint'>
            <div className='wrapper-selector'>
                <select id='reqType' name='reqType' className='request-type-selector'>
                    <option value='get'>GET</option>
                    <option value='post'>POST</option>
                    <option value='patch'>PATCH</option>
                    <option value='delete'>DELETE</option>
                </select>
            </div>
            <div className='wrapper-input'>
                <input type='text' id='endpoint-text' name='endpoint'></input>
            </div>
            <div className='wrapper-save'>
                <button className='btn-save'>Save</button>
            </div>
        </form>
      </div>
    </div>
  )
}