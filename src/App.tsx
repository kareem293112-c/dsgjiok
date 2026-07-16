import { useEffect, useState } from 'react';
import { zipBase64 } from './zipData';

export default function App() {
  const [downloadUrl, setDownloadUrl] = useState<string>("");

  useEffect(() => {
    try {
      const binaryString = window.atob(zipBase64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'application/zip' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    } catch (e) {
      console.error("Failed to parse zip data", e);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center font-sans">
      <h1 className="text-3xl font-bold mb-4">Sada Al Arab Android Project</h1>
      <p className="mb-8 text-gray-400">Your Android Native project is ready to download.</p>
      {downloadUrl ? (
        <a 
          href={downloadUrl}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all"
          download="SadaAlArabAndroid.zip"
        >
          تحميل ملف ZIP
        </a>
      ) : (
        <p>جاري تجهيز الملف...</p>
      )}
    </div>
  );
}
