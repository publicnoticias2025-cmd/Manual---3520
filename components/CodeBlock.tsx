
import React, { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'bash' }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <div className="absolute right-2 top-2">
        <button
          onClick={copyToClipboard}
          className="bg-slate-700 hover:bg-slate-600 text-white text-xs px-2 py-1 rounded transition-colors"
        >
          {copied ? 'Copiado!' : 'Copiar'}
        </button>
      </div>
      <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm font-mono border border-slate-800 shadow-inner">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
