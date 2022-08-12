import React from 'react';
// Core viewer
import { Viewer } from '@react-pdf-viewer/core';
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { pdfjs } from "react-pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import "./index.less"

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default function Play() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className='play'>
      <Viewer
          fileUrl='https://cwiki.cn/downloads/%E5%B9%B4%E8%BD%AE/%E5%89%A7%E6%9C%AC/%E5%88%98%E4%BC%AF%E9%92%8A.PDF'
          plugins={[
              // Register plugins
              defaultLayoutPluginInstance,
          ]}
      />
    </div>
  );
}