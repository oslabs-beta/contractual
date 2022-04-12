import React, { useState } from 'react';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { string } from 'yup';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

interface ContractEndpointProps{
  reqMethod: string,
  setReqMethod: (e: any) => void,
  endpoint: string,
  setEndpoint: (e: any) => void
}



const ContractEndpoint: React.FC<ContractEndpointProps> = ({ reqMethod, setReqMethod, endpoint, setEndpoint }): JSX.Element => {

  // save contract needs to be a reducer function adding to our store object
  // would also pass in req body and res body
  // concat our 'newContract' object to the store state?
  const saveContract = (reqMethod: string, endpoint: string): void => {
    const newContract = {}
    newContract[`Req@${reqMethod}@${endpoint}`] = {email: 'email@gmail.com', password: 'password'}
    newContract[`Res@${reqMethod}@${endpoint}`] = { username: 'MyUsername'}
    console.log(newContract);
  }

  return (
    <div>
      <div className='grid grid-cols-12 gap-1 px-3 py-3 grid-flow-col'>
        <div className="col-span-2 sm:col-span-22 lg:col-span-1">
          <select
            id="reqMethod"
            name="reqMethod"
            onChange={(e) => {setReqMethod(e)}}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="GET" >GET</option>
            <option value="POST" >POST</option>
            <option value="PUT" >PUT</option>
            <option value="PATCH" >PATCH</option>
            <option value="DELETE" >DELETE</option>
          </select>
        </div>
        {/* <button onClick={() => {saveContract(reqMethod, endpoint)}}>check state of request type</button> */}
        <div className="col-span-9 sm:col-span-9 lg:col-span-10">
          <input
            type="endpoint"
            name="endpoint"
            id="endpoint"
            value={endpoint}
            onChange={(e) => {setEndpoint(e)}}
            className="focus:ring-indigo-500 mt-1 focus:border-indigo-500 block w-full shadow-sm sm:text-md border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div className="col-span-1 sm:col-span-1 text-right">
          <button
            className="inline-flex w-full justify-center mt-1 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => {saveContract(reqMethod, endpoint)}}
          >
            Save
          </button>
        </div>
      </div>
      {/* <div className='wrapper-endpoint'>
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
                <input type='text' id='endpoint-text' name='endpoint' placeholder='Enter request URL'></input>
            </div>
            <div className='wrapper-save'>
                <button className='btn-save'>Save</button>
            </div>
        </form>
      </div> */}
    </div>
  )
}

export default ContractEndpoint;