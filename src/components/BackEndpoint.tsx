import { useState } from 'react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { Combobox } from '@headlessui/react'

interface EnumEndpointItem {
  id: number,
  name: string
};

const endpoints: EnumEndpointItem[] = [
  { id: 1, name: '/login' },
  // More endpoints...
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function BackEndpoint() {

  const [query, setQuery] = useState('')
  const [selectedEndpoint, setSelectedEndpoint] = useState()

  const filteredEndpoints =
    query === ''
      ? endpoints
      : endpoints.filter((endpoint) => {
        return endpoint.name.toLowerCase().includes(query.toLowerCase())
      })


  return (
    <div className='sticky top-16 z-50 bg-gray-900 shadow-lg'>
      <div className='grid grid-cols-12 gap-1 px-3 py-3 grid-flow-col'>
        <div className='col-span-2 sm:col-span-2'>
          <div>
            <select
              id="reqMethod"
              name="reqMethod"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              defaultValue="GET"
            >
              <option value="GET" >GET</option>
              <option value="POST" >POST</option>
              <option value="PUT" >PUT</option>
              <option value="PATCH" >PATCH</option>
              <option value="DELETE" >DELETE</option>
            </select>
          </div>
        </div>
        <div className='col-span-8 sm:col-span-7'>
          <Combobox as="div" value={selectedEndpoint} onChange={setSelectedEndpoint}>
            <div className="relative mt-1">
              <Combobox.Input
                className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                onChange={(event) => setQuery(event.target.value)}
                displayValue={(endpoint: EnumEndpointItem) => endpoint.name}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </Combobox.Button>

              {filteredEndpoints.length > 0 && (
                <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredEndpoints.map((endpoint) => (
                    <Combobox.Option
                      key={endpoint.id}
                      value={endpoint}
                      className={({ active }) =>
                        classNames(
                          'relative cursor-default select-none py-2 pl-3 pr-9',
                          active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                        )
                      }
                    >
                      {({ active, selected }) => (
                        <>
                          <span className={classNames('block truncate', selected && 'font-semibold')}>{endpoint.name}</span>

                          {selected && (
                            <span
                              className={classNames(
                                'absolute inset-y-0 right-0 flex items-center pr-4',
                                active ? 'text-white' : 'text-indigo-600'
                              )}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          )}
                        </>
                      )}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              )}
            </div>
          </Combobox>
        </div>
        <div className='col-span-2 sm:col-span-3'>
          <button
            type="button"
            className="items-center text-center h-[38px] w-full mt-1 px-2.5 py-1.5 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  )
}