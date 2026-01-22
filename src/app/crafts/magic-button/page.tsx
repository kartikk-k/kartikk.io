"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'motion/react'
import { span } from "motion/react-client";
import { LiquidMetal } from "@paper-design/shaders-react";

function page() {


    return (
        <div className='min-h-screen text-black/80 font-medium bg-white flex items-center justify-center'>


            <div className="rounded-full">
                <div className="relative z-10 p-1 rounded-full flex items-center justify-center overflow-hidden outline-2 -outline-offset-2 outline-black/40 active:scale-95 transition-all duration-200">
                    <button
                        // className='bg-linear-to-b from-white font-medium to-neutral-200 relative z-10 px-4 h-10 rounded-full flex items-center justify-center overflow-hidden text-sm cursor-pointer'
                        className=' font-medium bg-black/30 text-white backdrop-blur-sm relative z-10 px-6 h-10 rounded-full flex items-center justify-center overflow-hidden text-sm cursor-pointer'
                    >
                        Create a task
                    </button>

                    <div className="absolute opacity-70">
                        <LiquidMetal
                            width={800}
                            height={600}
                            rotation={45}
                            // image="https://shaders.paper.design/images/logos/diamond.svg"
                            colorBack="#F5F5F5"
                            colorTint="#ffffff"
                            shape="metaballs"
                            repetition={1.5}
                            softness={0.1}
                            shiftRed={0.3}
                            shiftBlue={0.3}
                            distortion={0.07}
                            contour={0.4}
                            angle={70}
                            speed={1.2}
                            scale={0.5}
                            fit="contain"
                        />
                    </div>

                </div>
            </div>

        </div>
    )
}

export default page