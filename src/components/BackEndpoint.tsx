import axios from "axios";
import { useState } from "react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Combobox } from "@headlessui/react";
import { checkInput } from "../express/testing_server/controllers/contractOp";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { updateLog } from "../state/features/backLogSlice";

interface EnumEndpointItem {
  id: number;
  method: string;
  name: string;
}
// type Contracts = {
//   [key: string]: string;
// };
type KeyTypeValue = {
  reqKey: string;
  reqValType: string;
  // reqVal: string | number | boolean | any[];
  reqVal: string;
};
type BodyInputs = KeyTypeValue[];
// interface ContractEndpointProps {
//   reqMethod: string;
//   setReqMethod: (e: any) => void;
//   URLString: string;
//   setURLString: (e: any) => void;
//   reqInputs: BodyInputs;
//   setReqInputs: (index: string, e: Event) => void;
//   updateReqFields: (index: string, e: Event) => void;
//   // resetFields: () => void;
//   endpoints: EnumEndpointItem[];
//   currentContract: Contracts;
// }

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function BackEndpoint({
  reqMethod,
  setReqMethod,
  reqInputs,
  setReqInputs,
  updateReqFields,
  // resetFields,
  URLString,
  setURLString,
  endpoints,
  currentContract,
}) {
  const [query, setQuery] = useState("");
  const [selectedEndpoint, setSelectedEndpoint] = useState<EnumEndpointItem>();
  // const [responses, updateResponses] = useState([]);
  const currentLog = useSelector((store: RootState) => store.backLog);
  const dispatch = useDispatch();

  /** SEARCH FILTER FOR ENDPOINT INPUT FIELD */
  const filteredEndpoints =
    query === ""
      ? endpoints
      : endpoints.filter((endpoint: EnumEndpointItem) => {
          return endpoint.name.toLowerCase().includes(query.toLowerCase());
        });

  const sendRequest = (
    URLString: string,
    reqMethod: string,
    endpoint: EnumEndpointItem,
    reqInputs: BodyInputs
  ): void => {
    const reqBody = {};
    const condition = `Res@${reqMethod}@${endpoint.name}`; //endpoint is entire url string

    reqInputs.forEach((input) => {
      //PARSE NON STRINGS?
      let nonString;
      if (input.reqValType !== "string") {
        if (input.reqValType === "boolean") {
          if (input.reqVal === "true") {
            nonString = true;
          } else nonString = false;
        } else if (input.reqValType === "number")
          nonString = Number(input.reqVal);
        else if (input.reqValType === "array-any-any")
          nonString = JSON.parse(input.reqVal);

        reqBody[input.reqKey] = nonString;
      } else reqBody[input.reqKey] = input.reqVal;
      // reqBody[input.reqKey] = input.reqVal
    });
    // perform ajax request passing in built request body from above
    // use template literals to send to right endpoints
    // need to perform data contract check
    function checkResponse(response, contract, condition) {
      const report = checkInput(response, contract, condition);
      return report;
    }

    // function getTime() {
    //   const today = new Date();
    //   const date = today.getMonth() + 1 + "/" + today.getDate();
    //   const time =
    //     today.getHours() +
    //     ":" +
    //     today.getMinutes() +
    //     ":" +
    //     String(today.getSeconds()).padStart(2, "0");
    //   return time + " [" + date + "]";
    // }
    function getTime() {
      const today = new Date();
      const date = today.getMonth() + 1 + "/" + today.getDate();
      const time =
        String(today.getHours()).padStart(2, "0") +
        ":" +
        String(today.getMinutes()).padStart(2, "0") +
        ":" +
        String(today.getSeconds()).padStart(2, "0");
      return time + " [" + date + "]";
    }

    if (reqMethod === "GET") {
      axios
        .get(URLString + endpoint.name)
        .then((response) => {
          const report = checkResponse(
            response.data,
            currentContract,
            condition
          );
          report.endpoint = endpoint.name;
          report.method = reqMethod;
          report.time = getTime();
          dispatch(updateLog(report));
        })
        .catch((error) => {
          dispatch(
            updateLog({
              endpoint: endpoint.name,
              error: ["Request failure"],
              method: reqMethod,
              pass: false,
              time: getTime(),
            })
          );
        });
    } else if (reqMethod === "POST") {
      axios
        .post(URLString + endpoint.name, reqBody)
        .then((response) => {
          const report = checkResponse(
            response.data,
            currentContract,
            condition
          );
          report.endpoint = endpoint.name;
          report.method = reqMethod;
          report.time = getTime();
          dispatch(updateLog(report));
        })
        .catch((error) => {
          dispatch(
            updateLog({
              endpoint: endpoint.name,
              error: ["Request failure"],
              method: reqMethod,
              pass: false,
              time: getTime(),
            })
          );
        });
    } else if (reqMethod === "PUT") {
      axios
        .put(URLString + endpoint.name, reqBody)
        .then((response) => {
          const report = checkResponse(
            response.data,
            currentContract,
            condition
          );
          report.endpoint = endpoint.name;
          report.method = reqMethod;
          report.time = getTime();
          dispatch(updateLog(report));
        })
        .catch((error) => {
          dispatch(
            updateLog({
              endpoint: endpoint.name,
              error: ["Request failure"],
              method: reqMethod,
              pass: false,
              time: getTime(),
            })
          );
        });
    } else if (reqMethod === "PATCH") {
      axios
        .patch(URLString + endpoint.name, reqBody)
        .then((response) => {
          const report = checkResponse(
            response.data,
            currentContract,
            condition
          );
          report.endpoint = endpoint.name;
          report.method = reqMethod;
          report.time = getTime();
          dispatch(updateLog(report));
        })
        .catch((error) => {
          dispatch(
            updateLog({
              endpoint: endpoint.name,
              error: ["Request failure"],
              method: reqMethod,
              pass: false,
              time: getTime(),
            })
          );
        });
    } else if (reqMethod === "DELETE") {
      axios
        .delete(URLString + endpoint.name, reqBody)
        .then((response) => {
          const report = checkResponse(
            response.data,
            currentContract,
            condition
          );
          report.endpoint = endpoint.name;
          report.method = reqMethod;
          report.time = getTime();
          dispatch(updateLog(report));
        })
        .catch((error) => {
          dispatch(
            updateLog({
              endpoint: endpoint.name,
              error: ["Request failure"],
              method: reqMethod,
              pass: false,
              time: getTime(),
            })
          );
        });
    }
    //Reset form fields
  };
  // add new button to reset fields
  // resetFields()
  return (
    <div className="sticky top-16 z-50 bg-gray-900 shadow-lg">
      <div className="grid grid-cols-12 gap-1 px-3 py-3">
        <div className="col-span-3 sm:col-span-2">
          <div>
            <div
              id="reqMethod"
              className="bg-transparent text-indigo-500 border border-indigo-500 block mt-1 h-[42px] sm:h-[38px] px-3 py-[0.6rem] sm:py-[0.5rem] rounded-md text-center text-sm font-medium"
            >
              {reqMethod}
            </div>
          </div>
        </div>
        <div className="col-span-5 sm:col-span-3">
          <div>
            <div className="mt-1">
              <input
                type="text"
                name="domain"
                id="domain"
                value={URLString}
                onChange={(e) => setURLString(e)}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="https://domain"
              />
            </div>
          </div>
        </div>

        <div className="col-span-4 sm:col-span-4">
          <Combobox
            as="div"
            value={selectedEndpoint}
            onChange={(endpoint) => {
              setSelectedEndpoint(endpoint);
              setReqMethod(endpoint.method.toUpperCase());
              updateReqFields(
                `Req@${endpoint.method.toUpperCase()}@${endpoint.name}`
              );
            }}
          >
            <div className="relative mt-1">
              <Combobox.Input
                className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Endpoint"
                displayValue={(endpoint: EnumEndpointItem) => endpoint.name}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>

              {filteredEndpoints.length > 0 && (
                <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredEndpoints.map((endpoint) => (
                    <Combobox.Option
                      key={endpoint.id}
                      value={endpoint}
                      className={({ active }) =>
                        classNames(
                          "relative cursor-default select-none py-2 pl-3 pr-9",
                          active ? "bg-indigo-600 text-white" : "text-gray-900"
                        )
                      }
                    >
                      {({ active, selected }) => (
                        <>
                          <span
                            className={classNames(
                              "block truncate",
                              selected && "font-semibold"
                            )}
                          >
                            {endpoint.method + " " + endpoint.name}
                          </span>

                          {selected && (
                            <span
                              className={classNames(
                                "absolute inset-y-0 right-0 flex items-center pr-4",
                                active ? "text-white" : "text-indigo-600"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
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
        <div className="col-span-12 sm:col-span-3">
          <button
            type="button"
            className="items-center text-center h-[38px] w-full mt-1 px-2.5 py-1.5 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900"
            onClick={() => {
              sendRequest(URLString, reqMethod, selectedEndpoint, reqInputs);
            }}
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
}
