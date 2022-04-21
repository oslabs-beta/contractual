import React, { useState } from 'react';
import { Menu, Transition, Combobox } from '@headlessui/react';
import {
  ChevronDownIcon,
  CheckIcon,
  SelectorIcon,
} from '@heroicons/react/solid';
import { string } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { addToContract } from '../state/features/contractSlice';

interface EnumEndpointItem {
  id: number;
  name: string;
}

const endpoints: EnumEndpointItem[] = [
  { id: 1, name: '/login' },
  { id: 2, name: '/register' },
  { id: 3, name: '/contract' },
  { id: 4, name: '/test' },
  { id: 5, name: '/documentation' },
  { id: 6, name: '/logout' },
  { id: 7, name: '/frontend' },
  { id: 8, name: '/backend' },
  // More endpoints...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

type KeyAndType = {
  [key: string]: string;
};
type BodyInputs = KeyAndType[];


interface ContractEndpointProps {
  reqMethod: string,
  setReqMethod: (e: any) => void,
  endpoint: string,
  setEndpoint: (e: any) => void,
  reqInputs: BodyInputs,
  resInputs: BodyInputs,
  resetFields: () => void,
}



const ContractEndpoint: React.FC<ContractEndpointProps> = ({ reqMethod, setReqMethod, endpoint, setEndpoint, reqInputs, resInputs, resetFields }): JSX.Element => {

  const { currentContract } = useSelector((store: RootState) => store.contract);
  const dispatch = useDispatch()

  // save contract needs to be a reducer function adding to our store object
  // would also pass in req body and res body
  // concat our 'newContract' object to the store state?
  // one pair each implementation

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

    dispatch(addToContract(newContract))


    //Reset form fields
    resetFields()
  }

  const [query, setQuery] = useState('');
  const [selectedEndpoint, setSelectedEndpoint] = useState();

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
              setReqMethod(e);
            }}
            className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          >
            <option value='GET'>GET</option>
            <option value='POST'>POST</option>
            <option value='PUT'>PUT</option>
            <option value='PATCH'>PATCH</option>
            <option value='DELETE'>DELETE</option>
          </select>
        </div>
        {/* <button onClick={() => {console.log(currentContract)}}>check current state of contract</button> */}
        {/* <div className="col-span-7 sm:col-span-8 md:col-span-8 lg:col-span-9">
          <input
            type="endpoint"
            name="endpoint"
            id="endpoint"
            value={endpoint}
            onChange={(e) => {setEndpoint(e)}}
            className="h-[2.4rem] mt-1 block w-full shadow-sm sm:text-md border-gray-300 rounded-md px-3 py-2"
          />
        </div> */}
        <div className='col-span-8 sm:col-span-8 md:col-span-8 lg:col-span-9'>
          <Combobox
            as='div'
            value={selectedEndpoint}
            onChange={setSelectedEndpoint}
          >
            <div className='relative mt-1'>
              <Combobox.Input
                type='endpoint'
                name='endpoint'
                id='endpoint'
                value={endpoint}
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
                            {endpoint.name}
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
              saveContract(reqMethod, endpoint, reqInputs, resInputs);
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
