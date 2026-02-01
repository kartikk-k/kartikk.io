'use client'

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
            <span className='text-[11px] absolute font-medium -top-3.5 opacity-60'>hey, I'm</span>

            <Link href={'/'} className='flex flex-col gap-1'>
              <span className='text-[#16d99b] font-light'>kartikk</span>
            </Link>
          </div>

          <Link href={'/designs'} className='flex text-sm font-medium text-[#16d99b] h-7 hover:brightness-75 duration-300 relative -top-1'>
            <span className='flex flex-col'>
              <span
                className='flex-1 bg-[#16d99b]'
              />
              <svg width="12" height="12" className='rotate-180' viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 4H4V8H8V4H12V8H8V12H0V4H4V0H8V4Z" fill="currentColor" />
              </svg>
            </span>
            <span className='bg-[#16d99b] text-[13px] text-black flex items-center px-2'>
              designs
            </span>
            <span className='flex flex-col'>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 4H4V8H8V4H12V8H8V12H0V4H4V0H8V4Z" fill="currentColor" />
              </svg>
              <span
                className='flex-1 bg-[#16d99b]'
              />
            </span>

          </Link>

        </div>

        <div className='text-white/70 mt-10 text-sm sm:text-base'>
          <p className='text-white'>
            design engineer building exceptional products
          </p>
          <p className='flex flex-wrap items-center gap-x-2 gap-y-1 mt-4 text-sm'>
            passionately designing web app experiences that blends creativity with strong engineering
          </p>

          <p className='mt-2 text-sm'>
            i like to&nbsp;
            {/* <Link href={'/designs'} className='underline'>design</Link>,&nbsp; */}
            design, craft user experiences,
            {/* <Link href={'/lab'} className='underline'></Link>, */}
            &nbsp;build things very quickly and ship often <Link href={'https://github.com/kartikk-k'} target='_blank' className='italic opacity-60'>{`(visit github)`}</Link>
          </p>

          <div className='mt-6'>
            <p className='opacity-60 text-xs'>currently:</p>
            <p className='text-sm'>
              working at <Link href={'#'} className=''>Legix</Link> as a Founding Design Engineer
            </p>
          </div>

        </div>

        <div className='text-[13px] mt-8 sm:mt-10 font-medium flex items-start gap-3'>
          <Link href={'https://cal.com/kartik-khorwal-bjlmzq/30min'} target='_blank' className='flex items-center cursor-pointer gap-1.5 w-36 justify-center h-9 bg-white/20 text-white/80 hover:text-white duration-200 pl-2.5 sm:pl-3 pr-3 sm:pr-3.5'>
            <svg xmlns="http://www.w3.org/2000/svg" className='size-3.5' width="18" height="18" viewBox="0 0 18 18"><g fill="currentColor"><path d="M13.75 2H13V0.75C13 0.336 12.664 0 12.25 0C11.836 0 11.5 0.336 11.5 0.75V2H6.5V0.75C6.5 0.336 6.164 0 5.75 0C5.336 0 5 0.336 5 0.75V2H4.25C2.733 2 1.5 3.233 1.5 4.75V13.25C1.5 14.767 2.733 16 4.25 16H8.27656C8.69056 16 9.02656 15.664 9.02656 15.25C9.02656 14.836 8.69056 14.5 8.27656 14.5H4.25C3.561 14.5 3 13.939 3 13.25V7H15V10.9116C15 11.3256 15.336 11.6616 15.75 11.6616C16.164 11.6616 16.5 11.3256 16.5 10.9116V4.75C16.5 3.233 15.267 2 13.75 2Z"></path> <path d="M16.235 13.499L15.376 13.151C14.856 12.921 14.247 13.068 13.909 13.491L12.901 14.66C12.277 14.256 11.744 13.723 11.339 13.099L12.489 12.107C12.93 11.753 13.079 11.144 12.858 10.646L12.49 9.74299C12.242 9.17999 11.622 8.88599 10.989 9.05299L9.87699 9.41799C9.33399 9.59699 8.97799 10.115 9.01299 10.68C9.22599 14.062 11.937 16.773 15.32 16.986C15.345 16.987 15.372 16.988 15.397 16.988C15.93 16.988 16.411 16.64 16.582 16.121L16.96 14.965C17.115 14.37 16.819 13.757 16.235 13.499Z"></path></g></svg>
            Schedule a call
          </Link>
          <Link href={'https://x.com/kartik_builds'} target='_blank' className='flex items-center cursor-pointer gap-1.5 h-9 w-36 justify-center border border-white/20 text-white/70 hover:text-white duration-200 pl-2.5 sm:pl-3 pr-3 sm:pr-3.5'>
            <svg xmlns="http://www.w3.org/2000/svg" className='size-3.5' width="32" height="32" viewBox="0 0 32 32"><g fill="currentColor"><path d="M18.42,14.009L27.891,3h-2.244l-8.224,9.559L10.855,3H3.28l9.932,14.455L3.28,29h2.244l8.684-10.095,6.936,10.095h7.576l-10.301-14.991h0Zm-3.074,3.573l-1.006-1.439L6.333,4.69h3.447l6.462,9.243,1.006,1.439,8.4,12.015h-3.447l-6.854-9.804h0Z"></path></g></svg>
            Drop a Message
          </Link>
        </div>

        <div className='mt-20 text-sm'>
          <div className='flex items-center gap-2 relative'>
            <h3 className='opacity-60 text-[13px]'>Highlighted work</h3>
          </div>

          <div className='mt-4 space-y-3 text-[13px]'>

            <div className='border-b border-dashed border-white/20 pb-3'>
              <Link href={'https://www.producthunt.com/products/supermemory'} target='_blank' className='text-[13px]'>
                <p>Supermemory {"("}Prev: Team member{")"}</p>
                <p className='text-xs opacity-60 mt-1'>#1 Product of the Day <br />
                  9k+ Github stars</p>
              </Link>
            </div>

            <div className='border-b border-dashed border-white/20 pb-3'>
              <Link href={'https://x.com/GroqInc/status/1890086837903151607?s=20'} target='_blank' className='text-[13px]'>
                <p>Aura Checker {"("}UI Design & Frontend{")"}</p>
                <p className='text-xs opacity-60 mt-1'>Mentioned and used by team at Groq.com</p>
              </Link>
            </div>

            <div className='border-b border-dashed border-white/20 pb-3'>
              <Link href={'https://github.com/stitionai/devika'} target='_blank' className='text-[13px]'>
                <p>Stitionai / Devika {"("}Contributor - UI Design & Frontend{")"}</p>
                <p className='text-xs opacity-60 mt-1'>Backed by Y Combinator<br />
                  19.1k+ Github stars</p>
              </Link>
            </div>

            <div className='border-b border-dashed border-white/20 pb-3'>
              <Link href={'https://peerlist.io/kartikk/project/repochat'} target='_blank' className='text-[13px]'>
                <p>Repochat {"("}Open Source Project{")"}</p>
                <p className='text-xs opacity-60 mt-1'>Code context for LLMs directly from GitHub repositories</p>
              </Link>
            </div>

            <div className='border-b border-dashed border-white/20 pb-3'>
              <Link href={'https://github.com/kartikk-k/visionOS-cricket'} target='_blank' className='text-[13px]'>
                <p>VisionOS Cricket (Project)</p>
                <p className='text-xs opacity-60 mt-1'>Concept - experiencing cricket/sports on Apple VisionOS</p>
              </Link>
            </div>

          </div>
        </div>


        <p className='text-white/60 text-xs sm:text-[13px] mt-32'>
          Socials:&nbsp;
          <Link target='_blank' href={'http://x.com/kartik_builds'} className='underline hover:text-white/90'>Twitter</Link> •&nbsp;
          <Link target='_blank' href={'https://github.com/kartikk-k'} className='underline hover:text-white/90'>Github</Link> •&nbsp;
          <Link target='_blank' href={'https://www.linkedin.com/in/kartik-khorwal'} className='underline hover:text-white/90'>LinkedIn</Link> •&nbsp;
          <Link target='_blank' href={'https://layers.to/kartikk'} className='underline hover:text-white/90'>Layers</Link>
        </p>

      </div>

    </div>
  )
}

export default page