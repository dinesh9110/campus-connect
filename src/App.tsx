import React, { useState } from 'react';
import PhoneSimulator from './components/PhoneSimulator';
import CodeExplorer from './components/CodeExplorer';
import { 
  Sparkles, Terminal, Cpu, Smartphone, Layers, HardDrive, 
  HelpCircle, CheckCircle2, Copy, Check, BookOpen, ExternalLink,
  Laptop, Download, Activity, Key, Code, MessageSquare, Compass, 
  Bell, User, Settings as SettingsIcon, ShieldCheck
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'editor' | 'specs'>('editor');
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [activeScreenLabel, setActiveScreenLabel] = useState('Splash Screen');

  const copyCommand = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const handlePhoneRouteChanged = (screen: string) => {
    // Maps internal routes to pretty labels
    const routeLabels: Record<string, string> = {
      'splash': '1. Splash Screen & Logo Animation',
      'onboarding': '2. Onboarding Screen Core Carousel (3 sub-screens)',
      'login': '3. Login Gate with validations & SSO integrations',
      'signup': '4. Sign Up Screen & Secure Node Registry',
      'forgot': '5. Forgot PIN Security recovery',
      'otp': '6. OTP verification digits receiver',
      'home': '7-12. Interactive Dashboard (Tabs: Node Feed, Query, Messaging, Alerts, Configs, Persona)'
    };
    setActiveScreenLabel(routeLabels[screen] || screen);
  };

  return (
    <div className="min-h-screen bg-[#070A0F] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/35 selection:text-white">
      
      {/* Top Cybernetic Developer Showcase Navbar */}
      <header className="border-b border-slate-800/80 bg-[#0A0D14]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 flex items-center justify-center p-[1.5px] shadow-lg shadow-indigo-500/10">
              <div className="w-full h-full bg-[#0A0D14] rounded-[10px] flex items-center justify-center">
                <span className="text-lg font-black font-mono tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-300">C</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base font-black tracking-tight text-[#F8FAFC]">Campus Connect</h1>
                <span className="px-1.5 py-0.5 rounded bg-cyan-400/10 text-[9px] font-mono text-[#22D3EE] font-bold uppercase tracking-wider">Startup-Ready</span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono tracking-wide">Premium Cupertino-style Flutter UX Specification Suite</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a 
              href="https://pub.dev" 
              target="_blank" 
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono hover:text-[#22d3ee] hover:border-indigo-500/30 transition-all flex items-center gap-1.5 cursor-pointer text-slate-300"
            >
              <span>pub.dev approved</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Developer Framework Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        
        {/* Startup Pitch & Architectural Stat Badges */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-[#0F131E] border border-slate-800/80 flex flex-col gap-1 shadow-sm">
            <div className="flex items-center gap-2 text-indigo-400 mb-1">
              <Smartphone className="w-4 h-4" />
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Design Standard</span>
            </div>
            <span className="text-sm font-semibold text-white">Apple-level Aesthetics</span>
            <span className="text-[10.5px] text-slate-400 leading-normal">Cupertino Glassmorphism, cyber gradients, shadows</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0F131E] border border-slate-800/80 flex flex-col gap-1 shadow-sm">
            <div className="flex items-center gap-2 text-cyan-400 mb-1">
              <Layers className="w-4 h-4" />
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Architecture</span>
            </div>
            <span className="text-sm font-semibold text-white">Clean Architecture</span>
            <span className="text-[10.5px] text-slate-400 leading-normal">Modular screens, Providers state-management model</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0F131E] border border-slate-800/80 flex flex-col gap-1 shadow-sm">
            <div className="flex items-center gap-2 text-rose-400 mb-1">
              <Cpu className="w-4 h-4" />
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Code Completeness</span>
            </div>
            <span className="text-sm font-semibold text-white">100% Fully Formatted</span>
            <span className="text-[10.5px] text-slate-400 leading-normal">All 12 requested screens generated with Dart SDK</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0F131E] border border-slate-800/80 flex flex-col gap-1 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <HardDrive className="w-4 h-4" />
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Dependencies</span>
            </div>
            <span className="text-sm font-semibold text-white">Premium Packages</span>
            <span className="text-[10.5px] text-slate-400 leading-normal">google_fonts, flutter_animate, iconsax, smooth_page</span>
          </div>
        </section>

        {/* Content split Layout Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL: The Live Interactive Phone Simulator (5cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4 self-start">
            <div className="p-4 bg-[#0A0D14] border border-slate-800/50 rounded-2xl flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-indigo-400 animate-bounce" />
                <span className="text-xs font-mono font-bold uppercase tracking-tight text-indigo-200">Interactive Core Preview</span>
              </div>
              <span className="text-[10px] font-mono bg-indigo-505/15 text-[#22D3EE] px-2 py-0.5 rounded font-black">ACTIVE SIMULATOR</span>
            </div>

            {/* Simulated Smartphone Screen Widget */}
            <div className="p-1 bg-slate-900 border border-slate-800/80 rounded-[52px] shadow-2xl">
              <PhoneSimulator onRouteChanged={handlePhoneRouteChanged} />
            </div>

            {/* active route label indicators */}
            <div className="p-3.5 bg-slate-900/50 border border-slate-850 rounded-xl text-center">
              <span className="text-[10px] font-mono text-slate-500 uppercase block select-none">Current Simulator State</span>
              <span className="text-[12px] font-bold text-slate-200 block mt-1">{activeScreenLabel}</span>
            </div>
          </div>

          {/* RIGHT PANEL: Flutter Source Code workspace & setups (7cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* View selectors */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex gap-2">
                <button 
                  onClick={() => setActiveTab('editor')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === 'editor' ? 'bg-[#151B2E] text-[#22d3ee] border border-indigo-500/20' : 'text-slate-400 hover:text-white hover:bg-[#0E121E]'}`}
                >
                  <Code className="w-4 h-4" />
                  <span>Flutter IDE Directory</span>
                </button>
                <button 
                  onClick={() => setActiveTab('specs')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === 'specs' ? 'bg-[#151B2E] text-[#22d3ee] border border-indigo-500/20' : 'text-slate-400 hover:text-white hover:bg-[#0E121E]'}`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Integration Specs & Setup</span>
                </button>
              </div>

              <span className="text-[10px] font-mono text-slate-500 hidden sm:block">Production Codebase v1.0.0</span>
            </div>

            {/* Tab view containers */}
            {activeTab === 'editor' ? (
              <div className="space-y-4">
                <div className="p-3.5 bg-[#0D121F]/80 border border-indigo-950/30 rounded-2xl flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[12px] font-bold text-indigo-300">Ready for Flutter compiler</h4>
                    <p className="text-[11px] text-slate-450">These files conforms exactly to Null Safety, Provider architecture, and Material 3 design directives.</p>
                  </div>
                </div>

                <CodeExplorer />
              </div>
            ) : (
              <div className="p-6 bg-[#0E121E] border border-slate-800 rounded-3xl flex flex-col gap-6 text-xs text-slate-300">
                
                {/* Intro Spec Info */}
                <div>
                  <h3 className="text-base font-bold text-white mb-1.5 flex items-center gap-1.5">
                    <Laptop className="w-5 h-5 text-indigo-400" />
                    <span>Project Initialization</span>
                  </h3>
                  <p className="leading-relaxed">
                    To boot the Campus Connect application on your system, execute standard terminal initializations using Dart or Flutter SDK on stable channels.
                  </p>
                </div>

                {/* Command step */}
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-250 font-mono text-[11px] uppercase tracking-wider text-slate-400">Step 1: Spin up Flutter Workspace</h4>
                  <div className="p-4 bg-[#07090F] border border-slate-900 rounded-xl relative flex justify-between items-center group font-mono text-xs">
                    <code className="text-[#22d3ee] font-mono">flutter create campus_connect --org com.startup</code>
                    <button 
                      onClick={() => copyCommand('flutter create campus_connect --org com.startup')}
                      className="p-1 px-2.5 rounded bg-slate-900 border border-slate-800 text-[10px] hover:text-white flex items-center gap-1 cursor-pointer font-sans"
                    >
                      {copiedCmd ? <span className="text-emerald-400">Copied</span> : <span>Copy</span>}
                    </button>
                  </div>
                </div>

                {/* pub add step */}
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-250 font-mono text-[11px] uppercase tracking-wider text-slate-400 font-sans">Step 2: Install Premium Packages</h4>
                  <p className="leading-normal">Campus Connect utilizes verified packages to establish Cupertino-level smoothness, rich typography, page navigation indexes, and loading spinners:</p>
                  <div className="p-4 bg-[#07090F] border border-slate-900 rounded-xl flex justify-between items-center relative font-mono text-xs">
                    <code className="text-[#22d3ee] font-mono">flutter pub add google_fonts flutter_animate provider smooth_page_indicator animated_text_kit iconsax font_awesome_flutter lottie flutter_svg cached_network_image</code>
                    <button 
                      onClick={() => copyCommand('flutter pub add google_fonts flutter_animate provider smooth_page_indicator animated_text_kit iconsax font_awesome_flutter lottie flutter_svg cached_network_image')}
                      className="p-1 px-2.5 rounded bg-slate-900 border border-slate-800 text-[10px] hover:text-white flex items-center gap-1 cursor-pointer font-sans"
                    >
                      {copiedCmd ? <span className="text-emerald-400">Copied</span> : <span>Copy</span>}
                    </button>
                  </div>
                </div>

                {/* File structure validation specs */}
                <div className="space-y-2.5">
                  <h4 className="font-bold text-slate-250 font-mono text-[11px] uppercase tracking-wider text-slate-400 font-sans">Step 3: Transfer Files & Directory Alignment</h4>
                  <p className="leading-normal">Arrange your `/lib` directory structure exactly as displayed inside our Workspace Explorer: </p>
                  <ul className="space-y-2 pl-4 list-disc text-slate-400">
                    <li><code className="text-slate-300 font-mono">/lib/main.dart</code>: Serves as initial router, initializes dark Theme parameters, and boots Providers state management hooks.</li>
                    <li><code className="text-slate-300 font-mono">/lib/utils/app_colors.dart</code>: Contains brand color gradients like Cyber Indigos & hot pinks.</li>
                    <li><code className="text-slate-300 font-mono">/lib/screens/</code>: Contains separate files representing all 12 screen views, thoroughly coded with premium animation hooks.</li>
                    <li><code className="text-slate-300 font-mono">/lib/widgets/</code>: Hosts reusable widgets like glowing loaders (<code className="font-mono text-xs">AppLogo</code>, <code className="font-mono text-xs">LoadingWidget</code>), sleek inputs, and glassmorphic cards.</li>
                  </ul>
                </div>

                {/* Architecture & state models */}
                <div className="p-4 rounded-2xl bg-indigo-950/10 border border-indigo-950/30 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-indigo-300 text-[12px]">Decentralized State-Management Model</h5>
                    <p className="text-[11px] leading-relaxed text-slate-400 mt-1">
                      Our Dart source uses <code className="font-mono">provider</code> to drive authentic academic authentication parameters, mock telemetry checks, and dynamically updates dashboard profiles and alerts dispatches dynamically. No beginner boilerplate.
                    </p>
                  </div>
                </div>

              </div>
            )}

          </div>

        </section>

      </main>

      {/* Cybernetic Footer */}
      <footer className="border-t border-slate-900 bg-[#07090F] py-8 text-center text-xs text-slate-600 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>Campus Connect Simulator & Codebase • Designed with 100% stable Dart rules</span>
          <span className="text-indigo-500/80 uppercase">Secured academic environment workspace</span>
        </div>
      </footer>

    </div>
  );
}
