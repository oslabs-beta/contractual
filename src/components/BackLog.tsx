

const success = <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
  Success
</span>;
const error = <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
  Error
</span>

const requests = [
  {
    endpoint: '/login',
    method: 'POST',
    status: success,
    time: '11:18:21 Feb 05',
    error: '',
  },
  {
    endpoint: '/register',
    method: 'POST',
    status: error,
    time: '11:18:21 Feb 05',
    error: 'Wrong key',
  },
  {
    endpoint: '/login',
    method: 'POST',
    status: success,
    time: '23:10:01 Feb 03',
    error: '',
  },
  {
    endpoint: '/feed',
    method: 'GET',
    status: success,
    time: '07:23:22 Feb 02',
    error: '',
  },
  {
    endpoint: '/feed',
    method: 'GET',
    status: error,
    time: '19:00:56 Feb 01',
    error: 'Wrong type',
  },
  // More requests...
]

export default function BackLog() {
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
                    {/* <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Title
                    </th> */}
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Time
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Error
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {requests.map((request, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          {/* <div className="h-10 w-10 flex-shrink-0">
                            <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
                          </div> */}
                          <div>
                            <div className="font-medium text-gray-900">{request.endpoint}</div>
                            <div className="text-gray-500">{request.method}</div>
                          </div>
                        </div>
                      </td>
                      {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="text-gray-900">{person.title}</div>
                        <div className="text-gray-500">{person.department}</div>
                      </td> */}
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {request.status}
                        {/* <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                          Active
                        </span> */}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {request.time}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{request.error}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          Edit<span className="sr-only">, {request.endpoint}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}