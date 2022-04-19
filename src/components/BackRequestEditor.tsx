/////TESTING DYNAMIC INPUTS
// type KeyAndType = {
//   [key: string]: string;
// };
// type BodyInputs = KeyAndType[];
// /// TEST END///////
type KeyTypeValue = {
  reqKey: string;
  reqValType: string;
  reqVal: string | number | boolean | any[]
};
type BodyInputs = KeyTypeValue[]

interface ContractEndpointProps {
  reqInputs: BodyInputs;
  setReqInputs: (index: string, e: Event) => void;
  addReqField: () => void;
}


export default function BackRequestEditor({
  reqInputs,
  setReqInputs,
  addReqField,
}) {

  return (
    <>
      <button onClick={() => {console.log(reqInputs)}}>check state of inputs</button>
    <form className='divide-gray-200 px-3 grid grid-cols-12 gap-3'>

      <div className='space-y-2 col-span-12'>
        <div className='mt-1'>
          <div>
            <h3 className='text-lg leading-6 font-medium text-gray-300'>
              Mock Request
            </h3>
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

          const stringInput = (
            <input
              required
              type='text'
              name='reqVal'
              id='reqVal'
              // value={input.reqKey}
              // test
              onChange={(e) => setReqInputs(index, e)}
              className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
            />
          );
          const numberInput = (
            <input
              required
              type='number'
              name='reqVal'
              id='reqVal'
              // value={input.reqKey}
              // test
              onChange={(e) => setReqInputs(index, e)}
              className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
            />
          );
          const booleanInput = (
            <select
              required
              id='reqVal'
              name='reqVal'
              value={input.reqVal}
              onChange={(e) => setReqInputs(index, e)}
              className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
            >
              <option value='true'>True</option>
              <option value='false'>False</option>
            </select>
          )

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

                <div className='sm:col-span-1'>
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
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                </div>

                <div className='sm:col-span-1'>
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
                      {/* <option value='object'>Object</option>
                      <option value='array'>Array</option> */}
                    </select>
                  </div>
                </div>
                {/* <>
                  {if (input[index].reqValType === 'boolean') {
                    return (booleanInput)
                  }
                  else if (input[index].reqValType === 'number') {
                    return (numberInput)
                  }
                  else if (input[index].reqValType === 'string') {
                    return (stringInput)
                  }}
                </> */}
                <div className='sm:col-span-4'>
                  <label
                    htmlFor='reqVal'
                    className='block text-sm font-medium text-gray-300'
                  >
                    Value
                  </label>
                  <div className='mt-1'>
                    {(() => {
                      // console.log("IIIIIFFFFEEEEEE")
                      if (reqInputs[index].reqValType === 'boolean') return booleanInput
                      else if (reqInputs[index].reqValType === 'number') return numberInput
                      else if (reqInputs[index].reqValType === 'string') return stringInput
                    })()}
                  </div>
                </div>



              </div>
              <hr className='mt-3'></hr>
            </div>
          );
        })}

        {/* <div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-2 sm:grid-cols-6">

          <div className="sm:col-span-6">
              <div className="mt-1">
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

            <div className='sm:col-span-3'>
              <div className='mt-1'>
                <input
                  type='text'
                  name='reqKey'
                  id='reqKey'
                  // test
                  onChange={(e) => {
                    handleBodyInput(e);
                  }}
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                />
              </div>
            </div>

            <div className='sm:col-span-3'>
              <div className='mt-1'>
                <select
                  id='reqValType'
                  name='reqValType'
                  onChange={(e) => {
                    handleBodyInput(e);
                  }}
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                >
                  <option value='boolean'>Boolean</option>
                  <option value='number'>Number</option>
                  <option value='string'>String</option>
                  <option value='object'>Object</option>
                  <option value='array'>Array</option>
                </select>
              </div>
            </div>
          </div>
        </div> */}
        {/* ////////// */}
        <button
          type='button'
          onClick={addReqField}
          className='inline-flex w-full mt-2 items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
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
      </div>
    </form>
    </>
  )
}