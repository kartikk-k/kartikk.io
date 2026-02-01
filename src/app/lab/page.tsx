'use client'

import AutoMinimizeToast from '@/components/lab/AutoMinimizeToast';
import SubscribeButton from '@/components/lab/SubscribeButton';
import SyncButton from '@/components/lab/SyncButton';
import { Dithering } from '@paper-design/shaders-react';
import Link from 'next/link';
import { useEffect } from 'react';

function page() {

    // set bg for page based on scroll position
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const hexToRgb = (hex: string) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : { r: 0, g: 0, b: 0 };
        };

        const interpolateColor = (color1: string, color2: string, factor: number) => {
            const c1 = hexToRgb(color1);
            const c2 = hexToRgb(color2);
            const r = Math.round(c1.r + (c2.r - c1.r) * factor);
            const g = Math.round(c1.g + (c2.g - c1.g) * factor);
            const b = Math.round(c1.b + (c2.b - c1.b) * factor);
            return `rgb(${r}, ${g}, ${b})`;
        };

        const handleScroll = () => {
            const startColor = '#3A3A3A'; // color at top
            const endColor = '#161515';   // color at bottom

            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

            document.body.style.backgroundColor = interpolateColor(startColor, endColor, scrollProgress);
        };

        // Set initial color
        handleScroll();

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className='min-h-[120dvh] md:min-h-screen w-screen bg-linear-to-b from-[#3b3b3b] to-[#151515] relative overflow-x-hidden'>
            {/* do not change */}
            <Dithering
                speed={1}
                shape="warp"
                type="4x4"
                size={2.5}
                scale={1}
                frame={2084114.5999994797}
                colorBack="#00000000"
                colorFront="#FFFFFF"
                className="w-full h-[120dvh] opacity-[0.02] bg-black bg-no-repeat fixed -top-20 left-0 inset-0 pointer-events-none"
            />
            <div
                style={{ background: 'linear-gradient(180deg, rgba(59, 59, 59, 1) 0%, rgba(46.66, 46.66, 46.66, 0) 16%, rgba(40.29, 40.29, 40.29, 0) 83%, rgba(21, 21, 21, 1) 100%)' }}
                className='min-h-dvh w-full fixed z-10 md:hidden'
            />

            <div className='max-w-2xl mx-auto mt-20 md:mt-24 px-4 sm:px-6 pb-20 z-10 relative'>

                <div className='flex items-center'>
                    <div className='relative flex-1'>
                        <Link href={'/'} className='flex flex-col gap-1'>
                            <span className='text-[#16d99b] font-light'>kartikk</span>
                        </Link>
                    </div>
                </div>


                <div className='mt-12 space-y-4'>
                    <div className='h-[400px] bg-neutral-100 flex items-center justify-center'>
                        <div className='h-full relative w-full'>
                            <AutoMinimizeToast />
                        </div>
                    </div>

                    <div className='h-[400px] bg-neutral-100 flex items-center justify-center'>
                        <div className='scale-125'>
                            <SubscribeButton />
                        </div>
                    </div>

                    <div className='h-[400px] bg-white flex items-center justify-center'>
                        <div className='scale-125'>
                            <SyncButton />
                        </div>
                    </div>


                </div>

            </div>

        </div>
    )
}

export default page