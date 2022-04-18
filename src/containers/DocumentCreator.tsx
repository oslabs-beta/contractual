import DocumentExport from '../components/DocumentExport';
import DocumentPreview from '../components/DocumentPreview';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';

export default function DocumentCreator() {
  const { currentContract } = useSelector((state: RootState) => state.contract);
  return (
    <div className='bg-gray-900 h-screen'>
      <DocumentExport />
      <DocumentPreview />
    </div>
  );
}
