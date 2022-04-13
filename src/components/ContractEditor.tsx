import React from 'react';

const addReqField = (e: any): void => {

}

const addResField = (e: any): void => {

}

export default function ContractEditor({ reqMethod }) {
  return (
    <form className="divide-gray-200 px-3 grid grid-cols-12 gap-3">
      <div className="space-y-2 divide-y divide-gray-200 col-span-6">
        <div className="mt-1">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-300">Request</h3>
            <p className="mt-1 text-md text-gray-500">
              from frontend
            </p>
          </div>
        </div>

        <div>
          <div id="req-form" className="mt-6 grid grid-cols-1 gap-y-6 gap-x-2 sm:grid-cols-6">

          <div className="sm:col-span-6">
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
            </div>

            
            <div className="sm:col-span-3">
              <div className="mt-1">
                <input
                  type="text"
                  name="reqKey"
                  id="reqKey"
                  placeholder="Key"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <div className="mt-1">
              <select
                  id="reqValType"
                  name="reqValType"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="boolean">Boolean</option>
                  <option value="number">Number</option>
                  <option value="string">String</option>
                  <option value="object">Object</option>
                  <option value="array">Array</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex w-full items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>

      </div>


      <div className="space-y-2 divide-y divide-gray-200 col-span-6">
        <div className="mt-1">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-300">Response</h3>
            <p className="mt-1 text-md text-gray-500">
              from backend
            </p>
          </div>
        </div>

        <div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-2 sm:grid-cols-6">

          <div className="sm:col-span-6">
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
            </div>

            
            <div className="sm:col-span-3">
              <div className="mt-1">
                <input
                  type="text"
                  name="resKey"
                  id="resKey"
                  placeholder="Key"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <div className="mt-1">
              <select
                  id="reqValType"
                  name="reqValType"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="boolean">Boolean</option>
                  <option value="number">Number</option>
                  <option value="string">String</option>
                  <option value="array">Array</option>
                  <option value="object">Object</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex w-full items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>

      </div>
    </form>
  )
}