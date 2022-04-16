import DocumentExport from '../components/DocumentExport';
import DocumentPreview from '../components/DocumentPreview';

export default function DocumentCreator() {
  return (
    <div className='bg-gray-900 h-screen'>
      <DocumentExport />
      <DocumentPreview />
    </div>
  );
}
