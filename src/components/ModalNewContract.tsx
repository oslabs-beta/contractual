import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, SparklesIcon } from "@heroicons/react/outline";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { addContract } from "../state/features/contractSlice";
import { showNotification } from "../state/features/modalsSlice";

interface ModalProps {
  visibility: boolean;
  closeModal: () => void;
  setSelectedContract: (contract: EnumContractItem) => void;
  sendToken: (token: string) => void;
}
interface EnumContractItem {
  token: string;
  name: string;
}
const ModalNewContract: React.FC<ModalProps> = ({
  visibility,
  closeModal,
  setSelectedContract,
  sendToken,
}): JSX.Element => {
  const dispatch = useDispatch();
  const [contractName, setContractName] = useState("");
  const cancelButtonRef = useRef(null);
  const { userId } = useSelector((store: RootState) => store.contract);

  /** CREATE A NEW CONTRACT AND RECEIVE UNIQUE TOKEN */
  const createContract = (): void => {
    axios
      .post("http://localhost:4321/contract/add", {
        title: contractName,
        userId: userId,
      })
      .then((response) => {
        if (response.status === 200) {

          dispatch(
            addContract({
              name: contractName,
              token: response.data,
            })
          );
          setSelectedContract({ name: contractName, token: response.data });
          sendToken(response.data);
        } 
      })
      .catch((error) => {
        dispatch(showNotification(true));
        console.log(error);
      });
  };

  /** STOP MODAL FROM CLOSING IF CONTRACT NAME ALREADY EXISTS
   * INCOMPLETE
   */
  // const handleClickCreate = () => { }
  return (
    <Transition.Root show={visibility} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-[80] inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={closeModal}
      >
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
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
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
                  <SparklesIcon
                    className="h-6 w-6 text-green-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Add new data contract
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Choose a descriptive name for your new contract.
                    </p>
                    <p className="text-sm text-gray-500">
                      Contract name must be unique or it will not be created.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="mt-2">
                  <input
                    type="text"
                    name="newContractName"
                    id="newContractName"
                    value={contractName}
                    onChange={(e) => setContractName(e.target.value)}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder=""
                  />
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                  onClick={() => {
                    createContract();
                    closeModal();
                  }}
                >
                  Create
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
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
  );
};

export default ModalNewContract;
