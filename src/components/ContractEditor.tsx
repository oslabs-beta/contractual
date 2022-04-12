import React from 'react';
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
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-2 sm:grid-cols-6">

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
              <label htmlFor="reqKey" className="block text-sm font-medium text-gray-300">
                Key
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="reqKey"
                  id="reqKey"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="reqValType" className="block text-sm font-medium text-gray-300">
                Value Type
              </label>
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
                  <option value="boolean">Boolean</option>
                  <option value="number">Number</option>
                  <option value="string">String</option>
                  <option value="array">Array</option>
                  <option value="object">Object</option>
                </select>
              </div>
            </div>

            
            <div className="sm:col-span-3">
              <label htmlFor="resKey" className="block text-sm font-medium text-gray-300">
                Key
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="resKey"
                  id="resKey"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="reqValType" className="block text-sm font-medium text-gray-300">
                Value Type
              </label>
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
      </div>
    </form>
  )
}