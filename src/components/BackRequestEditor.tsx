/////TESTING DYNAMIC INPUTS
// type KeyAndType = {
//   [key: string]: string;
// };
// type BodyInputs = KeyAndType[];
// /// TEST END///////


// type KeyTypeValue = {
//   reqKey: string;
//   reqValType: string;
//   reqVal: string | number | boolean | any[]
// };
// type BodyInputs = KeyTypeValue[]
// interface ContractEndpointProps {
//   reqInputs: BodyInputs;
//   setReqInputs: (index: string, e: Event) => void;
//   reqMethod: string
// }
export default function BackRequestEditor({
  reqInputs,
  setReqInputs,
  reqMethod
}) {

  return (
    <>
      <form className='divide-gray-200 px-3 grid grid-cols-12 gap-3'>

        <div className='space-y-2 col-span-12'>
          <div className='mt-1'>
            <div>
              <h3 className='text-lg leading-6 font-medium text-gray-300'>
                Mock Request
              </h3>
            </div>
          </div>
          {/* <hr className="border-blue-700"></hr> */}
          <div className='sm:col-span-6'>
            <div className='mt-1'>
              <select
                id='reqLocation'
                name='reqLocation'
                className='shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-blue-500 text-blue-500 bg-gray-900 rounded-md'
              >
                <option value='body'>Body</option>
                <option value='query'>Query</option>
                <option value='params'>Params</option>
              </select>
            </div>
          </div>
          {/* <hr className="border-blue-700"></hr> */}
          {/* ////////// Render this portion dynamically */}
          {reqInputs.map((input, index) => {
            const stringInput = (
              <input
                required
                type='text'
                name='reqVal'
                id='reqVal'
                // test
                value={input.reqVal}
                // test
                onChange={(e) => setReqInputs(index, e)}
                className='shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-blue-500 bg-gray-800 text-gray-50 rounded-md'
              />
            );
            const numberInput = (
              <input
                required
                type='number'
                name='reqVal'
                id='reqVal'
                // test
                value={input.reqVal}
                // test
                onChange={(e) => setReqInputs(index, e)}
                className='shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-blue-500 bg-gray-800 text-gray-50 rounded-md'
              />
            );
            const booleanInput = (
              <select
                required
                id='reqVal'
                name='reqVal'
                value={input.reqVal}
                onChange={(e) => setReqInputs(index, e)}
                className='shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-blue-500 bg-gray-800 text-gray-50 rounded-md'
              >
                <option value='true'>True</option>
                <option value='false'>False</option>
              </select>
            )
            const arrayInput = (
              <input
                required
                type='text'
                name='reqVal'
                id='reqVal'
                placeholder='Use valid JSON syntax: ["string", 123, true, false]'
                // test
                value={input.reqVal}
                // test
                onChange={(e) => setReqInputs(index, e)}
                className='shadow-sm placeholder-green-500 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-blue-500 bg-gray-800 text-gray-50 rounded-md'
              />
            )
            return (
              <div key={index}>
                <div className='mt-6 grid grid-cols-6 gap-y-6 gap-x-2 sm:grid-cols-6'>
                {/* <div className="sm:col-span-6">
                      <div className="mt-1">
                        <select
                          id="reqLocation"
                          name="reqLocation"
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                          <option value="body">Body</option>
                          <option value="query">Query</option>
                          <option value="params">Params</option>
                        </select>
                      </div>
                    </div> */}
                  <div className='col-span-4 sm:col-span-1'>
                    <label
                      htmlFor='reqKey'
                      className='block text-sm font-medium text-gray-300'
                    >
                      Key
                    </label>
                    <div className='mt-1'>
                      <input
                        required
                        type='text'
                        name='reqKey'
                        id='reqKey'
                        value={input.reqKey}
                        // test
                        onChange={(e) => setReqInputs(index, e)}
                        className='shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-blue-500 bg-gray-800 text-blue-500 rounded-md'
                      />
                    </div>
                  </div>

                  <div className='col-span-2 sm:col-span-1'>
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
                        // ADD FUNCTIONALITY TO CHANGE DEFAULT REQVAL IMMEDIATELY BELOW
                        onChange={(e) => setReqInputs(index, e)}
                        className='shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 text-gray-50 bg-gray-900 rounded-md'
                      >
                        <option value='boolean'>Boolean</option>
                        <option value='number'>Number</option>
                        <option value='string'>String</option>
                        <option value='array-any-any'>Array</option>
                        {/* <option value='object'>Object</option> */}
                      </select>
                    </div>
                  </div>

                  <div className='col-span-6 sm:col-span-4'>
                    <label
                      htmlFor='reqVal'
                      className='block text-sm font-medium text-gray-300'
                    >
                      Value
                    </label>
                    <div className='mt-1'>
                      {(() => {
                        if (reqInputs[index].reqValType === 'boolean') return booleanInput;
                        else if (reqInputs[index].reqValType === 'number') return numberInput;
                        else if (reqInputs[index].reqValType === 'string') return stringInput;
                        else if (reqInputs[index].reqValType === 'array-any-any') return arrayInput;
                      })()}
                    </div>
                  </div>
                </div>
                <hr className='mt-3 border-gray-800'></hr>
              </div>
            );
          })}
        </div>
      </form>
    </>
  )
}