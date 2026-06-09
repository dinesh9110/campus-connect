import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, Layers, Compass, MessageSquare, Bell, Settings as SettingsIcon, 
  User, LogOut, ArrowLeft, Mail, Lock, Eye, EyeOff, CheckSquare, 
  Square, Search, Award, Zap, Briefcase, Send, Key, Sparkles, 
  Trash2, Hourglass, Activity, ShieldCheck, HelpCircle, Laptop,
  Flame, Globe, BadgeAlert, CheckCircle2, ChevronRight
} from 'lucide-react';

// Import Firebase Comms
import { auth, db, handleFirestoreError, OperationType } from '../firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot 
} from 'firebase/firestore';

// Type aliases for current system routing state
type ScreenRoute = 'splash' | 'onboarding' | 'login' | 'signup' | 'forgot' | 'otp' | 'home';
type HomeSubTab = 'dashboard' | 'search' | 'chat' | 'notifications' | 'settings' | 'profile';

interface PhoneSimulatorProps {
  onRouteChanged?: (route: string) => void;
}

export default function PhoneSimulator({ onRouteChanged }: PhoneSimulatorProps) {
  // Navigation State
  const [route, setRoute] = useState<ScreenRoute>('splash');
  const [subTab, setSubTab] = useState<HomeSubTab>('dashboard');
  
  // App Theme/State Simulators
  const [userProfile, setUserProfile] = useState({
    fullName: 'Alex Rivera',
    email: 'alex.rivera44@campus.edu',
    department: 'Computer Science & Design',
    classOf: '2027',
    connections: 342,
    opportunities: 18,
    projects: 7,
    skills: ['Flutter • Dart', 'Python', 'UI/UX Design', 'Machine Learning', 'Product Strategy'],
    achievements: [
      '🏆 Primary Winner - HackMit 2026',
      '💡 Lead Developer - Smart Campus IoT Guild',
      '🌟 Top Student Innovator Award'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  });

  const [signupPendingPayload, setSignupPendingPayload] = useState<any>(null);

  // Splash timeout
  useEffect(() => {
    if (route === 'splash') {
      const timer = setTimeout(() => {
        navigateTo('onboarding');
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [route]);

  // Firebase Auth Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserProfile(docSnap.data() as any);
          } else {
            const fallbackProfile = {
              fullName: user.displayName || 'Alex Rivera',
              email: user.email || 'alex.rivera44@campus.edu',
              department: 'Computer Science & Design',
              classOf: '2027',
              connections: 342,
              opportunities: 18,
              projects: 7,
              skills: ['Flutter • Dart', 'Python', 'UI/UX Design', 'Machine Learning', 'Product Strategy'],
              achievements: [
                '🏆 Primary Winner - HackMit 2026',
                '💡 Lead Developer - Smart Campus IoT Guild',
                '🌟 Top Student Innovator Award'
              ],
              avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
            };
            await setDoc(docRef, fallbackProfile);
            setUserProfile(fallbackProfile);
          }
          navigateTo('home');
          setSubTab('dashboard');
        } catch (err) {
          console.error("Error establishing authenticated user details:", err);
        }
      } else {
        // Redirection boundary
        setRoute(prev => (prev === 'home' ? 'login' : prev));
      }
    });
    return () => unsubscribe();
  }, []);

  // Listen for real-time Messages from Firestore
  useEffect(() => {
    if (route === 'home' && subTab === 'chat') {
      const q = query(collection(db, 'messages'), orderBy('createdAt', 'asc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const msgs = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            text: data.text,
            isMe: data.senderEmail === auth.currentUser?.email,
            time: 'Just now', // Standard dynamic display
            senderName: data.senderName
          };
        });
        if (msgs.length > 0) {
          setChatMessages(msgs);
        }
      }, (error) => {
        handleFirestoreError(error, OperationType.GET, 'messages');
      });
      return () => unsubscribe();
    }
  }, [route, subTab]);

  // Listen for real-time Notifications from Firestore
  useEffect(() => {
    if (route === 'home' && auth.currentUser) {
      const q = query(collection(db, 'notifications'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const notifs = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            desc: data.desc,
            category: data.category,
            isNew: data.isNew,
            time: data.time || '1 min ago',
            userId: data.userId
          };
        }).filter(n => n.userId === auth.currentUser?.uid);
        
        if (notifs.length > 0) {
          setNotifications(notifs);
        }
      }, (error) => {
        handleFirestoreError(error, OperationType.GET, 'notifications');
      });
      return () => unsubscribe();
    }
  }, [route]);

  const navigateTo = (newRoute: ScreenRoute) => {
    setRoute(newRoute);
    if (onRouteChanged) onRouteChanged(newRoute);
  };

  // 1. Splash Screen States
  // (Autoplay/Transition handled by hook above)

  // 2. Onboarding states
  const [onboardIndex, setOnboardIndex] = useState(0);
  const onboardData = [
    {
      title: "Connect with Students",
      desc: "Break down campus walls. Sync up with intelligent classmates, share workspace resources, and run collaborative peer guilds.",
      img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Find Opportunities",
      desc: "Unlock premium hackathons, research labs, career fairs, and direct internships curated exclusively for your institution.",
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Build Your Career",
      desc: "Amplify your reputation. Store verifiable skill logs, win career awards, and land interviews with tech-focused startups instantly.",
      img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=500&q=80"
    }
  ];

  // 3. Login States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginEye, setLoginEye] = useState(false);
  const [loginRemember, setLoginRemember] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.includes('@') || !loginEmail.endsWith('.edu')) {
      setLoginError('Academic account identification must end in .edu');
      return;
    }
    if (loginPass.length < 6) {
      setLoginError('Security pin passphrase must exceed 5 digits');
      return;
    }
    setLoginError('');
    setIsAuthenticating(true);
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPass);
      setIsAuthenticating(false);
    } catch (err: any) {
      setIsAuthenticating(false);
      setLoginError(err.message || 'Authentication failed. Please verify credentials.');
    }
  };

  // 4. Signup States
  const [joinName, setJoinName] = useState('');
  const [joinEmail, setJoinEmail] = useState('');
  const [joinPass, setJoinPass] = useState('');
  const [joinConfirm, setJoinConfirm] = useState('');
  const [joinTerms, setJoinTerms] = useState(true);
  const [signupError, setSignupError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinName.split(' ')[1]) {
      setSignupError('Provide both legitimate first and last name identifiers');
      return;
    }
    if (!joinEmail.includes('@') || !joinEmail.endsWith('.edu')) {
      setSignupError('Institutional email validation is required (.edu extension)');
      return;
    }
    if (joinPass.length < 6) {
      setSignupError('Pin parameters require at least 6 tokens');
      return;
    }
    if (joinPass !== joinConfirm) {
      setSignupError('Private keys mismatches during confirmation checksum');
      return;
    }
    if (!joinTerms) {
      setSignupError('Institutional terms of network connection are mandatory');
      return;
    }
    setSignupError('');
    setIsRegistering(true);
    setTimeout(() => {
      setIsRegistering(false);
      setSignupPendingPayload({ joinEmail, joinPass, joinName });
      navigateTo('otp');
    }, 800);
  };

  // 5. Forgot PIN States
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.includes('@') || !forgotEmail.endsWith('.edu')) {
      alert('Academic account identification required');
      return;
    }
    setForgotLoading(true);
    try {
      await sendPasswordResetEmail(auth, forgotEmail);
      setForgotLoading(false);
      setForgotSent(true);
    } catch (err: any) {
      setForgotLoading(false);
      alert(err.message || 'Error occurred while sending password reset email.');
    }
  };

  // 6. OTP parameters
  const [otpVal, setOtpVal] = useState(['', '', '', '']);
  const otpInputs = useRef<HTMLInputElement[]>([]);
  const [otpCount, setOtpCount] = useState(59);
  const [otpVerifying, setOtpVerifying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (route === 'otp' && otpCount > 0) {
      interval = setInterval(() => {
        setOtpCount(c => c - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [route, otpCount]);

  const handleOtpInput = (index: number, val: string) => {
    if (val.length > 1) return;
    const clone = [...otpVal];
    clone[index] = val;
    setOtpVal(clone);

    if (val && index < 3) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  const handleOtpVerify = async () => {
    const code = otpVal.join('');
    if (code !== '1234') {
      alert('Verification node code handshake failed! Correct mock PIN is: 1234');
      return;
    }
    setOtpVerifying(true);
    try {
      if (signupPendingPayload) {
        const { joinEmail, joinPass, joinName } = signupPendingPayload;
        const userCredential = await createUserWithEmailAndPassword(auth, joinEmail, joinPass);
        const user = userCredential.user;
        
        // Save user profile profile info in Firestore
        const newProfile = {
          fullName: joinName,
          email: joinEmail,
          department: 'Computer Science & Design',
          classOf: '2027',
          connections: 342,
          opportunities: 18,
          projects: 7,
          skills: ['Flutter • Dart', 'Python', 'UI/UX Design', 'Machine Learning', 'Product Strategy'],
          achievements: [
            '🏆 Primary Winner - HackMit 2026',
            '💡 Lead Developer - Smart Campus IoT Guild',
            '🌟 Top Student Innovator Award'
          ],
          avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80'
        };
        await setDoc(doc(db, 'users', user.uid), newProfile);
        
        // Seed default notifications
        const seedNotifs = [
          {
            title: 'Direct message from Prof. Thorne',
            desc: 'Core neural nets checkouts looks clean. Check sandbox files.',
            category: 'Academic',
            isNew: true,
            userId: user.uid,
            time: '2 mins ago'
          },
          {
            title: 'Google Career Synchronizer',
            desc: 'Matching skills parameter identified! Priority session open.',
            category: 'Nexus Match',
            isNew: true,
            userId: user.uid,
            time: '1 hour ago'
          },
          {
            title: 'Campus Hackathon Gold Medal',
            desc: 'Congrats Alex! Your smart campus lock is voted #1 project.',
            category: 'HackAward',
            isNew: false,
            userId: user.uid,
            time: '1 day ago'
          }
        ];
        for (const notif of seedNotifs) {
          const newDocRef = doc(collection(db, 'notifications'));
          await setDoc(newDocRef, notif);
        }

        setUserProfile(newProfile);
      }
      setOtpVerifying(false);
      navigateTo('home');
      setSubTab('dashboard');
    } catch (err: any) {
      setOtpVerifying(false);
      setSignupError(err.message || 'Error occurred during registration handshake.');
      navigateTo('signup');
    }
  };

  // 7. Dashboard Feed data
  const feedItems = [
    {
      id: 1,
      type: 'hackathon',
      title: 'Quantum Synergy HackMit 2026',
      meta: 'REGISTRATIONS ACTIVE • HIGH COMPUTE PRIORITY',
      desc: 'Form up in sandbox categories instantly. Shared host workspace nodes up to $10,000.',
      glow: 'indigo'
    },
    {
      id: 2,
      type: 'guild',
      title: 'Decentralized IoT Node Guild',
      meta: 'CAMPUS PROJECTS • LAB 41B',
      desc: 'Connecting smart locks and telemetry units on university core mesh nets.',
      glow: 'cyan'
    }
  ];

  // 8. Notifications list
  const [notifications, setNotifications] = useState([
    {
      id: 'n_1',
      title: 'Direct message from Prof. Thorne',
      time: '2 mins ago',
      desc: 'Core neural nets checkouts looks clean. Check sandbox files.',
      category: 'Academic',
      isNew: true
    },
    {
      id: 'n_2',
      title: 'Google Career Synchronizer',
      time: '1 hour ago',
      desc: 'Matching skills parameter identified! Priority session open.',
      category: 'Nexus Match',
      isNew: true
    },
    {
      id: 'n_3',
      title: 'Campus Hackathon Gold Medal',
      time: '1 day ago',
      desc: 'Congrats Alex! Your smart campus lock is voted #1 project.',
      category: 'HackAward',
      isNew: false
    }
  ]);

  // 10. Search Query State
  const [searchTxt, setSearchTxt] = useState('');
  const [searchSearching, setSearchSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const mockDatabase = [
    '🌐 Web3 Social Guild - S-Quad Labs. Meets Thursday 8PM.',
    '🤖 Autonomous Drone IoT - Engineering building. Hiring aids.',
    '🎒 Flutter Guild Core - Connect node Alex Rivera.',
    '🧬 Computational Genomics Bio-Sprinters.'
  ];

  const handleSearchTxt = (val: string) => {
    setSearchTxt(val);
    if (!val) {
      setSearchResults([]);
      return;
    }
    setSearchSearching(true);
    const filter = mockDatabase.filter(item => item.toLowerCase().includes(val.toLowerCase()));
    setTimeout(() => {
      setSearchResults(filter);
      setSearchSearching(false);
    }, 450);
  };

  // 11. Chat message engine
  const [chatInputs, setChatInputs] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { text: 'Alex! Is the secure Flutter applet checked in?', isMe: false, time: '09:42' },
    { text: '100%! Custom states and premium glassmorphic widgets are validated.', isMe: true, time: '09:44' },
    { text: 'Awesome. We will present during academic laboratory project review.', isMe: false, time: '09:45' }
  ]);

  const handleSendMessage = async () => {
    if (!chatInputs.trim()) return;
    const textToSend = chatInputs;
    setChatInputs('');

    try {
      if (auth.currentUser) {
        await addDoc(collection(db, 'messages'), {
          text: textToSend,
          senderEmail: auth.currentUser.email,
          senderName: userProfile.fullName,
          createdAt: { seconds: Math.floor(Date.now() / 1000) }
        });
      } else {
        const me = { text: textToSend, isMe: true, time: 'Just now' };
        setChatMessages(prev => [...prev, me]);
        setTimeout(() => {
          setChatMessages(prev => [
            ...prev,
            { text: 'Response handshake acknowledged! Parameters updated inside node database.', isMe: false, time: 'Just now' }
          ]);
        }, 1500);
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'messages');
    }
  };

  // 12. Settings toggles
  const [settDark, setSettDark] = useState(true);
  const [settNotif, setSettNotif] = useState(true);
  const [settStealth, setSettStealth] = useState(false);

  // Time mock for dynamic clock
  const [currentTime, setCurrentTime] = useState('09:41');
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const hrs = d.getUTCHours().toString().padStart(2, '0');
      const mns = d.getUTCMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hrs}:${mns}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-6 w-full max-w-md mx-auto relative select-none">
      
      {/* Decorative Outer ambient glowing spheres */}
      <div className="absolute top-1/4 -left-12 w-52 h-52 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-12 w-52 h-52 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Modern iPhone 15 Pro Frame */}
      <div 
        id="phone_container"
        className="w-[360px] h-[740px] bg-[#090C12] border-[8px] border-slate-800 rounded-[48px] shadow-2xl overflow-hidden relative flex flex-col border-opacity-90 outline outline-2 outline-slate-700/50"
      >
        
        {/* Apple Dynamic Island */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 flex items-center justify-between px-3">
          <div className="w-2.5 h-2.5 bg-[#090D16] rounded-full border border-slate-900" />
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <div className="text-[9px] text-[#22d3ee] font-mono tracking-tight font-bold scale-95 uppercase">Node OK</div>
          </div>
        </div>

        {/* Dynamic iOS Status Bar */}
        <div className="h-10 px-5 pt-3.5 flex items-center justify-between text-white text-xs z-40 select-none">
          <span className="font-semibold text-[11px] tracking-tight">{currentTime} UTC</span>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-300">
            <span className="scale-[0.8] tracking-wider text-[#22d3ee]">5G</span>
            <Activity className="w-3 h-3 text-[#22d3ee]" />
            <div className="w-5 h-2.5 border border-slate-400 rounded-sm p-[0.5px] flex items-center bg-slate-800/50">
              <div className="h-full w-[85%] bg-emerald-400 rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* Central interactive screen content viewport */}
        <div className="flex-1 overflow-y-auto px-5 relative h-full flex flex-col pb-6">
          <AnimatePresence mode="wait">
            
            {/* 1. Splash Screen */}
            {route === 'splash' && (
              <motion.div 
                key="splash_view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[#0B0E14] flex flex-col items-center justify-between py-16 z-30"
              >
                {/* Glowing Core Radial Backdrop */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

                <div className="flex-grow flex flex-col items-center justify-center">
                  {/* Cyberpunk logo animation simulation */}
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        "0 0 15px rgba(99,102,241,0.2)",
                        "0 0 30px rgba(99,102,241,0.4)",
                        "0 0 15px rgba(99,102,241,0.2)"
                      ]
                    }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="w-24 h-24 rounded-2xl bg-slate-900 border-2 border-indigo-500/50 flex flex-col items-center justify-center relative overflow-hidden"
                  >
                    {/* Matrix Digital Lines */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0.35)_1px,transparent_1px)] bg-[size:100%_4px]" />
                    <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#0B0E14]/90" />
                    
                    <span className="text-4xl font-extrabold font-mono text-white tracking-widest drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]">C</span>
                  </motion.div>

                  <h1 className="text-2xl font-black text-slate-100 tracking-tight mt-6 font-display font-sans">
                    Campus Connect
                  </h1>
                  <p className="text-xs text-[#22d3ee] uppercase tracking-widest font-mono mt-1 w-full text-center">
                    Connecting Students • Building Careers
                  </p>
                </div>

                <div className="flex flex-col items-center gap-1.5 opacity-80">
                  <div className="w-5 h-5 border-2 border-[#22d3ee] border-t-transparent rounded-full animate-spin" />
                  <span className="text-[9px] font-mono tracking-widest text-slate-400">CONNECTING TO ACADEMIC MESH...</span>
                </div>
              </motion.div>
            )}

            {/* 2. Onboarding Screens */}
            {route === 'onboarding' && (
              <motion.div 
                key="onboard_view"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="absolute inset-0 bg-[#0B0E14] flex flex-col justify-between p-6 z-20"
              >
                <div className="flex items-center justify-between text-xs mt-3">
                  <span className="text-indigo-400 font-bold uppercase tracking-wider">Campus Connect</span>
                  <button 
                    onClick={() => navigateTo('login')}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Skip
                  </button>
                </div>

                {/* Cover Image glassmorphic mockup */}
                <div className="flex-grow flex flex-col items-center justify-center my-6">
                  <motion.div 
                    key={onboardIndex}
                    initial={{ scale: 0.92, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full h-56 rounded-3xl overflow-hidden border border-slate-700/30 relative shadow-lg shadow-black/40"
                  >
                    <img 
                      src={onboardData[onboardIndex].img} 
                      alt="onboard" 
                      className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.05]" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-transparent to-transparent" />
                  </motion.div>

                  <motion.h2 
                    key={`title_${onboardIndex}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-xl font-bold font-display text-white mt-6 text-center tracking-tight"
                  >
                    {onboardData[onboardIndex].title}
                  </motion.h2>

                  <motion.p 
                    key={`desc_${onboardIndex}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-xs text-slate-400 text-center leading-relaxed mt-2.5 px-4"
                  >
                    {onboardData[onboardIndex].desc}
                  </motion.p>
                </div>

                {/* Progress Indicators and Button */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex gap-2">
                    {onboardData.map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-1.5 rounded-full transition-all duration-300 ${onboardIndex === i ? 'w-6 bg-[#22d3ee]' : 'w-1.5 bg-slate-700'}`} 
                      />
                    ))}
                  </div>

                  <button 
                    onClick={() => {
                      if (onboardIndex < onboardData.length - 1) {
                        setOnboardIndex(onboardIndex + 1);
                      } else {
                        navigateTo('login');
                      }
                    }}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold text-xs transition-all shadow-lg shadow-indigo-500/30 flex items-center gap-1"
                  >
                    {onboardIndex === onboardData.length - 1 ? 'Get Started' : 'Next'}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* 3. Login Screen */}
            {route === 'login' && (
              <motion.div 
                key="login_view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-5 pt-8 w-full"
              >
                <div className="text-center">
                  <div className="inline-block p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-2">
                    <Cpu className="w-8 h-8 text-indigo-400" />
                  </div>
                  <h2 className="text-xl font-extrabold text-[#F8FAFC] tracking-tight">Welcome Back</h2>
                  <p className="text-xs text-slate-400 mt-1">Ready to boot into your campus sandbox?</p>
                </div>

                {loginError && (
                  <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-[11px] font-medium text-center">
                    {loginError}
                  </div>
                )}

                {/* Glassmorphic Auth Card */}
                <form onSubmit={handleLogin} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md flex flex-col gap-4 shadow-xl">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-400 tracking-wider">ACADEMIC EMAIL</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input 
                        type="email" 
                        placeholder="alex.rivera44@campus.edu"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="w-full bg-slate-950/80 text-white text-xs pl-10 pr-3 py-3.5 rounded-xl border border-slate-800/80 focus:border-indigo-500 focus:outline-none transition-all placeholder:text-slate-600"
                        required 
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold text-slate-400 tracking-wider">SECURITY SECRET</label>
                      <button 
                        type="button" 
                        onClick={() => navigateTo('forgot')}
                        className="text-[10px] font-medium text-[#22d3ee] hover:underline"
                      >
                        Forgot PIN?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input 
                        type={loginEye ? 'text' : 'password'} 
                        placeholder="•••••••• (mock: any 6 chars)"
                        value={loginPass}
                        onChange={(e) => setLoginPass(e.target.value)}
                        className="w-full bg-slate-950/80 text-white text-xs pl-10 pr-10 py-3.5 rounded-xl border border-slate-800/80 focus:border-indigo-500 focus:outline-none transition-all placeholder:text-slate-600"
                        required 
                      />
                      <button 
                        type="button"
                        onClick={() => setLoginEye(!loginEye)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                      >
                        {loginEye ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Checkbox */}
                  <div className="flex items-center gap-2 mt-1 cursor-pointer" onClick={() => setLoginRemember(!loginRemember)}>
                    {loginRemember ? (
                      <CheckSquare className="w-4 h-4 text-indigo-400" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-600" />
                    )}
                    <span className="text-[11px] text-slate-400">Remember user node ID</span>
                  </div>

                  <button 
                    type="submit"
                    disabled={isAuthenticating}
                    className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all mt-2 cursor-pointer"
                  >
                    {isAuthenticating ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-indigo-200" />
                        <span>Authenticate Session</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Integration Social buttons */}
                <div className="flex flex-col gap-2 w-full mt-2">
                  <div className="text-center text-[10px] text-slate-500 uppercase tracking-widest font-mono">Single-Sign-On</div>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      type="button"
                      onClick={() => alert('Google Secure SSO activated')}
                      className="py-2.5 rounded-xl bg-slate-900 border border-slate-800/60 hover:bg-slate-800/80 text-slate-300 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Globe className="w-3.5 h-3.5 text-rose-400" />
                      Google SSO
                    </button>
                    <button 
                      type="button"
                      onClick={() => alert('GitHub secure Sandbox activated')}
                      className="py-2.5 rounded-xl bg-slate-900 border border-slate-800/60 hover:bg-slate-800/80 text-slate-300 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Laptop className="w-3.5 h-3.5 text-white" />
                      GitHub Core
                    </button>
                  </div>
                </div>

                <div className="text-center mt-3">
                  <button 
                    onClick={() => navigateTo('signup')}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Deploying for first time? <span className="text-[#22d3ee] font-bold">Register Node</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* 4. Signup Screen */}
            {route === 'signup' && (
              <motion.div 
                key="signup_view"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-4 pt-5 w-full"
              >
                <div className="flex items-center gap-3">
                  <button onClick={() => navigateTo('login')} className="p-2 bg-slate-900 border border-slate-800 rounded-xl text-white">
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div>
                    <h2 className="text-lg font-extrabold text-white tracking-tight">Register Node</h2>
                    <p className="text-[10px] text-slate-500 mt-0.5">Initialize institutional credentials</p>
                  </div>
                </div>

                {signupError && (
                  <div className="p-2 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] text-center rounded-lg">
                    {signupError}
                  </div>
                )}

                <form onSubmit={handleSignup} className="p-4 bg-slate-900/50 border border-slate-800/80 rounded-2xl flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-bold text-slate-400 tracking-wider">FULL NAME</label>
                    <input 
                      type="text" 
                      placeholder="Alex Rivera"
                      value={joinName}
                      onChange={(e) => setJoinName(e.target.value)}
                      className="w-full bg-slate-950/80 text-white text-xs px-3 py-2.5 rounded-lg border border-slate-800 focus:border-indigo-500 focus:outline-none transition-colors"
                      required 
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-bold text-slate-400 tracking-wider">ACADEMIC EMAIL (.EDU)</label>
                    <input 
                      type="email" 
                      placeholder="alex.rivera44@campus.edu"
                      value={joinEmail}
                      onChange={(e) => setJoinEmail(e.target.value)}
                      className="w-full bg-slate-950/80 text-white text-xs px-3 py-2.5 rounded-lg border border-slate-800 focus:border-indigo-500 focus:outline-none transition-colors"
                      required 
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-bold text-slate-400 tracking-wider">SECURE PASS SECRETS</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      value={joinPass}
                      onChange={(e) => setJoinPass(e.target.value)}
                      className="w-full bg-slate-950/80 text-white text-xs px-3 py-2.5 rounded-lg border border-slate-800 focus:border-indigo-500 focus:outline-none transition-colors"
                      required 
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-bold text-slate-400 tracking-wider">CONFIRM KEY SIGNATURE</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      value={joinConfirm}
                      onChange={(e) => setJoinConfirm(e.target.value)}
                      className="w-full bg-slate-950/80 text-white text-xs px-3 py-2.5 rounded-lg border border-slate-800 focus:border-indigo-500 focus:outline-none transition-colors"
                      required 
                    />
                  </div>

                  <div className="flex items-center gap-2 mt-1 cursor-pointer" onClick={() => setJoinTerms(!joinTerms)}>
                    {joinTerms ? (
                      <CheckSquare className="w-4 h-4 text-indigo-400" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-600" />
                    )}
                    <span className="text-[10px] text-slate-400">Agree to decentralized academic codes</span>
                  </div>

                  <button 
                    type="submit"
                    disabled={isRegistering}
                    className="w-full py-3 bg-[#6366F1] hover:bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-1"
                  >
                    {isRegistering ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Cpu className="w-4 h-4" />
                        <span>Deploy Node</span>
                      </>
                    )}
                  </button>
                </form>

                <div className="text-center mt-1">
                  <button onClick={() => navigateTo('login')} className="text-xs text-slate-400 hover:text-white">
                    Already certified? <span className="text-indigo-400 font-bold">Boot session</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* 5. Forgot Password */}
            {route === 'forgot' && (
              <motion.div 
                key="forgot_view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-4 pt-8 w-full"
              >
                <div className="flex items-center gap-3">
                  <button onClick={() => navigateTo('login')} className="p-2 bg-slate-900 border border-slate-800 rounded-xl text-white">
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <h2 className="text-xl font-extrabold text-white">Reset Secret Key</h2>
                </div>

                <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-2xl flex flex-col gap-3">
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Insert your verified institutional academic coordinates to establish a reset pathway.
                  </p>

                  {forgotSent ? (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs rounded-xl flex flex-col gap-2">
                      <div className="flex items-center gap-1.5 font-bold">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Reset Dispatched</span>
                      </div>
                      <p className="text-[11px] opacity-80 leading-normal">
                        Security key reset node coordinates has been dispatched key. Re-verify mailbox.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleForgotSubmit} className="flex flex-col gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-bold text-slate-400 tracking-wider">INSTITUTION EMAIL</label>
                        <input 
                          type="email" 
                          placeholder="student@institution.edu"
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          className="w-full bg-slate-950 text-white text-xs px-3.5 py-3 rounded-xl border border-slate-800 focus:border-indigo-500 focus:outline-none"
                          required 
                        />
                      </div>
                      <button 
                        type="submit"
                        disabled={forgotLoading}
                        className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {forgotLoading ? (
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <Key className="w-4 h-4" />
                            <span>Dispatch Reset Credentials</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>
            )}

            {/* 6. OTP Verification Screen */}
            {route === 'otp' && (
              <motion.div 
                key="otp_view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-4 pt-8 w-full"
              >
                <div className="text-center">
                  <div className="inline-block p-3 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 mb-2">
                    <Hourglass className="w-8 h-8 text-cyan-400 animate-pulse" />
                  </div>
                  <h2 className="text-xl font-extrabold text-white tracking-tight">Handshake Activation</h2>
                  <p className="text-xs text-slate-400 mt-1">Insert verification signatures. (Mock code is 1234)</p>
                </div>

                <div className="flex flex-col gap-4 p-5 bg-slate-900/60 border border-slate-800 rounded-2xl">
                  {/* Row of Inputs */}
                  <div className="flex justify-center gap-3">
                    {otpVal.map((digit, idx) => (
                      <input 
                        key={idx}
                        ref={(el) => { if (el) otpInputs.current[idx] = el }}
                        type="text" 
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpInput(idx, e.target.value)}
                        className="w-12 h-14 bg-slate-950 text-center font-bold text-[#22d3ee] text-xl rounded-xl border border-slate-800 focus:border-[#22d3ee] focus:outline-none"
                      />
                    ))}
                  </div>

                  <div className="text-center">
                    <p className="text-[10px] text-slate-500">
                      Payload expiration countdown: <span className="text-red-400 font-mono font-bold">{otpCount}s</span>
                    </p>
                    {otpCount === 0 && (
                      <button 
                        onClick={() => { setOtpCount(59); alert('Mock pin vector dispatched...'); }}
                        className="text-[10px] text-[#22d3ee] font-bold hover:underline mt-1"
                      >
                        Re-route standard key signature
                      </button>
                    )}
                  </div>

                  <button 
                    onClick={handleOtpVerify}
                    disabled={otpVerifying}
                    className="w-full py-3 bg-gradient-to-r from-[#22D3EE] to-indigo-500 hover:from-cyan-500 text-black font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {otpVerifying ? (
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Verify Encryption Integrity</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* 7. Main Dashboard Shell (Tab Navigator) */}
            {route === 'home' && (
              <motion.div 
                key="home_view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[#0B0E14] flex flex-col justify-between"
              >
                
                {/* 7a. Secondary views scroll logic */}
                <div className="flex-1 overflow-y-auto px-4 pt-10 pb-20 select-none">
                  
                  {/* TAB A: Core Dashboard */}
                  {subTab === 'dashboard' && (
                    <div className="flex flex-col gap-5 pt-2">
                      {/* Greet Custom Header */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-mono tracking-widest text-[#22d3ee] uppercase">System Node Active</span>
                          <h3 className="text-lg font-black text-white leading-tight mt-0.5">{userProfile.fullName}</h3>
                        </div>
                        <button 
                          onClick={() => setSubTab('profile')}
                          className="w-10 h-10 rounded-full border border-[#22d3ee] p-[1.5px] cursor-pointer"
                        >
                          <img src={userProfile.avatarUrl} alt="avatar" className="w-full h-full rounded-full object-cover" />
                        </button>
                      </div>

                      {/* Quantum Synergy Banner Card with Glass Effect */}
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 relative overflow-hidden shadow-lg shadow-indigo-500/25">
                        <div className="absolute top-0 right-0 p-2 opacity-10">
                          <Cpu className="w-32 h-32" />
                        </div>
                        <span className="px-2 py-1 rounded bg-black/25 text-[8px] font-mono tracking-widest text-emerald-400 font-bold">HACKATHON • ON TIME</span>
                        <h4 className="text-md font-bold text-white mt-1.5 leading-snug">Quantum Synergy 2026</h4>
                        <p className="text-[10px] text-indigo-100 leading-normal mt-1 opacity-90 max-w-[85%]">
                          Final priority compute registrations close June 15. Team syncs active.
                        </p>
                      </div>

                      {/* Quick Portal actions grid */}
                      <div>
                        <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase">Interactive System Links</span>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center flex flex-col items-center gap-1.5 hover:border-indigo-500/50 transition-colors">
                            <Flame className="w-5 h-5 text-indigo-400" />
                            <span className="text-[10px] font-bold text-slate-200">Sprint Hub</span>
                          </div>
                          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center flex flex-col items-center gap-1.5 hover:border-cyan-500/50 transition-colors">
                            <Briefcase className="w-5 h-5 text-cyan-400" />
                            <span className="text-[10px] font-bold text-slate-200">Nexus job</span>
                          </div>
                          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center flex flex-col items-center gap-1.5 hover:border-rose-500/50 transition-colors">
                            <Award className="w-5 h-5 text-rose-400" />
                            <span className="text-[10px] font-bold text-slate-200">Pinnacles</span>
                          </div>
                        </div>
                      </div>

                      {/* Dynamic Feed list */}
                      <div className="flex flex-col gap-2.5">
                        <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase">Campus Transmissions</span>
                        
                        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                          <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                            <Activity className="w-4 h-4" />
                          </div>
                          <div className="flex-grow">
                            <h5 className="text-[12px] font-bold text-white leading-snug">AI Ethics Forum Sandbox Panel</h5>
                            <p className="text-[11px] text-slate-400 mt-0.5">Hall Auditorium • Meets at 4PM UTC</p>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                          <div className="p-2 bg-[#22D3EE]/10 rounded-lg text-[#22D3EE]">
                            <Cpu className="w-4 h-4" />
                          </div>
                          <div className="flex-grow">
                            <h5 className="text-[12px] font-bold text-white leading-snug">Campus Connect v2.4 Node Patch</h5>
                            <p className="text-[11px] text-slate-400 mt-0.5">Optimized telemetry throughput speeds</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB B: Vector search */}
                  {subTab === 'search' && (
                    <div className="flex flex-col gap-4 pt-2">
                      <h3 className="text-base font-extrabold text-[#F8FAFC]">Mesh Node Search</h3>
                      
                      {/* Search Bar */}
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#22d3ee]" />
                        <input 
                          type="text" 
                          placeholder="Search labs, students, topics..."
                          value={searchTxt}
                          onChange={(e) => handleSearchTxt(e.target.value)}
                          className="w-full bg-slate-900 text-white text-xs pl-9 pr-3 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-[#22d3ee]"
                        />
                      </div>

                      {searchSearching ? (
                        <div className="flex justify-center items-center py-10">
                          <div className="w-6 h-6 border-2 border-[#22d3ee] border-t-transparent rounded-full animate-spin" />
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2.5 mt-2">
                          {searchResults.length > 0 ? (
                            <>
                              <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase">Matches Located</span>
                              {searchResults.map((entry, idx) => (
                                <div key={idx} className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200">
                                  {entry}
                                </div>
                              ))}
                            </>
                          ) : (
                            <>
                              <span className="text-[9px] font-mono tracking-widest text-[#22d3ee] uppercase">Trending query categories</span>
                              <div className="flex flex-wrap gap-2">
                                {['HackMit', 'Genomics', 'PythonLabs', 'IoT_Locks', 'FlutterWidgets'].map((tag, idx) => (
                                  <button 
                                    key={idx}
                                    onClick={() => handleSearchTxt(tag)}
                                    className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-[#23d3ee]/55 text-[10px] text-slate-300 transition-colors"
                                  >
                                    #{tag}
                                  </button>
                                ))}
                              </div>

                              <div className="text-center py-10 opacity-60">
                                <Compass className="w-10 h-10 text-slate-500 mx-auto mb-2" />
                                <span className="text-[10px] font-mono text-slate-400">Query mapping relies on academic semantic indices</span>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB C: Active Chats */}
                  {subTab === 'chat' && (
                    <div className="flex flex-col h-[520px] justify-between pt-2">
                      <div className="flex items-center gap-3 border-b border-slate-900 pb-3">
                        <img 
                          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80" 
                          alt="jane" 
                          className="w-10 h-10 rounded-full object-cover border border-indigo-400" 
                        />
                        <div>
                          <h4 className="text-xs font-bold text-slate-100">Jane Wilde</h4>
                          <span className="text-[9px] text-indigo-400 font-mono">Active Terminal: Node 23A</span>
                        </div>
                      </div>

                      {/* Chat Messages flow */}
                      <div className="flex-grow overflow-y-auto py-3.5 flex flex-col gap-3">
                        {chatMessages.map((msg, idx) => (
                          <div key={idx} className={`flex flex-col max-w-[80%] ${msg.isMe ? 'ml-auto items-end' : 'mr-auto items-start'}`}>
                            <div className={`p-3 rounded-2xl text-xs leading-relaxed ${msg.isMe ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-900 text-slate-300 rounded-tl-none'}`}>
                              {msg.text}
                            </div>
                            <span className="text-[8px] text-slate-500 font-mono mt-0.5">{msg.time}</span>
                          </div>
                        ))}
                      </div>

                      {/* Input container footer inside chat tab */}
                      <div className="flex items-center gap-2 mt-auto">
                        <input 
                          type="text" 
                          placeholder="Send secure matrix payload..."
                          value={chatInputs}
                          onChange={(e) => setChatInputs(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage() }}
                          className="flex-grow bg-slate-950 text-slate-100 text-xs px-3.5 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500"
                        />
                        <button 
                          onClick={handleSendMessage}
                          className="p-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white transition-colors cursor-pointer"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB D: Alerts Dispatches */}
                  {subTab === 'notifications' && (
                    <div className="flex flex-col gap-4 pt-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-extrabold text-[#F8FAFC]">Alert Dispatches</h4>
                        <button 
                          onClick={async () => {
                            if (auth.currentUser) {
                              try {
                                const batchUpdates = notifications.map(async (n) => {
                                  if (n.isNew) {
                                    const docRef = doc(db, 'notifications', n.id);
                                    await setDoc(docRef, { ...n, isNew: false });
                                  }
                                });
                                await Promise.all(batchUpdates);
                              } catch (err) {
                                handleFirestoreError(err, OperationType.UPDATE, 'notifications');
                              }
                            } else {
                              setNotifications(prev => prev.map(n => ({...n, isNew: false})));
                            }
                          }}
                          className="text-[10px] text-[#22d3ee] font-bold"
                        >
                          Clear Badges
                        </button>
                      </div>

                      <div className="flex flex-col gap-3">
                        {notifications.map((item) => (
                          <div 
                            key={item.id}
                            className={`p-3 rounded-xl border transition-colors ${item.isNew ? 'bg-indigo-500/5 border-indigo-500/20' : 'bg-slate-900/60 border-slate-800'}`}
                          >
                            <div className="flex justify-between items-center text-[9px] text-slate-500 mb-1">
                              <span className="text-[#22d3ee] font-bold uppercase tracking-widest">{item.category}</span>
                              <span>{item.time}</span>
                            </div>
                            <h5 className="text-[11px] font-bold text-white leading-snug">{item.title}</h5>
                            <p className="text-[10px] text-slate-400 mt-1 leading-normal">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB E: Settings configs */}
                  {subTab === 'settings' && (
                    <div className="flex flex-col gap-5 pt-2">
                      <h4 className="text-base font-extrabold text-[#F8FAFC]">System Controls</h4>
                      
                      <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col gap-3">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-200">Immersive Viewport</span>
                            <span className="text-[9.5px] text-slate-500">OLED power conservation nodes</span>
                          </div>
                          <input type="checkbox" checked={settDark} onChange={() => setSettDark(!settDark)} className="accent-[#22D3EE]" />
                        </div>

                        <hr className="border-slate-800/80" />

                        <div className="flex items-center justify-between text-xs">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-200">Event Horizon Dispatches</span>
                            <span className="text-[9.5px] text-slate-500">Push notify campus changes</span>
                          </div>
                          <input type="checkbox" checked={settNotif} onChange={() => setSettNotif(!settNotif)} className="accent-[#22D3EE]" />
                        </div>

                        <hr className="border-slate-800/80" />

                        <div className="flex items-center justify-between text-xs">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-200">Stealth Presence Node</span>
                            <span className="text-[9.5px] text-slate-500 font-mono text-red-400">Enforce incognito standards</span>
                          </div>
                          <input type="checkbox" checked={settStealth} onChange={() => setSettStealth(!settStealth)} className="accent-[#22D3EE]" />
                        </div>
                      </div>

                      {/* Diagnostic summary */}
                      <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl">
                        <div className="text-[8.5px] font-mono text-slate-500 mb-2 uppercase tracking-wider">Telemetry Diagnostic Suite</div>
                        <div className="flex flex-col gap-1 text-[10px] text-slate-400 font-mono">
                          <div className="flex justify-between">
                            <span>Client Package:</span>
                            <span className="text-indigo-400">v2.4.0 Codename: Indigo</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Encr Algorithm:</span>
                            <span className="text-[#22d3ee]">Argon2id + AES-256</span>
                          </div>
                        </div>
                      </div>

                      <button 
                        onClick={async () => {
                          try {
                            await signOut(auth);
                            navigateTo('login');
                          } catch (err) {
                            console.error("Sign out error:", err);
                          }
                        }}
                        className="w-full py-3 rounded-xl border border-red-500/50 hover:bg-red-500/10 text-red-400 text-xs font-bold transition-all mt-2 cursor-pointer"
                      >
                        Terminate Security Handshakes
                      </button>
                    </div>
                  )}

                  {/* TAB F: Profile View */}
                  {subTab === 'profile' && (
                    <div className="flex flex-col gap-5 pt-2">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => setSubTab('dashboard')}
                          className="p-1 px-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-bold text-slate-100 hover:bg-slate-800"
                        >
                          Back
                        </button>
                        <h4 className="text-base font-extrabold text-white">Academic Persona</h4>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full border-2 border-[#22d3ee] p-[2px] mb-2 shadow-lg shadow-[#22d3ee]/25">
                          <img src={userProfile.avatarUrl} alt="avatar" className="w-full h-full rounded-full object-cover" />
                        </div>
                        <h5 className="text-[15px] font-bold text-slate-100">{userProfile.fullName}</h5>
                        <p className="text-[11px] text-[#22D3EE] font-medium mt-0.5">{userProfile.department}</p>
                        <span className="text-[9px] text-slate-500 font-mono mt-1">Veritable UID: usr_82a31 • Class of {userProfile.classOf}</span>
                      </div>

                      {/* Stats grid display */}
                      <div className="grid grid-cols-3 gap-2.5 text-center mt-2">
                        <div className="p-3 bg-slate-900 border border-slate-800/80 rounded-xl">
                          <span className="block text-sm font-bold text-indigo-400">{userProfile.connections}</span>
                          <span className="text-[9px] text-[#94a3b8] font-semibold">Connections</span>
                        </div>
                        <div className="p-3 bg-slate-900 border border-slate-800/80 rounded-xl">
                          <span className="block text-sm font-bold text-cyan-400">{userProfile.opportunities}</span>
                          <span className="text-[9px] text-[#94a3b8] font-semibold">Opportunities</span>
                        </div>
                        <div className="p-3 bg-slate-900 border border-slate-800/80 rounded-xl">
                          <span className="block text-sm font-bold text-rose-400">{userProfile.projects}</span>
                          <span className="text-[9px] text-[#94a3b8] font-semibold">Projects</span>
                        </div>
                      </div>

                      {/* Skill Ledger keywords */}
                      <div>
                        <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Active skill ledger</span>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {userProfile.skills.map((sku, idx) => (
                            <span key={idx} className="px-2 py-1 rounded bg-slate-900 border border-slate-800/80 text-[10.5px] text-indigo-200">
                              {sku}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Veritable Awards checklist */}
                      <div>
                        <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Verifiable Award Hashes</span>
                        <div className="flex flex-col gap-2 mt-2">
                          {userProfile.achievements.map((ach, idx) => (
                            <div key={idx} className="p-2.5 bg-slate-900 border border-slate-800/80 rounded-lg text-[11px] text-slate-300 flex items-center gap-2">
                              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                              <span className="leading-snug">{ach}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* iOS Glass Floating Navigator bar */}
                <div className="absolute bottom-3 left-3 right-3 h-14 bg-slate-950/90 border border-slate-800 rounded-2xl flex items-center justify-around px-2 py-1 shadow-2xl backdrop-blur-md">
                  <button 
                    onClick={() => setSubTab('dashboard')}
                    className={`flex flex-col items-center gap-1 ${subTab === 'dashboard' ? 'text-indigo-400' : 'text-slate-500'}`}
                  >
                    <Cpu className="w-4 h-4" />
                    <span className="text-[9px] font-bold">Node</span>
                  </button>
                  <button 
                    onClick={() => setSubTab('search')}
                    className={`flex flex-col items-center gap-1 ${subTab === 'search' ? 'text-[#22d3ee]' : 'text-slate-500'}`}
                  >
                    <Compass className="w-4 h-4" />
                    <span className="text-[9px] font-bold">Query</span>
                  </button>
                  <button 
                    onClick={() => setSubTab('chat')}
                    className={`flex flex-col items-center gap-1 relative ${subTab === 'chat' ? 'text-indigo-400' : 'text-slate-500'}`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-[9px] font-bold">Comm</span>
                    <span className="absolute top-1 right-2 w-1.5 h-1.5 bg-[#22d3ee] rounded-full" />
                  </button>
                  <button 
                    onClick={() => setSubTab('notifications')}
                    className={`flex flex-col items-center gap-1 relative ${subTab === 'notifications' ? 'text-indigo-400' : 'text-slate-500'}`}
                  >
                    <Bell className="w-4 h-4" />
                    <span className="text-[9px] font-bold">Alerts</span>
                    <span className="absolute top-1 right-2 w-1.5 h-1.5 bg-rose-500 rounded-full" />
                  </button>
                  <button 
                    onClick={() => setSubTab('settings')}
                    className={`flex flex-col items-center gap-1 ${subTab === 'settings' ? 'text-indigo-400' : 'text-slate-500'}`}
                  >
                    <SettingsIcon className="w-4 h-4" />
                    <span className="text-[9px] font-bold">Configs</span>
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* iOS Home Indicator bottom line */}
        <div className="h-5 flex items-center justify-center bg-transparent z-40">
          <div className="w-32 h-1 bg-slate-700/80 rounded-full" />
        </div>

      </div>

      {/* Simulator Quick Action Labels (Under phone frame) */}
      <div className="mt-4 flex flex-wrap justify-center gap-1.5 text-center text-[10px] font-mono text-slate-500 max-w-xs leading-normal">
        <span>Click tabs or enter credentials to browse through all 12 simulated screens. Try Email ending in <b className="text-[#22d3ee]">.edu</b> and passwords to authorize.</span>
      </div>

    </div>
  );
}
