import React, { useState } from 'react';

/////TESTING DYNAMIC INPUTS
type KeyAndType = {
  [key: string]: string;
};
type BodyInputs = KeyAndType[];
/// TEST END///////

interface ContractEndpointProps {
  reqInputs: BodyInputs;
  resInputs: BodyInputs;
  setReqInputs: (index: string, e: Event) => void;
  setResInputs: (index: string, e: Event) => void;
  addReqField: () => void;
  addResField: () => void;
  subtractReqField: () => void;
  subtractResField: () => void;
}

export default function ContractEditor({
  reqInputs,
  resInputs,
  setReqInputs,
  setResInputs,
  addReqField,
  addResField,
  subtractReqField,
  subtractResField
}) {
  return (
    <form className='divide-gray-200 px-3 grid grid-cols-12 gap-3'>
      <div className='space-y-2 col-span-6'>
        <div className='mt-1'>
          <div>
            <h3 className='text-lg leading-6 font-medium text-gray-300'>
              Request
            </h3>
            <p className='mt-1 text-md text-gray-500'>from frontend</p>
          </div>
        </div>
        <hr></hr>
        <div className='sm:col-span-6'>
          <div className='mt-1'>
            <select
              id='reqLocation'
              name='reqLocation'
              className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
            >
              <option value='body'>Body</option>
              <option value='query'>Query</option>
              <option value='params'>Params</option>
            </select>
          </div>
        </div>

        {/* ////////// Render this portion dynamically */}
        {reqInputs.map((input, index) => {
          return (
            <div key={index}>
              <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-2 sm:grid-cols-6'>
                {/* <div className="sm:col-span-6">
                  <div className="mt-1">
                    <select
                      id="reqLocation"
                      name="reqLocation"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="body">Body</option>
                      <option value="query">Query</option>
                      <option value="params">Params</option>
                    </select>
                  </div>
                </div> */}

                <div className='sm:col-span-3'>
                  <label
                    htmlFor='reqKey'
                    className='block text-sm font-medium text-gray-300'
                  >
                    Key
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      name='reqKey'
                      id='reqKey'
                      value={input.reqKey}
                      // test
                      onChange={(e) => setReqInputs(index, e)}
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                </div>

                <div className='sm:col-span-3'>
                  <label
                    htmlFor='reqValType'
                    className='block text-sm font-medium text-gray-300'
                  >
                    Value Type
                  </label>
                  <div className='mt-1'>
                    <select
                      id='reqValType'
                      name='reqValType'
                      value={input.reqValType}
                      onChange={(e) => setReqInputs(index, e)}
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                    >
                      <option value='boolean'>Boolean</option>
                      <option value='number'>Number</option>
                      <option value='string'>String</option>
                      <option value='object'>Object</option>
                      <option value='array-any-any'>Array</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <button
          type='button'
          onClick={addReqField}
          className='inline-flex w-full items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 mx-auto'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 6v6m0 0v6m0-6h6m-6 0H6'
            />
          </svg>
        </button>
        {Array.isArray(reqInputs)&&reqInputs.length > 1 ?  <button
        onClick={subtractReqField}
        className='inline-flex w-full items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        > - </button> : <button>xxxxxx</button>}
      </div>

      <div className='space-y-2 col-span-6'>
        <div className='mt-1'>
          <div>
            <h3 className='text-lg leading-6 font-medium text-gray-300'>
              Response
            </h3>
            <p className='mt-1 text-md text-gray-500'>from backend</p>
          </div>
        </div>
        <hr></hr>
        <div className='sm:col-span-6'>
          <div className='mt-1'>
            <select
              id='resType'
              name='resType'
              className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
            >
              <option value='object'>Object</option>
              <option value='array'>Array</option>
              <option value='boolean'>Boolean</option>
              <option value='number'>Number</option>
              <option value='string'>String</option>
            </select>
          </div>
        </div>

        {/* dynamic portion test */}
        {resInputs.map((input, index) => {
          return (
            <div key={index}>
              <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-2 sm:grid-cols-6'>
                {/* <div className="sm:col-span-6">
                <div className="mt-1">
                  <select
                    id="resType"
                    name="resType"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="object">Object</option>
                    <option value="array">Array</option>
                    <option value="boolean">Boolean</option>
                    <option value="number">Number</option>
                    <option value="string">String</option>
                  </select>
                </div>
              </div> */}

                <div className='sm:col-span-3'>
                  <label
                    htmlFor='resKey'
                    className='block text-sm font-medium text-gray-300'
                  >
                    Key
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      name='resKey'
                      id='resKey'
                      value={input.resKey}
                      onChange={(e) => setResInputs(index, e)}
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                </div>

                <div className='sm:col-span-3'>
                  <label
                    htmlFor='reqValType'
                    className='block text-sm font-medium text-gray-300'
                  >
                    Value Type
                  </label>
                  <div className='mt-1'>
                    <select
                      id='resValType'
                      name='resValType'
                      value={input.resValType}
                      onChange={(e) => setResInputs(index, e)}
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                    >
                      <option value='boolean'>Boolean</option>
                      <option value='number'>Number</option>
                      <option value='string'>String</option>
                      <option value='array-any-any'>Array</option>
                      <option value='object'>Object</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <button
          type='button'
          onClick={addResField}
          className='inline-flex w-full items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 mx-auto'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 6v6m0 0v6m0-6h6m-6 0H6'
            />
          </svg>
        </button>
        {resInputs.length > 1 ?  <button
        onClick={subtractResField}
        className='inline-flex w-full items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        > - </button> : null} 
        
      </div>
    </form>
  );
}
