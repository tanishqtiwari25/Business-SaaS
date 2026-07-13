import React, { useEffect, useState } from 'react';

const PremiumScanner = ({ onScanSuccess }) => {
  useEffect(() => {
    let rawBuffer = '';
    let timestampTracker = Date.now();

    const processKeystroke = (e) => {
      const distinctTime = Date.now();
      // Hardware laser scanning modules pipe strokes continuously under millisecond intervals
      if (distinctTime - timestampTracker > 40) {
        rawBuffer = '';
      }

      if (e.key === 'Enter') {
        if (rawBuffer.trim().length > 2) {
          onScanSuccess(rawBuffer.trim());
          rawBuffer = '';
        }
      } else {
        if (e.key !== 'Shift') rawBuffer += e.key;
      }
      timestampTracker = distinctTime;
    };

    window.addEventListener('keydown', processKeystroke);
    return () => window.removeEventListener('keydown', processKeystroke);
  }, [onScanSuccess]);

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-2xl text-white shadow-xl">
      <h3 className="text-lg font-bold tracking-wide">Enterprise Hardware Scanner Layer</h3>
      <p className="text-xs text-indigo-200 mt-1">Plug and Play desktop USB barcodes directly operational without camera layout requirements.</p>
      <div className="mt-4 flex items-center justify-center border-2 border-dashed border-indigo-300/40 rounded-xl py-6 bg-white/5 backdrop-blur-sm">
        <span className="text-sm font-semibold tracking-wider animate-pulse">📡 READY FOR BARCODE INGESTION</span>
      </div>
    </div>
  );
};

export default PremiumScanner;