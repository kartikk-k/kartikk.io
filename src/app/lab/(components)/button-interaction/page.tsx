"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'motion/react'

function page() {

    const [state, setState] = useState<'idle' | 'processing' | 'success'>('idle');

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (state === 'processing') {
            timer = setTimeout(() => {
                setState('success');
            }, 2000);
        } else if (state === 'success') {
            timer = setTimeout(() => {
                setState('idle');
            }, 2000);
        }

        return () => timer && clearTimeout(timer);
    }, [state])

    return (
        <div id="frame" className='min-h-screen text-black/80 font-medium bg-neutral-100 flex items-center justify-center'>


            <div className="relative flex flex-col items-center">
                <motion.button
                    onClick={() => setState('processing')}
                    className='bg-white h-10 rounded-full flex items-center justify-center overflow-hidden border border-neutral-300 text-sm cursor-pointer active:scale-95 transition-all duration-200 outline-4 outline-black/10'
                    initial={{ width: '104px' }}
                    animate={{
                        width: state === 'idle' ? '104px' : state === 'processing' ? '194px' : state === 'success' ? '170px' : '0px'
                    }}
                    transition={{
                        duration: 0.05,
                        ease: "easeIn"
                    }}
                // 104, 170, 153
                >
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                            transition={{
                                type: "spring",
                                duration: 0.35,
                                bounce: 0,
                            }}
                            initial={{ opacity: 0, y: -25, filter: "blur(8px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: 25, filter: "blur(8px)" }}
                            key={state}
                            className="inline-flex h-5 items-center justify-center gap-1 select-none"
                        >
                            <span className="relative -left-1 flex items-center">
                                {state === 'success' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 text-emerald-400" width="18" height="18" viewBox="0 0 18 18"><g fill="currentColor"><path d="M4.5,15c-.229,0-.446-.105-.589-.285L.161,9.965c-.256-.325-.201-.797,.124-1.054,.326-.256,.796-.202,1.054,.124l3.158,4L11.909,3.539c.255-.327,.725-.386,1.053-.13,.327,.255,.385,.726,.13,1.053L5.091,14.711c-.142,.182-.39,.259-.591,.289Z"></path><path d="M9.25,15c-.229,0-.446-.105-.588-.285l-.744-.942c-.257-.325-.202-.797,.124-1.053,.326-.257,.796-.202,1.053,.124l.152,.193L16.659,3.539c.254-.327,.726-.386,1.053-.13,.327,.255,.385,.726,.13,1.053L9.841,14.711c-.142,.182-.359,.288-.589,.289h-.002Z"></path></g></svg>
                                ) : state === 'processing' ? (
                                    <motion.span
                                        animate={{
                                            rotate: 360
                                        }}
                                        transition={{
                                            duration: 0.7,
                                            ease: "linear",
                                            repeat: Infinity
                                        }}
                                        className="inline-block"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 opacity-60" width="18" height="18" viewBox="0 0 18 18"><g fill="currentColor"><path d="M17 9C17 4.58172 13.4183 1 9 1V2.5C12.5899 2.5 15.5 5.41015 15.5 9C15.5 12.5899 12.5899 15.5 9 15.5V17C13.4183 17 17 13.4183 17 9Z" fill="url(#nc-loader-2-fill-gradient-1)"></path> <path d="M2.5 9C2.5 5.41015 5.41015 2.5 9 2.5V1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17V15.5C5.41015 15.5 2.5 12.5899 2.5 9Z" fill="url(#nc-loader-2-fill-gradient-2)"></path> <circle cx="9" cy="16.25" r="0.75"></circle> <defs fill="none"> <linearGradient id="nc-loader-2-fill-gradient-1" x1="9" y1="2.5" x2="9" y2="16.25" gradientUnits="userSpaceOnUse" fill="none"> <stop stop-color="currentColor" stop-opacity="0.5" fill="none"></stop> <stop stop-color="currentColor" offset="1" fill="none"></stop> </linearGradient> <linearGradient id="nc-loader-2-fill-gradient-2" x1="9" y1="2.5" x2="9" y2="16.25" gradientUnits="userSpaceOnUse" fill="none"> <stop stop-color="currentColor" stop-opacity="0.5" fill="none"></stop> <stop stop-color="currentColor" offset="1" stop-opacity="0" fill="none"></stop> </linearGradient> </defs></g></svg>
                                    </motion.span>
                                ) : null}
                            </span>

                            {state === 'idle' ? 'Subscribe' : state === 'processing' ? 'Processing Payment' : state === 'success' ? 'Paid successfully!' : ''}
                        </motion.span>
                    </AnimatePresence>
                </motion.button>
                <span className="text-xs opacity-40 absolute -bottom-6">click me</span>
            </div>


        </div>
    )
}

export default page