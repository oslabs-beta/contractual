import { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { showNotification } from '../state/features/modalsSlice';

interface modalNotificationProps {
  // className: string;
}

const modalNotification: React.FC<modalNotificationProps> = () => {
  const dispatch = useDispatch()
  const { modalNotification } = useSelector((store: RootState) => store.modals);

  const closeNotification = () => {
    dispatch(showNotification(false))
  }
  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="z-[99] fixed inset-0 top-[47px] flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
      >
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={modalNotification}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                  <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">
                      CONTRACT NAME IS NOT UNIQUE.
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      PLEASE TRY A DIFFERENT NAME
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex">
                    <button
                      className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={closeNotification}
                    >
                      <span className="sr-only">Close</span>
                      <XIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
};

export default modalNotification;
