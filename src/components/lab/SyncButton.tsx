'use client'

import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

function SyncButton() {

    const [formState, setFormState] = useState('idle')

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (formState === 'loading') {
            timer = setTimeout(() => {
                setFormState('success')
            }, 5000)
        } else if (formState === 'success') {
            timer = setTimeout(() => {
                setFormState('idle')
            }, 3000)
        }

        return () => clearTimeout(timer)
    }, [formState])

    return (
        <div className='text-black'>

            <button
                onClick={() => setFormState('loading')}
                style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 7, paddingBottom: 7, background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0) 100%), #34363C', boxShadow: '0px 0px 0px 1.5px #34363C' }}
                className='flex items-center justify-center gap-2 text-white w-52 h-11 rounded-xl cursor-pointer'
            >
                <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                        transition={{
                            type: "spring",
                            duration: 0.3,
                            bounce: 0,
                        }}
                        initial={{ opacity: 0, y: -25 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 25 }}
                        key={formState}
                    >
                        {formState === "loading" ? (
                            <svg className='size-4 animate-spin' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><title>loader</title><g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" stroke="currentColor"><line x1="9" y1="1.75" x2="9" y2="4.25"></line><line x1="14.127" y1="3.873" x2="12.359" y2="5.641" opacity=".88"></line><line x1="16.25" y1="9" x2="13.75" y2="9" opacity=".75"></line><line x1="14.127" y1="14.127" x2="12.359" y2="12.359" opacity=".63"></line><line x1="9" y1="16.25" x2="9" y2="13.75" opacity=".5"></line><line x1="3.873" y1="14.127" x2="5.641" y2="12.359" opacity=".38"></line><line x1="1.75" y1="9" x2="4.25" y2="9" opacity=".25"></line><line x1="3.873" y1="3.873" x2="5.641" y2="5.641" opacity=".13"></line></g></svg>
                        ) : formState === "success" ? (
                            <motion.svg
                                xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" stroke="currentColor">
                                    <motion.polyline
                                        initial={{ pathLength: 0, opacity: 0.7 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        transition={{ duration: 0.5, ease: "easeInOut", repeat: 1, repeatType: "loop", repeatDelay: 0.5 }}
                                        points="2.75 9.5 6.5 13.25 15.25 4.5"></motion.polyline>
                                </g>
                            </motion.svg>
                        ) : (
                            <span className='w-32 flex justify-center items-center'>Sync client</span>
                        )}
                    </motion.span>
                </AnimatePresence>
            </button>

        </div>
    )
}

export default SyncButton