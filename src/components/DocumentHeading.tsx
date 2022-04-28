import { useSelector } from "react-redux";
import { RootState } from '../state/store';

interface DocumentHeadingProps {

}

const DocumentHeading: React.FC<DocumentHeadingProps> = (): JSX.Element => {
  const { tokens, currentContractToken } = useSelector((store: RootState) => store.contract);

  let activeContract = '';
  for (let token in tokens) {
    if (tokens[token] === currentContractToken) activeContract = token
  }
  return (
    <div className="bg-white shadow overflow-hidden ">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{activeContract}</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Project description.</p>
      </div>
    </div>
  )
}

export default DocumentHeading;