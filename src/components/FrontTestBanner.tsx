/* This example requires Tailwind CSS v2.0+ */
import { useState } from "react";
import {
  SpeakerphoneIcon,
  XIcon,
  SwitchHorizontalIcon,
} from "@heroicons/react/outline";
const { shell } = require("electron");

const FrontTestBanner = () => {
  const [hidden, setHidden] = useState(false);
  return (
    <div className="fixed bottom-0 inset-x-0 pb-2 sm:pb-5" hidden={hidden}>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="p-2 rounded-lg bg-blue-600 shadow-lg sm:p-3">
          <div className="flex items-center justify-between flex-wrap">
            <div className="w-0 flex-1 flex items-center">
              <span className="flex p-2 rounded-lg bg-blue-700">
                <SwitchHorizontalIcon
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              </span>
              <p className="ml-3 font-medium text-white truncate">
                <span className="md:hidden">
                  <em>
                    Example: http://localhost:1234/&lt;your endpoint here&gt;
                  </em>
                </span>
                <span className="hidden md:inline">
                  Send requests to PORT 1234 &ensp;
                  <em>
                    Example: http://localhost:1234/&lt;your endpoint here&gt;
                  </em>
                </span>
              </p>
            </div>
            <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
              {/* <a
                // href="https://www.Google.com"
                // target="_blank"
                // to open new electron subwindow
                onClick={() => window.open("http://google.com", "_blank")}
                className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50"
              >
                Learn more
              </a> */}
              <button
                // to open new electron subwindow
                onClick={() => {
                  shell.openExternal("https://www.contractualapp.io/");
                }}
                className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50"
              >
                Learn more
              </button>
            </div>
            <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
              <button
                type="button"
                onClick={() => setHidden(true)}
                className="-mr-1 flex p-2 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-white"
              >
                <span className="sr-only">Dismiss</span>
                <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontTestBanner;
