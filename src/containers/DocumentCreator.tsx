import DocumentExport from '../components/DocumentExport';
import DocumentPreview from '../components/DocumentPreview';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';

const DocumentCreator = () => {
  const { currentContract } = useSelector((state: RootState) => state.contract);
  
  /** BUILD ARRAY OF REQUESTMETHOD AND ENPOINTS FOR CURRENT SELECTED CONTRACT */
  const getReqKeys = (contract) => {
    const reqs = [];
    for (let key in contract) {
      if (key.slice(0,3) === 'Req') {
        reqs.push(key);
      }
    }
    return reqs
  };
  const reqKeys = getReqKeys(currentContract);
  // console.log(reqKeys);
  return (
    <div className='bg-gray-900 h-screen'>
      <DocumentExport />
      <DocumentPreview currentContract={currentContract} reqKeys={reqKeys}/>
    </div>
  );
}

export default DocumentCreator;
