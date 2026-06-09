import React, { useState } from 'react';
import { FLUTTER_CODEBASE, FlutterFile } from '../data/flutterCodebase';
import { Folder, FileCode, Copy, Check, Terminal, ExternalLink, Laptop, BookOpen, Download } from 'lucide-react';

export default function CodeExplorer() {
  const [selectedFile, setSelectedFile] = useState<FlutterFile>(FLUTTER_CODEBASE[0]);
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Expandable Tree categories
  const categories = [
    { name: 'Root Configuration', pathPrefix: '', files: FLUTTER_CODEBASE.filter(f => !f.path.includes('/')) },
    { name: 'Lib Entry', pathPrefix: 'lib/', files: FLUTTER_CODEBASE.filter(f => f.path === 'lib/main.dart') },
    { name: 'Utils (Themes & Constants)', pathPrefix: 'lib/utils/', files: FLUTTER_CODEBASE.filter(f => f.path.startsWith('lib/utils/')) },
    { name: 'Widgets (Reusable)', pathPrefix: 'lib/widgets/', files: FLUTTER_CODEBASE.filter(f => f.path.startsWith('lib/widgets/')) },
    { name: 'Models & Providers', pathPrefix: 'lib/models/', files: FLUTTER_CODEBASE.filter(f => f.path.startsWith('lib/models/') || f.path.startsWith('lib/providers/') || f.path.startsWith('lib/services/')) },
    { name: 'Screens (All 12 Views)', pathPrefix: 'lib/screens/', files: FLUTTER_CODEBASE.filter(f => f.path.startsWith('lib/screens/')) }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = () => {
    alert("Flutter project initialization ready! You can copy individual screens into your lib/ directory. Refer to the 'Installation' tab for step-by-step guidance on setting up google_fonts & flutter_animate.");
  };

  // Filtered files
  const filteredFiles = FLUTTER_CODEBASE.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.path.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row bg-[#0A0D14] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl h-[650px] w-full text-slate-100">
      
      {/* Sidebar: Folder structure explorer */}
      <div className="w-full lg:w-72 bg-[#0E121E] border-b lg:border-b-0 lg:border-r border-slate-850 flex flex-col shrink-0 h-[280px] lg:h-full">
        {/* Workspace header */}
        <div className="p-4 border-b border-indigo-900/20 bg-slate-900/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-mono font-bold tracking-tight text-slate-300">CAMPUS_CONNECT_WORKSPACE</span>
          </div>
          <span className="px-1.5 py-0.5 rounded bg-indigo-500/15 text-[8.5px] font-mono text-indigo-300 font-extrabold uppercase">Flutter M3</span>
        </div>

        {/* Quick Search inside Dart codebase */}
        <div className="p-3">
          <input 
            type="text" 
            placeholder="Search Flutter files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#07090F] text-xs px-3 py-2 rounded-lg border border-slate-800 text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50"
          />
        </div>

        {/* Scrollable Document Directory tree */}
        <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-3.5 custom-scrollbar select-none">
          {searchTerm ? (
            <div className="space-y-1 pt-1">
              <span className="px-2 text-[9px] font-mono text-slate-500 uppercase">Search results</span>
              {filteredFiles.map(file => (
                <button
                  key={file.path}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-mono transition-colors text-left ${selectedFile.path === file.path ? 'bg-indigo-500/10 text-[#22d3ee]' : 'text-slate-400 hover:bg-slate-900'}`}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <FileCode className="w-3.5 h-3.5 shrink-0 opacity-70" />
                    <span className="truncate">{file.name}</span>
                  </div>
                </button>
              ))}
              {filteredFiles.length === 0 && (
                <div className="p-3 text-[11px] font-mono text-slate-600 text-center">No matches found</div>
              )}
            </div>
          ) : (
            categories.map(cat => (
              <div key={cat.name} className="space-y-1">
                <div className="flex items-center gap-1.5 px-2 py-1 text-[9.5px] font-mono text-slate-400 font-black tracking-wider uppercase opacity-80">
                  <Folder className="w-3 h-3 text-indigo-500/80 saturate-150" />
                  <span>{cat.name}</span>
                </div>
                
                <div className="space-y-[2px] pl-3 border-l border-slate-900/80 ml-2.5">
                  {cat.files.map(file => (
                    <button
                      key={file.path}
                      onClick={() => setSelectedFile(file)}
                      className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md text-xs font-mono transition-all text-left ${selectedFile.path === file.path ? 'bg-indigo-500/10 text-[#22d3ee] font-semibold border-l-2 border-[#22d3ee] pl-1.5' : 'text-slate-400 hover:bg-slate-900/60'}`}
                    >
                      <div className="flex items-center gap-1.5 overflow-hidden">
                        <FileCode className="w-3.5 h-3.5 shrink-0 opacity-60" />
                        <span className="truncate text-[11px]">{file.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Editor Panel View: Code reader with copy options */}
      <div className="flex-1 flex flex-col bg-[#07090F] min-w-0">
        
        {/* Editor Tab header bar */}
        <div className="p-3 bg-[#0B0E14] border-b border-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <FileCode className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-mono font-bold tracking-tight text-white">{selectedFile.name}</span>
              <span className="text-[9px] font-mono text-slate-500 truncate">{selectedFile.path}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Direct Copy Trigger */}
            <button 
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-all text-slate-300 hover:text-white cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 text-[11px]">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Copy File</span>
                </>
              )}
            </button>

            <button 
              onClick={handleDownloadZip}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer hidden sm:block"
              title="Initialization Helper"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Code Content display */}
        <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed text-slate-300 custom-scrollbar relative">
          
          <pre className="flex">
            {/* Mocked line numbers sidebar */}
            <div className="text-slate-600 text-[11px] text-right pr-4 select-none border-r border-[#151b2a] mr-4 min-w-[32px] font-mono">
              {selectedFile.content.split('\n').map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            {/* Structured File String */}
            <code className="white-space-pre-wrap block text-[11.5px] font-mono tracking-normal text-slate-350 select-text overflow-x-auto">
              {selectedFile.content}
            </code>
          </pre>

        </div>

        {/* Console Footer */}
        <div className="p-2.5 bg-[#090C12] border-t border-slate-900 text-[10px] text-slate-500 font-mono flex items-center justify-between px-4">
          <span>Active Encoding: UTF-8</span>
          <span className="text-[#22d3ee]">Ready for Flutter Compiling (Material 3 • Null Safety)</span>
        </div>

      </div>

    </div>
  );
}
