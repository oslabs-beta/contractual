function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
interface ExportProps {
  handleDownloadPdf: () => void;
  fileName: string;
  setFileName: (input: string) => void;
}
const DocumentExport: React.FC<ExportProps> = ({
  handleDownloadPdf,
  fileName,
  setFileName,
}): JSX.Element => {
  return (
    <div className="sticky top-16 z-50 bg-gray-900 shadow-lg">
      <div className="grid grid-cols-12 gap-1 px-3 py-3">
        <div className="col-span-12 sm:col-span-9">
          <div>
            <label htmlFor="filename" className="sr-only">
              Filename
            </label>
            <input
              type="text"
              name="filename"
              id="filename"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="shadow-sm placeholder-green-500 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-blue-500 bg-gray-800 text-gray-50 rounded-md"
              placeholder="Filename"
            />
          </div>
        </div>

        {/* <div className="col-span-8 sm:col-span-2">
          <div>
            <select
              id="location"
              name="location"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              defaultValue="Canada"
            >
              <option>PDF</option>
              <option>TXT</option>
              <option>HTML</option>
            </select>
          </div>
        </div> */}

        <div className="col-span-4 sm:col-span-3">
          <button
            type="button"
            onClick={handleDownloadPdf}
            className="h-full w-full text-center items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900"
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentExport;
