function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function DocumentExport() {
  return (
    <div className=' sticky top-16 z-50 bg-gray-900 shadow-lg'>
      <div className='grid grid-cols-12 gap-1 px-3 py-3 grid-flow-col'>
        <div className='col-span-8'>
          <div>
            <label htmlFor='email' className='sr-only'>
              Filename
            </label>
            <input
              type='text'
              name='filename'
              id='filename'
              className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
              placeholder='Filename'
            />
          </div>
        </div>

        <div className='col-span-2'>
          <div>
            <select
              id='location'
              name='location'
              className='block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
              defaultValue='Canada'
            >
              <option>PDF</option>
              <option>TXT</option>
              <option>HTML</option>
            </select>
          </div>
        </div>

        <div className='col-span-2'>
          <button
            type='button'
            className='h-full w-full text-center items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
}
