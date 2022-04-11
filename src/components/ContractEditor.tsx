import React from 'react';

export default function ContractEditor() {
  return (
    <div>
      <div className='wrapper-editor'>
        <div className='wrapper-reqres' id='req-editor'>
          <div className='title-editor'>
            Request
          </div>
        </div>
        <div className='wrapper-reqres' id='res-editor'>
          <div className='title-editor'>
            Response
          </div>
        </div>
      </div>
    </div>
  )
}