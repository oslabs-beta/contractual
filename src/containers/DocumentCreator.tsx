import DocumentExport from "../components/DocumentExport";
import DocumentPreview from "../components/DocumentPreview";
// TEST
import DocumentHeading from "../components/DocumentHeading";
// TEST END
import { useState } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

import React from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const DocumentCreator = () => {
  const [fileName, setFileName] = useState('')
  const { currentContract } = useSelector((state: RootState) => state.contract);

  /** BUILD ARRAY OF REQUESTMETHOD AND ENPOINTS FOR CURRENT SELECTED CONTRACT */
  const getReqKeys = (contract) => {
    const reqs = [];
    for (let key in contract) {
      if (key.slice(0, 3) === "Req") {
        reqs.push(key);
      }
    }
    return reqs;
  };
  const reqKeys = getReqKeys(currentContract);
  // console.log(reqKeys);

  const printRef = React.useRef();

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${fileName}.pdf`);
  };

  return (
    <div className="bg-gray-900 h-screen">
      <DocumentExport 
      handleDownloadPdf={handleDownloadPdf}
      fileName={fileName} 
      setFileName={setFileName}
      />
      <div ref={printRef}>
        <DocumentHeading/>
        <DocumentPreview
          currentContract={currentContract}
          reqKeys={reqKeys}
        />
      </div>
    </div>
  );
};

export default DocumentCreator;
