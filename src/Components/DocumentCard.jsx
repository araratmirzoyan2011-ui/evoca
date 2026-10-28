import React from 'react';

export function DocumentCard({ title }) {
  const handleOpenPdf = () => {
    const emptyPdfContent = `%PDF-1.4
1 0 obj <</Type /Catalog /Pages 2 0 R>> endobj
2 0 obj <</Type /Pages /Kids [3 0 R] /Count 1>> endobj
3 0 obj <</Type /Page /Parent 2 0 R /MediaBox [0 0 612 792]>> endobj
xref
0 4
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
00000000115 00000 n 
trailer <</Size 4 /Root 1 0 R>>
startxref
190
%%EOF`;

    const blob = new Blob([emptyPdfContent], { type: 'application/pdf' });
    window.open(URL.createObjectURL(blob), '_blank');
  };

  return (
    <div
      onClick={handleOpenPdf}
      className="flex w-full items-center gap-4 px-3.5 py-3 bg-[#f5f3f7] hover:bg-[#eeeaf3] rounded-md transition-colors cursor-pointer"
    >
      <div className="shrink-0 text-[#7b22d4]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8"
        >
          <path d="M17 4H8.5A2.5 2.5 0 0 0 6 6.5v17A2.5 2.5 0 0 0 8.5 26H13" />
          <path d="M17 4l7 7v3" />
          <path d="M17 4v7h7" />
          <path d="M10 14h5" />
          <path d="M10 18h4" />
          <circle cx="21.5" cy="22.5" r="5.5" />
          <path d="M21.5 19.8v5.4" />
          <path d="M19.3 23.1l2.2 2.2 2.2-2.2" />
        </svg>
      </div>

      <h3 className="text-[#1a1a1a] font-bold text-[15px] leading-tight select-none">
        {title}
      </h3>
    </div>
  );
}