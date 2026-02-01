'use client';

import React, { useState, useEffect, forwardRef, useRef, useCallback, useId, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================
// Types
// ============================================
interface DissolveWrapperProps {
    children: React.ReactNode;
    triggerClose?: boolean;
    onComplete?: () => void;
    duration?: number;
    maxDisplacement?: number;
    resetAfterComplete?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

interface DissolveWrapperRef {
    reset: () => void;
    dissolve: () => void;
    isAnimating: () => boolean;
    isVisible: () => boolean;
}

interface SyncDetailsData {
    totalTransactions: string;
    bankAccounts: string;
    categories: string;
    parties: string;
}

// ============================================
// DissolveWrapper Component
// ============================================
const DissolveWrapper = forwardRef<DissolveWrapperRef, DissolveWrapperProps>(({
    children,
    triggerClose = false,
    onComplete,
    duration = 1000,
    maxDisplacement = 2000,
    resetAfterComplete = false,
    className = '',
    style = {},
}, ref) => {
    const uniqueId = useId();
    const filterRef = useRef<SVGFilterElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const prevTriggerRef = useRef(triggerClose);

    const safeFilterId = `dissolve-${uniqueId.replace(/:/g, '')}`;

    const reset = useCallback(() => {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        }
        if (filterRef.current) {
            const disp = filterRef.current.querySelector('feDisplacementMap');
            if (disp) disp.setAttribute('scale', '0');
        }
        if (contentRef.current) {
            contentRef.current.style.transform = 'scale(1)';
            contentRef.current.style.opacity = '1';
        }
        setIsAnimating(false);
        setIsVisible(true);
    }, []);

    const dissolve = useCallback(() => {
        if (!filterRef.current || !contentRef.current || isAnimating) return;

        const disp = filterRef.current.querySelector('feDisplacementMap');
        const bNoise = filterRef.current.querySelector('feTurbulence[result="bigNoise"]');
        const content = contentRef.current;
        if (!disp || !bNoise) return;

        setIsAnimating(true);
        const start = performance.now();
        const ease = (t: number) => 1 - Math.pow(1 - t, 3);
        bNoise.setAttribute('seed', String(Math.floor(Math.random() * 1000)));

        const step = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const e = ease(t);
            disp.setAttribute('scale', String(e * maxDisplacement));
            content.style.transform = `scale(${1 + 0.1 * e})`;
            content.style.opacity = t < 0.5 ? '1' : String(1 - (t - 0.5) / 0.5);

            if (t < 1) {
                animationRef.current = requestAnimationFrame(step);
            } else {
                animationRef.current = null;
                setIsAnimating(false);
                setIsVisible(false);
                if (resetAfterComplete) reset();
                onComplete?.();
            }
        };
        animationRef.current = requestAnimationFrame(step);
    }, [duration, maxDisplacement, onComplete, resetAfterComplete, reset, isAnimating]);

    useImperativeHandle(ref, () => ({
        reset,
        dissolve,
        isAnimating: () => isAnimating,
        isVisible: () => isVisible,
    }), [reset, dissolve, isAnimating, isVisible]);

    useEffect(() => {
        if (triggerClose && !prevTriggerRef.current) dissolve();
        else if (!triggerClose && prevTriggerRef.current) reset();
        prevTriggerRef.current = triggerClose;
    }, [triggerClose, dissolve, reset]);

    useEffect(() => {
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <>
            <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
                <defs>
                    <filter
                        ref={filterRef}
                        id={safeFilterId}
                        x="-200%"
                        y="-200%"
                        width="500%"
                        height="500%"
                        colorInterpolationFilters="sRGB"
                    >
                        <feTurbulence type="fractalNoise" baseFrequency="0.004" numOctaves={1} result="bigNoise" />
                        <feComponentTransfer in="bigNoise" result="bigNoiseAdjusted">
                            <feFuncR type="linear" slope={5} intercept={-2} />
                            <feFuncG type="linear" slope={5} intercept={-2} />
                        </feComponentTransfer>
                        <feTurbulence type="fractalNoise" baseFrequency={1} numOctaves={1} result="fineNoise" />
                        <feMerge result="mergedNoise">
                            <feMergeNode in="bigNoiseAdjusted" />
                            <feMergeNode in="fineNoise" />
                        </feMerge>
                        <feDisplacementMap in="SourceGraphic" in2="mergedNoise" scale={0} xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </defs>
            </svg>
            <div
                ref={contentRef}
                className={className}
                style={{
                    ...style,
                    filter: `url(#${safeFilterId})`,
                    WebkitFilter: `url(#${safeFilterId})`,
                    willChange: isAnimating ? 'transform, opacity' : 'auto',
                }}
            >
                {children}
            </div>
        </>
    );
});

DissolveWrapper.displayName = 'DissolveWrapper';

// ============================================
// Device Icon Component
// ============================================
interface DeviceIconProps {
    name: string;
    subtitle: string;
    icon: string;
    gradient: string;
    borderColor: string;
    iconSize?: 'sm' | 'lg';
}

const DeviceIcon: React.FC<DeviceIconProps> = ({ name, subtitle, icon, gradient, borderColor, iconSize = 'lg' }) => (
    <div className="text-center flex-none">
        <div className={`w-12 h-12 ${gradient} rounded-xl mx-auto mb-2 flex items-center justify-center border-2 ${borderColor}`}>
            <div className={`${iconSize === 'lg' ? 'text-lg' : 'text-sm'} font-medium text-white ${iconSize === 'sm' ? 'tracking-tight' : ''}`}>
                {icon}
            </div>
        </div>
        <div className="text-[10px] text-neutral-600 font-medium">{name}</div>
        <div className="text-[10px] text-neutral-600 font-normal">{subtitle}</div>
    </div>
);

// ============================================
// Cloud Sync Icon Component
// ============================================
const CloudSyncIcon: React.FC = () => (
    <div className="flex-1 flex items-center justify-center">
        <div className="flex items-center gap-1.5 relative -top-4.5">
            <div
                className="w-16 h-px bg-[length:8px_1px] bg-repeat-x"
                style={{ backgroundImage: 'repeating-linear-gradient(to right, #d4d4d4 0, #d4d4d4 4px, transparent 4px, transparent 8px)' }}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className='text-black/30' width="18" height="18" viewBox="0 0 18 18">
                <g fill="currentColor">
                    <path d="M14.157 6.326C12.633 5.724 10.7083 6 9.12499 7.3958C9.37499 6.125 11.4118 4.5058 13.523 4.608C12.61 3.047 10.922 2 9.02899 2C6.14399 2 3.79799 4.355 3.79799 7.25C3.79799 7.375 3.80299 7.5 3.81399 7.627C2.16899 8.045 0.96499 9.561 1.00199 11.334C1.02299 12.334 1.43099 13.265 2.14999 13.958C2.84999 14.632 3.76299 15 4.71499 15H12.516C14.989 15 17 12.982 17 10.499C16.997 8.64 15.869 7.003 14.157 6.326Z" />
                </g>
            </svg>
            <div
                className="w-16 h-px bg-[length:8px_1px] bg-repeat-x"
                style={{ backgroundImage: 'repeating-linear-gradient(to right, #d4d4d4 0, #d4d4d4 4px, transparent 4px, transparent 8px)' }}
            />
        </div>
    </div>
);

// ============================================
// Devices Illustration Component
// ============================================
const DevicesIllustration: React.FC = () => (
    <div className="flex items-center justify-between mb-7 px-2">
        <DeviceIcon
            name="QuickBooks"
            subtitle="Accounting"
            icon="QB"
            gradient="bg-gradient-to-b from-[#50b542] to-[#4cca41]"
            borderColor="border-[#50b542]"
        />
        <CloudSyncIcon />
        <DeviceIcon
            name="Legix"
            subtitle="Accounting"
            icon="LGX"
            gradient="bg-linear-to-b from-[#47494f] to-[#44474a]"
            borderColor="border-[#404145]"
            iconSize="sm"
        />
    </div>
);

// ============================================
// Initial State Component
// ============================================
const InitialState: React.FC = () => (
    <motion.div
        key="initial"
        initial={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-neutral-50 rounded-xl py-6 px-4 mb-4 text-center"
    >
        <p className="text-[11px] text-neutral-600 leading-relaxed">
            Link your QuickBooks account to sync transactions, accounts, and categories to Legix
        </p>
    </motion.div>
);

// ============================================
// Progress Bar Component
// ============================================
interface ProgressBarProps {
    progress: number;
    isPaused: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, isPaused }) => (
    <div className="flex items-center gap-2.5 mb-2">
        <div className="flex-1 h-1.5 bg-neutral-100 rounded overflow-hidden">
            <motion.div
                className={`h-full bg-gradient-to-r from-[#404145] to-[#37393D] rounded ${isPaused ? 'opacity-60' : ''}`}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            />
        </div>
        <div className={`text-[13px] font-semibold min-w-[36px] text-right ${isPaused ? 'text-neutral-500' : 'text-[#404145]'}`}>
            {progress}%
        </div>
    </div>
);

// ============================================
// Sync Progress Component
// ============================================
interface SyncProgressProps {
    progress: number;
    isPaused: boolean;
}

const SyncProgress: React.FC<SyncProgressProps> = ({ progress, isPaused }) => (
    <motion.div
        key="sync-progress"
        initial={{ opacity: 0, filter: "blur(2px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.3, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className="mb-5"
    >
        <h2 className="text-sm font-medium text-center text-neutral-600 mb-3">
            {isPaused ? 'Sync paused' : 'Sync progress'}
        </h2>
        <ProgressBar progress={progress} isPaused={isPaused} />
        <p className="text-[11px] text-neutral-400 text-center">
            {isPaused ? (
                <span className="text-neutral-500">Sync paused at {progress}%</span>
            ) : (
                <>Your accounting data sync is {progress}% completed</>
            )}
        </p>
    </motion.div>
);

// ============================================
// Sync Details Component
// ============================================
interface SyncDetailsProps {
    data: SyncDetailsData;
}

const SyncDetailsRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="flex justify-between items-center">
        <span className="text-[11px] text-neutral-600">{label}</span>
        <span className="text-[11px] text-neutral-800 font-medium">{value}</span>
    </div>
);

const SyncDetails: React.FC<SyncDetailsProps> = ({ data }) => (
    <motion.div
        key="sync-details"
        initial={{ opacity: 0, filter: "blur(2px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.3, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className="bg-neutral-50 rounded-xl p-4 mb-4"
    >
        <div className="flex items-center gap-1.5 mb-3 justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
            </svg>
            <h3 className="text-xs font-semibold text-neutral-800">Sync Details</h3>
        </div>
        <div className="flex flex-col gap-2">
            <SyncDetailsRow label="Total transactions" value={data.totalTransactions} />
            <SyncDetailsRow label="Bank accounts" value={data.bankAccounts} />
            <SyncDetailsRow label="Categories" value={data.categories} />
            <SyncDetailsRow label="Parties" value={data.parties} />
        </div>
    </motion.div>
);

// ============================================
// Action Buttons Component
// ============================================
interface ActionButtonsProps {
    isSyncing: boolean;
    isPaused: boolean;
    onLinkAccount: () => void;
    onCancel: () => void;
    onPauseResume: () => void;
}

const LinkAccountButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <motion.div
        key="link-button"
        initial={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mb-3"
    >
        <button
            onClick={onClick}
            className="w-full py-2 px-3.5 bg-gradient-to-b from-[#404145] to-[#37393D] border-2 border-[#404145] rounded-lg text-[11px] font-semibold text-white cursor-pointer flex items-center justify-center gap-1.5 transition-all duration-200 hover:opacity-90"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className='size-3.5 relative -top-[0.5px] opacity-60' width="18" height="18" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="currentColor"><path d="M8.36909 6.8934C8.06649 7.0539 7.78239 7.2617 7.52799 7.517L7.51799 7.527C6.13699 8.908 6.13699 11.146 7.51799 12.527L9.69299 14.702C11.074 16.083 13.312 16.083 14.693 14.702L14.703 14.692C16.084 13.311 16.084 11.073 14.703 9.692L13.9406 8.9296"></path> <path d="M9.63289 11.1066C9.93549 10.9461 10.2196 10.7383 10.474 10.483L10.484 10.473C11.865 9.09199 11.865 6.85399 10.484 5.47299L8.30899 3.29799C6.92799 1.91699 4.68999 1.91699 3.30899 3.29799L3.29899 3.30799C1.91799 4.68899 1.91799 6.92699 3.29899 8.30799L4.06139 9.07039"></path></g></svg>
            Link account
        </button>
    </motion.div>
);

const SyncActionButtons: React.FC<{ onCancel: () => void; onPauseResume: () => void; isPaused: boolean }> = ({
    onCancel,
    onPauseResume,
    isPaused
}) => (
    <motion.div
        key="action-buttons"
        initial={{ opacity: 0, filter: "blur(2px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.3, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className="flex gap-1.5 mb-3"
    >
        <button
            onClick={onCancel}
            className="flex-1 py-2 px-3 bg-white border-2 border-neutral-200 rounded-lg text-[11px] font-medium text-neutral-600 cursor-pointer flex items-center justify-center gap-1 transition-all duration-200 hover:border-neutral-300 hover:text-neutral-700"
        >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            Cancel
        </button>
        <button
            onClick={onPauseResume}
            className="flex-1 py-2 px-3 bg-gradient-to-b from-[#404145] to-[#37393D] border-2 border-[#404145] rounded-lg text-[11px] font-semibold text-white cursor-pointer flex items-center justify-center gap-1 transition-all duration-200 hover:opacity-90"
        >
            {isPaused ? (
                <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                    Resume
                </>
            ) : (
                <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" rx="1" />
                        <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                    Pause
                </>
            )}
        </button>
    </motion.div>
);

const ActionButtons: React.FC<ActionButtonsProps> = ({
    isSyncing,
    isPaused,
    onLinkAccount,
    onCancel,
    onPauseResume
}) => (
    <AnimatePresence mode="popLayout">
        {!isSyncing ? (
            <LinkAccountButton onClick={onLinkAccount} />
        ) : (
            <SyncActionButtons
                onCancel={onCancel}
                onPauseResume={onPauseResume}
                isPaused={isPaused}
            />
        )}
    </AnimatePresence>
);

// ============================================
// Security Note Component
// ============================================
const SecurityNote: React.FC = () => (
    <motion.div
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex items-center justify-center gap-1"
    >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <span className="text-[10px] text-neutral-400">
            Your financial data is encrypted and secure.
        </span>
    </motion.div>
);

// ============================================
// Connected State Component
// ============================================
const ConnectedState: React.FC = () => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center text-black"
    >
        <h2 className="font-semibold tracking-tight">Connected</h2>
        <p className="text-[13px] text-neutral-600">Your accounts are now connected</p>
        <button className='flex pl-3 items-center gap-1 text-xs text-blue-600 mx-auto mt-4 cursor-pointer'>
            <span>continue</span>
            <svg xmlns="http://www.w3.org/2000/svg" className='size-3 opacity-70' width="18" height="18" viewBox="0 0 18 18">
                <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" stroke="currentColor">
                    <line x1="15.25" y1="9" x2="2.75" y2="9" />
                    <polyline points="11 4.75 15.25 9 11 13.25" />
                </g>
            </svg>
        </button>
    </motion.div>
);

// ============================================
// Custom Hook: useProgress
// ============================================
const useProgress = (isSyncing: boolean, isPaused: boolean) => {
    const [progress, setProgress] = useState(0);
    const [shouldDissolve, setShouldDissolve] = useState(false);

    useEffect(() => {
        if (!isSyncing || isPaused) return;

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev + 2;
                if (newProgress >= 100) {
                    clearInterval(progressInterval);
                    setTimeout(() => {
                        setShouldDissolve(true);
                    }, 500);
                    return 100;
                }
                return newProgress;
            });
        }, 20);

        return () => {
            clearInterval(progressInterval);
        };
    }, [isSyncing, isPaused]);

    return { progress, shouldDissolve };
};

// ============================================
// Main Connect Page Component
// ============================================
export default function ConnectPage() {
    const [showConnected, setShowConnected] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const { progress, shouldDissolve } = useProgress(isSyncing, isPaused);

    const syncDetailsData: SyncDetailsData = {
        totalTransactions: '1,247 / 3,892',
        bankAccounts: '5 accounts',
        categories: '24 items',
        parties: '156 contacts'
    };

    const handleStartSync = () => {
        setIsSyncing(true);
        setIsPaused(false);
    };

    const handlePauseResume = () => {
        setIsPaused(!isPaused);
    };

    const handleCancel = () => {
        setIsSyncing(false);
        setIsPaused(false);
    };

    const handleDissolveComplete = () => {
        setShowConnected(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-neutral-100 to-neutral-200 flex items-center justify-center p-6 font-sans">
            {!showConnected ? (
                <DissolveWrapper
                    triggerClose={shouldDissolve}
                    onComplete={handleDissolveComplete}
                    duration={1200}
                    maxDisplacement={2000}
                >
                    <motion.div
                        initial={{ opacity: 0, filter: "blur(2px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)", height: isSyncing ? '544px' : '380px' }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="w-[380px] bg-white rounded-3xl px-6 py-8 pb-3 shadow-xl h- overflow-hidden scale-80"
                    >
                        <h1 className="text-xl font-semibold text-center text-neutral-900 mb-8 tracking-tight">
                            Connect Bank Accounts
                        </h1>

                        <div>
                            <DevicesIllustration />

                            {/* <AnimatePresence mode="popLayout"> */}
                                {!isSyncing && <InitialState />}
                            {/* </AnimatePresence> */}

                            <AnimatePresence>
                                {isSyncing && (
                                    <>
                                        <SyncProgress progress={progress} isPaused={isPaused} />
                                        <SyncDetails data={syncDetailsData} />
                                    </>
                                )}
                            </AnimatePresence>

                            <ActionButtons
                                isSyncing={isSyncing}
                                isPaused={isPaused}
                                onLinkAccount={handleStartSync}
                                onCancel={handleCancel}
                                onPauseResume={handlePauseResume}
                            />

                            <SecurityNote />
                        </div>
                    </motion.div>
                </DissolveWrapper>
            ) : (
                <ConnectedState />
            )}
        </div>
    );
}
