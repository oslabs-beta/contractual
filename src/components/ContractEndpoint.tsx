import React, { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { updateContract } from '../state/features/contractSlice';
import axios from 'axios';

interface EnumEndpointItem {
  id: number;
  method: string
  name: string;
}
// type Contracts = {
//   [key: string]: string;
// };
type KeyAndType = {
  [key: string]: string;
};
type BodyInputs = KeyAndType[];
interface ContractEndpointProps {
  reqMethod: string,
  setReqMethod;
  handleSetReqMethod: (e: any) => void,
  newEndpoint: string,
  endpoints: EnumEndpointItem[],
  setEndpoint: (e: any) => void,
  setNewEndpoint: (input: string) => void
  reqInputs: BodyInputs,
  resInputs: BodyInputs,
  resetFields: () => void,
  updateFieldsByEndpoint: (requestString: string, responseString: string) => void,
  setNotificationString: (input: string) => void,
  setVisibility: (input: boolean) => void,
}
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const ContractEndpoint: React.FC<ContractEndpointProps> = ({
  reqMethod,
  setReqMethod,
  handleSetReqMethod,
  newEndpoint,
  endpoints,
  setNewEndpoint,
  setEndpoint,
  reqInputs,
  resInputs,
  resetFields,
  updateFieldsByEndpoint,
  setNotificationString,
  setVisibility,
}): JSX.Element => {
  const [query, setQuery] = useState('');
  const [selectedEndpoint, setSelectedEndpoint] = useState<EnumEndpointItem>();
  const store = useSelector((store: RootState) => store.contract)
  const { currentContract, currentContractToken } = useSelector((store: RootState) => store.contract);
  const dispatch = useDispatch()

  /** SAVE OR UPDATE THE CURRENTLY SELECTED ENDPOINT AND FIELDS TO THE DATABASE */
  const saveContract = (
    reqMethod: string,
    endpoint: string,
    reqInputs: BodyInputs,
    resInputs: BodyInputs
  ): void => {
    // if (!currentContractToken) return console.log('NO CURRENT CONTRACT SELECTED')
    // if (!endpoint) return console.log('ENDPOINT REQUIRED')

    /// NOTIFICATION TEST
    if (!currentContractToken) {
      setNotificationString('NO CURRENT CONTRACT SELECTED')
      setVisibility(true)
      return
    }
    else if (!endpoint) {
      setNotificationString('ENDPOINT REQUIRED')
      setVisibility(true)
      return
    }
    //// NOTIFICATION TEST END

    const reqBody = {};
    const resBody = {};
    const newContract = {};

    reqInputs.forEach((input) => {
      reqBody[input.reqKey] = input.reqValType;
    });
    resInputs.forEach((input) => {
      resBody[input.resKey] = input.resValType;
    });

    /**  BUILD CONTRACT STRINGS FOR REQUEST AND RESPONSE */
    newContract[`Req@${reqMethod}@${endpoint}`] = reqBody; // should pass in request object here
    newContract[`Res@${reqMethod}@${endpoint}`] = resBody; // should pass in response object here
    console.log(newContract);

    const contractCopy = { ...currentContract, ...newContract }

    axios
      .patch('http://localhost:4321/contract', {
        content: contractCopy,
        token: currentContractToken
      })
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
          dispatch(updateContract(contractCopy))
          resetFields()
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setNotificationString('ENDPOINT SAVED')
    setVisibility(true)
  }

  const deleteEndpoint = (reqMethod: string, endpoint: string) => {
    // if (!currentContractToken) return console.log('NO CURRENT CONTRACT SELECTED')
    // if (!endpoint) return console.log('ENDPOINT REQUIRED')
    if (!currentContractToken) {
      setNotificationString('NO CURRENT CONTRACT SELECTED')
      setVisibility(true)
      return
    }
    else if (!endpoint) {
      setNotificationString('ENDPOINT REQUIRED')
      setVisibility(true)
      return
    }
    const contractCopy = { ...currentContract }

    // console.log('COPY BEFORE DELETION: ', contractCopy)
    delete contractCopy[`Req@${reqMethod}@${endpoint}`]
    delete contractCopy[`Res@${reqMethod}@${endpoint}`]
    // console.log('COPY AFTER DELETION: ', contractCopy)

    axios
      .patch('http://localhost:4321/contract', {
        content: contractCopy,
        token: currentContractToken
      })
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
          dispatch(updateContract(contractCopy))
          resetFields()
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setNotificationString('ENDPOINT DELETED')
    setVisibility(true)
  }

  /** ADJUST CURRENT SELECTED ENUM INDEX  */
  const endpointChange = (event) => {
    setQuery(event.target.value);
    setEndpoint(event);
  };

  /** SEARCH FILTER FOR ENDPOINT INPUT FIELD */
  const filteredEndpoints =
    query === ''
      ? endpoints
      : endpoints.filter((endpoint: EnumEndpointItem) => {
        return endpoint.name.toLowerCase().includes(query.toLowerCase());
      });

  return (
    <div className='sticky top-16 z-40 bg-gray-900 shadow-lg'>
      <div className='grid grid-cols-12 gap-1 px-3 py-3'>
        <div className='col-span-12 sm:col-span-2 md:col-span-2 lg:col-span-2'>
          <select
            id='reqMethod'
            name='reqMethod'
            onChange={(e) => {
              handleSetReqMethod(e);
            }}
            value={reqMethod}
            className='mt-1 block w-full py-2 px-3 border border-gray-300 text-gray-50 bg-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
          >
            <option value='GET'>GET</option>
            <option value='POST'>POST</option>
            <option value='PUT'>PUT</option>
            <option value='PATCH'>PATCH</option>
            <option value='DELETE'>DELETE</option>
          </select>
        </div>

        {/* TEST BUTTONS */}
        {/* <button onClick={() => { console.log(store) }}>check current state of store</button>
        <button onClick={() => { console.log(reqInputs); console.log(resInputs); console.log(reqMethod); console.log(newEndpoint) }}>check state of inputs</button> */}

        <div className='col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-7'>
          <Combobox
            as='div'
            value={selectedEndpoint}
            onChange={(endpoint: EnumEndpointItem) => { setSelectedEndpoint(endpoint); updateFieldsByEndpoint(`Req@${endpoint.method.toUpperCase()}@${endpoint.name}`, `Res@${endpoint.method.toUpperCase()}@${endpoint.name}`); setNewEndpoint(endpoint.name); setReqMethod(endpoint.method.toUpperCase()) }}
          >
            <div className='relative mt-1'>
              <Combobox.Input
                type='endpoint'
                name='endpoint'
                id='endpoint'
                placeholder='Endpoint'
                value={newEndpoint}
                className='w-full rounded-md border border-gray-300 bg-gray-900 text-gray-50 placeholder-green-500 py-2 pl-3 pr-10 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm'
                onChange={(event) => endpointChange(event)}
                displayValue={(endpoint: EnumEndpointItem) => endpoint.name}
              />
              <Combobox.Button className='absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none'>
                <SelectorIcon
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </Combobox.Button>

              {filteredEndpoints.length > 0 && (
                <Combobox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                  {filteredEndpoints.map((endpoint) => (
                    <Combobox.Option
                      key={endpoint.id}
                      value={endpoint}
                      className={({ active }) =>
                        classNames(
                          'relative cursor-default select-none py-2 pl-3 pr-9',
                          active ? 'bg-blue-600 text-white' : 'text-gray-900'
                        )
                      }
                    >
                      {({ active, selected }) => (
                        <>
                          <span
                            className={classNames(
                              'block truncate',
                              selected && 'font-semibold'
                            )}
                          >
                            {endpoint.method + ' ' + endpoint.name}
                          </span>

                          {selected && (
                            <span
                              className={classNames(
                                'absolute inset-y-0 right-0 flex items-center pr-4',
                                active ? 'text-white' : 'text-blue-600'
                              )}
                            >
                              <CheckIcon
                                className='h-5 w-5'
                                aria-hidden='true'
                              />
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

        <div className='col-span-6 sm:col-span-2 md:col-span-2 lg:col-span-1 text-right'>
          <button
            className='inline-flex w-full justify-center mt-1 py-2 px-4 border shadow-sm text-sm font-medium rounded-md text-red-700 bg-transparent border-red-700 hover:bg-red-700 hover:border-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-red-500'
            onClick={() => {
              deleteEndpoint(reqMethod, newEndpoint);
            }}
          >
            Delete
          </button>
        </div>
        <div className='col-span-6 sm:col-span-2 md:col-span-2 lg:col-span-2 text-right'>
          <button
            className='inline-flex w-full justify-center mt-1 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900'
            onClick={() => {
              saveContract(reqMethod, newEndpoint, reqInputs, resInputs);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContractEndpoint;