import { useSelector } from 'react-redux';
import { RootState } from '../state/store';

export default function BackLog() {
  const currentLog = useSelector((store: RootState) => store.backLog);

  return (
    <div className="col-span-6 px-3">
      <div className="sm:flex sm:items-center">
        <div className="mt-4">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-300">Response Log</h3>
          </div>
        </div>
      </div>
      <div className="mt-2 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Endpoint
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Time
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Report
                    </th>
                    {/* <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th> */}
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 bg-white'>
                  {currentLog.map((request, index) => {
                         const details = [];
                         for (let i = 0; i < request.error.length; i++) {
                           details.push(<div key={i + request.endpoint}>{request.error[i]}<br></br></div>)
                         }
                    let reqStatus;
                    if (request.pass === true) {
                      reqStatus = (
                        <span className='inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800'>
                          Success
                        </span>
                      );
                    } else if (request.pass === false) {
                      reqStatus = (
                        <span className='inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800'>
                          Error
                        </span>
                      );
                    }
                    8;
                    return (
                      <tr key={index}>
                        <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                          <div className='flex items-center'>
                            <div>
                              <div className='font-medium text-gray-900'>
                                {request.endpoint}
                              </div>
                              <div className='text-gray-500'>
                                {request.method}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                          {reqStatus}
                        </td>
                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                          {request.time}
                        </td>
                        <td className='break-normal px-3 py-4 text-sm text-gray-500'>
                          {details}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}