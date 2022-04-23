import React, { useState } from 'react';
import { Menu, Transition, Combobox } from '@headlessui/react';
import { ChevronDownIcon,CheckIcon,SelectorIcon } from '@heroicons/react/solid';
import { string } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { updateContract } from '../state/features/contractSlice';
import axios from 'axios';

interface EnumEndpointItem {
  id: number;
  method: string
  name: string;
}
type Contracts = {
  [key: string]: string;
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

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
  updateFieldsByEndpoint: (requestString: string, responseString:string) => void
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
  }): JSX.Element => {
  const [query, setQuery] = useState('');
  const [selectedEndpoint, setSelectedEndpoint] = useState<EnumEndpointItem>();
  const store = useSelector((store: RootState) => store.contract)
  const { currentContract, currentContractToken } = useSelector((store: RootState) => store.contract);
  const dispatch = useDispatch()


  const saveContract = (
    reqMethod: string,
    endpoint: string,
    reqInputs: BodyInputs,
    resInputs: BodyInputs
  ): void => {
    // name of contract could be argument
    const reqBody = {};
    const resBody = {};
    const newContract = {};

    reqInputs.forEach((input) => {
      reqBody[input.reqKey] = input.reqValType;
    });
    resInputs.forEach((input) => {
      resBody[input.resKey] = input.resValType;
    });

    newContract[`Req@${reqMethod}@${endpoint}`] = reqBody; // should pass in request object here
    newContract[`Res@${reqMethod}@${endpoint}`] = resBody; // should pass in response object here
    console.log(newContract);

    
    const contractCopy = {...currentContract, ...newContract}
    // post new req/res to database
    axios
        .patch('http://localhost:4321/contract', {
          content: contractCopy,
          token: currentContractToken
          // token: 'A1B2'
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            dispatch(updateContract(contractCopy))
            //Reset form fields
            resetFields()
          }
        })
        .catch((error) => {
          console.log(error);
        });

  
  }


  const endpointChange = (event) => {
    setQuery(event.target.value);
    setEndpoint(event);
  };

  const filteredEndpoints =
    query === ''
      ? endpoints
      : endpoints.filter((endpoint: EnumEndpointItem) => {
        return endpoint.name.toLowerCase().includes(query.toLowerCase());
      });

  return (
    <div className='sticky top-16 z-40 bg-gray-900 shadow-lg'>
      <div className='grid grid-cols-12 gap-1 px-3 py-3'>
        <div className='col-span-4 sm:col-span-2 md:col-span-2 lg:col-span-1'>
          <select
            id='reqMethod'
            name='reqMethod'
            onChange={(e) => {
              handleSetReqMethod(e);
            }}
            value={reqMethod}
            className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          >
            <option value='GET'>GET</option>
            <option value='POST'>POST</option>
            <option value='PUT'>PUT</option>
            <option value='PATCH'>PATCH</option>
            <option value='DELETE'>DELETE</option>
          </select>
        </div>
        <button onClick={() => {console.log(store)}}>check current state of store</button>
        <button onClick={() => { console.log(reqInputs); console.log(resInputs); console.log(reqMethod); console.log(newEndpoint) }}>check state of inputs</button>

        <div className='col-span-8 sm:col-span-8 md:col-span-8 lg:col-span-9'>
          <Combobox
            as='div'
            value={selectedEndpoint}
            onChange={(endpoint: EnumEndpointItem) => {setSelectedEndpoint(endpoint); updateFieldsByEndpoint(`Req@${endpoint.method.toUpperCase()}@${endpoint.name}`, `Res@${endpoint.method.toUpperCase()}@${endpoint.name}`); setNewEndpoint(endpoint.name); setReqMethod(endpoint.method.toUpperCase())}}
          >
            <div className='relative mt-1'>
              <Combobox.Input
                type='endpoint'
                name='endpoint'
                id='endpoint'
                value={newEndpoint}
                className='w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'
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
                          active ? 'bg-indigo-600 text-white' : 'text-gray-900'
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
                                active ? 'text-white' : 'text-indigo-600'
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

        <div className='col-span-12 sm:col-span-2 md:col-span-2 lg:col-span-3 text-right'>
          <button
            className='inline-flex w-full justify-center mt-1 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            onClick={() => {
              saveContract(reqMethod, newEndpoint, reqInputs, resInputs);
            }}
          >
            Save
          </button>
        </div>
      </div>
      {/* <div className='wrapper-endpoint'>
        <form className='form-endpoint'>
            <div className='wrapper-selector'>
                <select id='reqType' name='reqType' className='request-type-selector'>
                    <option value='get'>GET</option>
                    <option value='post'>POST</option>
                    <option value='patch'>PATCH</option>
                    <option value='delete'>DELETE</option>
                </select>
            </div>
            <div className='wrapper-input'>
                <input type='text' id='endpoint-text' name='endpoint' placeholder='Enter request URL'></input>
            </div>
            <div className='wrapper-save'>
                <button className='btn-save'>Save</button>
            </div>
        </form>
      </div> */}
    </div>
  );
};

export default ContractEndpoint;
