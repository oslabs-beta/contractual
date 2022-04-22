import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, PlusIcon } from '@heroicons/react/outline'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../state/store';
import { joinContract } from '../state/features/contractSlice';

interface ModalProps {
  visibility: boolean,
  closeModal: () => void
}

const ModalJoinContract: React.FC<ModalProps> = ({ visibility, closeModal }) => {
  const dispatch = useDispatch()
  const [contractName, setContractName] = useState('')
  const [contractToken, setContractToken] = useState('')
  // const [open, setOpen] = useState(true)

  const cancelButtonRef = useRef(null)
  const handleJoinContract = (): void => {
    axios
        .get(`http://localhost:4321/contract/?name=${contractName}&token=${contractToken}`)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            dispatch(joinContract({
              name: contractName,
              token: contractToken,
              contract: response.data.content
            }));
            // setSelectedContract({name: contractName, token: response.data});
          }
        })
        .catch((error) => {
          console.log(error);
        });
  };
  return (
    <Transition.Root show={visibility} as={Fragment} >
      <Dialog as="div" className="fixed z-[80] inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={closeModal}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <PlusIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Join existing data contract
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Provide contract name and token
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="mt-2">
                  <input
                    type="text"
                    name="contractName"
                    id="contractName"
                    value={contractName}
                    onChange={(e) => setContractName(e.target.value)}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Contract name"
                  />
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    name="contractToken"
                    id="contractToken"
                    value={contractToken}
                    onChange={(e) => setContractToken(e.target.value)}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Token"
                  />
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  onClick={() => {handleJoinContract(); closeModal()}}
                >
                  Join
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={closeModal}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ModalJoinContract;