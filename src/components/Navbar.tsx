/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition, Combobox } from '@headlessui/react'
import { UserIcon, BellIcon, MenuIcon, XIcon, CheckIcon, SelectorIcon } from '@heroicons/react/outline'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import ModalNewContract from './ModalNewContract';
import ModalJoinContract from './ModalJoinContract';
import ModalContractDetails from './ModalContractDetails';
import Notification from './Notification';
import { RootState } from '../state/store';
import { useDispatch, useSelector } from 'react-redux';
import { loadContract } from '../state/features/contractSlice';
import axios from 'axios';

interface EnumContractItem {
  token: string;
  name: string;
}



function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const dispatch = useDispatch();
  const { tokens, currentContractToken } = useSelector((store: RootState) => store.contract);
  const contracts: EnumContractItem[] = [];
  for (let key in tokens) {
    contracts.push({
      name: key,
      token: tokens[key]
    })
  }
  console.log(contracts);
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [selectedContract, setSelectedContract] = useState<EnumContractItem>()
  const [newOpen, setNewOpen] = useState<boolean>(false)
  const [joinOpen, setJoinOpen] = useState<boolean>(false)
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false)

  const handleCloseNewModal = (): void => {
    setNewOpen(false);
  }
  const handleCloseJoinModal = (): void => {
    setJoinOpen(false);
  }
  const handleCloseDetailsModal = (): void => {
    setDetailsOpen(false);
  }
  const changeContract = (input: EnumContractItem): void => {
    axios
      .post('http://localhost:4321/contract/details', {
        token: input.token,
        import: false
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          dispatch(loadContract({
            contract: response.data.content,
            token: input.token
          }))
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const sendToken = (token) => {
    axios
      .get(`http://localhost:1234/contract/${token}`)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log('Error is: ', error)
      })
  }
  const filteredContracts =
    query === ''
      ? contracts
      : contracts.filter((contract: EnumContractItem) => {
        return contract.name.toLowerCase().includes(query.toLowerCase());
      });

  const location = useLocation();
  let currentStyle =
    'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium';
  let defaultStyle =
    'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium';
  let currentStyleMobile = 'bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium';
  let defaultStyleMobile = 'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium';

  console.log('location: ' + location.pathname);



  return (
    <>
      <ModalNewContract visibility={newOpen} closeModal={handleCloseNewModal} setSelectedContract={setSelectedContract} sendToken={sendToken} />
      <ModalJoinContract visibility={joinOpen} closeModal={handleCloseJoinModal} setSelectedContract={setSelectedContract} sendToken={sendToken} />
      <ModalContractDetails visibility={detailsOpen} closeModal={handleCloseDetailsModal} tokens={tokens} currentContractToken={currentContractToken} />
      <Notification className=''></Notification>
      <Disclosure
        as='nav'
        className='bg-gray-800 sticky top-0 z-[60] shadow-lg'
      >
        {({ open }) => (
          <>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
              <div className='flex items-center justify-between h-16'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0'>
                    <img
                      className='block lg:hidden h-8 w-auto'
                      src='../assets/img/icon-white.png'
                      alt='Contractual'
                    />
                    <img
                      className='hidden lg:block h-8 w-auto'
                      src='../assets/img/icon-white.png'
                      alt='Contractual'
                    />
                  </div>
                  <div className='hidden sm:block sm:ml-6'>
                    <div className='flex space-x-4'>
                      <Combobox
                        as='div'
                        value={selectedContract}
                        onChange={(contract) => { setSelectedContract(contract); changeContract(contract); sendToken(contract.token) }}
                      >
                        <div className='relative mt-1'>
                          <Combobox.Input
                            className='w-full rounded-md border border-gray-300 bg-white py-1 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'
                            onChange={(event) => { setQuery(event.target.value) }}
                            displayValue={(contract: EnumContractItem) =>
                              contract.name
                            }
                          />
                          <Combobox.Button className='absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none'>
                            <SelectorIcon
                              className='h-5 w-5 text-gray-400'
                              aria-hidden='true'
                            />
                          </Combobox.Button>

                          {filteredContracts.length > 0 && (
                            <Combobox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                              {filteredContracts.map((contract) => (
                                <Combobox.Option
                                  key={contract.token}
                                  value={contract}
                                  className={({ active }) =>
                                    classNames(
                                      'relative cursor-default select-none py-2 pl-3 pr-9',
                                      active
                                        ? 'bg-indigo-600 text-white'
                                        : 'text-gray-900'
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
                                        {contract.name}
                                      </span>

                                      {selected && (
                                        <span
                                          className={classNames(
                                            'absolute inset-y-0 right-0 flex items-center pr-4',
                                            active
                                              ? 'text-white'
                                              : 'text-indigo-600'
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

                      {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                      <Link
                        to='contract'
                        className={
                          location.pathname === '/navbar' ||
                            location.pathname === '/navbar/contract'
                            ? currentStyle
                            : defaultStyle
                        }
                      >
                        Contract
                      </Link>
                      <Link
                        to='front'
                        className={
                          location.pathname === '/navbar/front'
                            ? currentStyle
                            : defaultStyle
                        }
                      >
                        Frontend
                      </Link>
                      <Link
                        to='back'
                        className={
                          location.pathname === '/navbar/back'
                            ? currentStyle
                            : defaultStyle
                        }
                      >
                        Backend
                      </Link>
                      <Link
                        to='document'
                        className={
                          location.pathname === '/navbar/document'
                            ? currentStyle
                            : defaultStyle
                        }
                      >
                        Documentation
                      </Link>
                    </div>
                  </div>
                </div>
                <div className='hidden sm:ml-6 sm:block'>
                  <div className='flex items-center'>
                    {/* <button
                    type="button"
                    className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button> */}

                    {/* Profile dropdown */}
                    <Menu as='div' className='ml-3 relative'>
                      <div>
                        <Menu.Button className='bg-gray-600 px-1 py-1 flex text-sm rounded-full focus:outline-none'>
                          <span className='sr-only'>Open user menu</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {/* <img
                            className='h-8 w-8 rounded-full'
                            src='../assets/img/icon-user.png'
                            alt=''
                          /> */}
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                      >
                        <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                          {/* <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item> */}
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href='#'
                                onClick={() => setNewOpen(true)}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                New contract
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href='#'
                                onClick={() => setJoinOpen(true)}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Join contract
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href='#'
                                onClick={() => setDetailsOpen(true)}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Contract details
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <div
                                onClick={() => { window.location.reload(); }}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
                                )}
                              >
                                Sign out
                              </div>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className='-mr-2 flex sm:hidden'>
                  {/* Mobile menu button */}
                  <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                      <XIcon className='block h-6 w-6' aria-hidden='true' />
                    ) : (
                      <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className='sm:hidden'>
              <div className='px-2 pt-2 pb-3 space-y-1'>
                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                <Link to='contract'>
                  <Disclosure.Button
                    as='a'
                    href='#'
                    className={
                      location.pathname === '/navbar' ||
                        location.pathname === '/navbar/contract'
                        ? currentStyleMobile
                        : defaultStyleMobile
                    }
                  >
                    Contract
                  </Disclosure.Button>
                </Link>

                <Link to='front'>
                  <Disclosure.Button
                    as='a'
                    href='#'
                    className={
                      location.pathname === '/navbar/front'
                        ? currentStyleMobile
                        : defaultStyleMobile
                    }
                  >
                    Frontend
                  </Disclosure.Button>
                </Link>

                <Link to='back'>
                  <Disclosure.Button
                    as='a'
                    href='#'
                    className={
                      location.pathname === '/navbar/back'
                        ? currentStyleMobile
                        : defaultStyleMobile
                    }
                  >
                    Backend
                  </Disclosure.Button>
                </Link>

                <Link to='document'>
                  <Disclosure.Button
                    as='a'
                    href='#'
                    className={
                      location.pathname === '/navbar/document'
                        ? currentStyleMobile
                        : defaultStyleMobile
                    }
                  >
                    Documentation
                  </Disclosure.Button>
                </Link>

              </div>
              <div className='pt-4 pb-3 border-t border-gray-700'>
                <div className='flex items-center px-5'>
                  <div className='flex-shrink-0'>
                    <img
                      className='h-10 w-10 rounded-full'
                      src='../assets/img/icon-user.png'
                      alt=''
                    />
                  </div>
                  <div className='ml-3'>
                    <div className='text-base font-medium text-white'>
                      Yankun Song
                    </div>
                    <div className='text-sm font-medium text-gray-400'>
                      yankun@gmail.com
                    </div>
                  </div>
                  {/* <button
                  type="button"
                  className="ml-auto flex-shrink-0 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}
                </div>
                <div className='mt-3 px-2 space-y-1'>
                  {/* <Disclosure.Button
                  as="a"
                  href="#"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                >
                  Your Profile
                </Disclosure.Button> */}
                  <div onClick={() => setNewOpen(true)}>

                    <Disclosure.Button
                      as='a'
                      href='#'
                      className='block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'
                    >
                      New contract
                    </Disclosure.Button>

                  </div>
                  <div onClick={() => setJoinOpen(true)}>

                    <Disclosure.Button
                      as='a'
                      href='#'
                      className='block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'
                    >
                      Join contract
                    </Disclosure.Button>

                  </div>
                  <div onClick={() => setDetailsOpen(true)}>

                    <Disclosure.Button
                      as='a'
                      href='#'
                      className='block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'
                    >
                      Contract details
                    </Disclosure.Button>

                  </div>
                  <Disclosure.Button
                    as='a'
                    href='#'
                    className='block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'
                  >
                    Sign out
                  </Disclosure.Button>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Outlet />
    </>
  );
}
