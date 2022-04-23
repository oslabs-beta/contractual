import { PaperClipIcon } from '@heroicons/react/solid';
import { validateYupSchema } from 'formik';
type CurrentContract = {
  [key: string]: Contracts
}
type Contracts = {
  [key: string]: string
}
interface PreviewProps {
  reqKeys: string[];
  currentContract: CurrentContract
}

const DocumentPreview: React.FC<PreviewProps> = ({ currentContract, reqKeys }): JSX.Element => {
  // console.log('CURRENT CONTRACT', currentContract);
  // console.log('CURRENT KEYS', reqKeys);
  const buildPreview = (contract, reqs) => {
    const endpoints = {};
    // Loop through reqKeys of one endpoint
    for (let req of reqs) {
      const endpoint = []
      const reqPairs = [];
      const resPairs = [];
      let reqKeys = contract[req];
      for (let key in reqKeys) {
        let pair = {};
        pair[key] = reqKeys[key];
        reqPairs.push(pair);
      }
      endpoint.push(reqPairs);
      let res = 'Res' + req.slice(3);
      let resKeys = contract[res];
      for (let key in resKeys) {
        resPairs.push({
          key: resKeys[key] //like this right?
        })
        // isn't it already an object?
        // we are looping through the keys in the object ah right
      }
      endpoint.push(resPairs)
      endpoints[req.slice(4)] = endpoint // i chopped off the beginning again
    }
    // console.log('ENDPOINTS');
    // console.log(endpoints);
    return endpoints;
  }

  const docObj = buildPreview(currentContract, reqKeys);
  console.log('DOCUMENTATION');
  console.log(docObj);
  // {
  //   endpoint1: [[{key: value}, {key: value}], [{key: value}]],
  //   endpoint2: 
  // }
  const documentation = []
  for (let key in docObj) {
    let splitKey = key.split('@');
    const requests = [];
    const responses = [];
    for (let request of docObj[key][0]) {
      requests.push(
        <>
          <dt className='text-sm font-medium text-gray-500'>{Object.keys(request)[0]}</dt>
          <dd className='mt-1 text-sm text-gray-900'>{Object.values(request)[0]}</dd>
          <br></br>
        </>
      )
    }
    for (let response of docObj[key][1]) {
      responses.push(
        <>
          <dt className='text-sm font-medium text-gray-500'>{Object.keys(response)[0]}</dt>
          <dd className='mt-1 text-sm text-gray-900'>{Object.values(response)[0]}</dd>
          <br></br>
        </>
      )
    }
    documentation.push(
      <div className='bg-white shadow overflow-hidden sm:rounded-lg mb-3'>
        <div className='px-4 py-5 sm:px-6'>
          <h3 className='text-lg leading-6 font-medium text-gray-900'>
            {splitKey[1]}
          </h3>
          <p className='mt-1 max-w-2xl text-sm text-gray-500'>{splitKey[0]}</p>
        </div>
        <div className='border-t border-gray-200 px-4 py-5 sm:px-6'>
          <dl className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2'>
            <div className='sm:col-span-1'>
              <dt className='text-md font-medium text-gray-500 mb-4'>
                Request Type: <strong>Object</strong>
              </dt>
              {/* <dd className='mt-1 text-md text-gray-900'>Object</dd> */}
              <div className='sm:col-span-1'>
                {requests}
              </div>
            </div>

            <div className='sm:col-span-1'>
              <dt className='text-md font-medium text-gray-500 mb-4'>
                Response Type: <strong>Object</strong>
              </dt>
              {/* <dd className='mt-1 text-md text-gray-900'>Object</dd> */}
              <div className='sm:col-span-1'>
                {responses}
              </div>
            </div>

            {/* <div className='sm:col-span-2'>
              <dt className='text-md font-semibold text-gray-500'>Usage</dt>
              <dd className='mt-1 text-sm text-gray-900'>
                Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
                consequat sint. Sit id mollit nulla mollit nostrud in ea officia
                proident. Irure nostrud pariatur mollit ad adipisicing
                reprehenderit deserunt qui eu.
              </dd>
            </div> */}
          </dl>
        </div>
      </div>
    )
  }

  return (
    <div className='px-3 py-3 bg-gray-900'>
      {documentation}
    </div>
  );
}

export default DocumentPreview;
