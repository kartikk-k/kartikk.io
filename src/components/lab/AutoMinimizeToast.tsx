"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

function AutoMinimizeToast() {

    const [showToast, setShowToast] = useState(false)
    const [count, setCount] = useState(0)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)

                setTimeout(() => {
                    setCount(count + 1)
                }, 2000)
                
            }, 8000)
        }, 1000)

        return () => {
            clearTimeout(timeout)
        }
    }, [count])


    return (
        <div className='bg-neutral-50 flex justify-center h-full w-full overflow-hidden relative' suppressHydrationWarning={true}>

            <div className='h-full' key={count}>

                <AnimatePresence>
                    {showToast && (
                        <motion.div
                            initial={{ opacity: 0, y: 140 }}
                            animate={{ opacity: 100, y: 0, scale: 1, x: 0 }}
                            exit={{ opacity: 0, x: 300, scale: 0.8 }}
                            transition={{ ease: 'backOut', duration: 0.4 }}
                            className='bottom-4 right-4 absolute'
                        >
                            <motion.div
                                initial={{ bottom: 12, right: 12 }}
                                animate={{ bottom: -100, right: 12 }}
                                transition={{ delay: 2, ease: 'backInOut', duration: 0.45 }}
                                style={{ background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.20) 100%), #7B7B7B', boxShadow: '0px -1px 3px 1px #828282 inset' }}
                                className='rounded-3xl relative contrast-125'
                            >
                                <div className='flex items-start justify-between min-w-[400px] text-white p-4 h-[130px]'>
                                    <div className='flex flex-col justify-between h-full'>
                                        <div>
                                            <p className='font-semibold text-[15px]'>Updating party</p>
                                            <p className='text-[13px] opacity-70 font-medium mt-1'>Airbnb → Travel</p>
                                        </div>
                                        <div>
                                            <button className='text-xs bg-black/20 p-1.5 rounded-lg px-3'>
                                                Cancel
                                            </button>
                                        </div>
                                    </div>

                                    <div className='relative'>
                                        <motion.div
                                            initial={{ opacity: 1, scale: 1 }}
                                            animate={{ opacity: 0, scale: 0 }}
                                            transition={{ delay: 4, ease: 'backIn', duration: 0.3 }}
                                            className='right-0 absolute'
                                        >
                                            <div className='animate-spin'>
                                                <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_307_29406)">
                                                        <path d="M9 3.75V6.25" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path opacity="0.88" d="M14.1274 5.87305L12.3594 7.64105" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path opacity="0.75" d="M16.25 11H13.75" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path opacity="0.63" d="M14.1274 16.127L12.3594 14.359" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path opacity="0.5" d="M9 18.25V15.75" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path opacity="0.38" d="M3.87305 16.127L5.64105 14.359" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path opacity="0.25" d="M1.75 11H4.25" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path opacity="0.13" d="M3.87305 5.87305L5.64105 7.64105" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_307_29406">
                                                            <rect width="18" height="18" fill="white" transform="translate(0 2)" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 4.4, ease: 'backOut', duration: 0.3 }}
                                            className='absolute right-0'
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><title>circle-check</title><g fill="currentColor"><path d="M9,1C4.589,1,1,4.589,1,9s3.589,8,8,8,8-3.589,8-8S13.411,1,9,1Zm3.843,5.708l-4.25,5.5c-.136,.176-.343,.283-.565,.291-.01,0-.019,0-.028,0-.212,0-.415-.09-.558-.248l-2.25-2.5c-.277-.308-.252-.782,.056-1.06,.309-.276,.781-.252,1.06,.056l1.648,1.832,3.701-4.789c.253-.328,.725-.388,1.052-.135,.328,.253,.388,.724,.135,1.052Z"></path></g></svg>
                                        </motion.div>

                                    </div>

                                </div>

                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>


        </div>
    )
}

export default AutoMinimizeToast