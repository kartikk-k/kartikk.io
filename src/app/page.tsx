'use client'
import { Dithering } from '@paper-design/shaders-react'
import Link from 'next/link'
import { useEffect } from 'react'


function page() {

  // set bg for page based on scroll position
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;

      // Interpolate between #3b3b3b (top) and #151515 (bottom)
      const startColor = { r: 59, g: 59, b: 59 }; // #3b3b3b
      const endColor = { r: 21, g: 21, b: 21 };   // #151515

      const r = Math.round(startColor.r + (endColor.r - startColor.r) * scrollPercent);
      const g = Math.round(startColor.g + (endColor.g - startColor.g) * scrollPercent);
      const b = Math.round(startColor.b + (endColor.b - startColor.b) * scrollPercent);

      document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    };

    // Set initial color
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='min-h-screen w-screen bg-gradient-to-b from-[#3b3b3b] to-[#151515] relative overflow-x-hidden'>
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
        className="w-full h-full opacity-[0.02] bg-black bg-no-repeat fixed top-0 left-0 inset-0 pointer-events-none"
      />

      <div className='max-w-2xl mx-auto mt-16 sm:mt-16 px-10 sm:px-6 pb-20 relative z-10 min-h-[calc(100vh-64px)]'>

        <div className='relative'>
          <span className='text-[11px] absolute font-medium -top-3.5 opacity-60'>hey, I'm</span>

          <Link href={'#'} className='flex flex-col gap-1'>
            <span className='text-[#16d99b] font-light'>kartikk</span>
          </Link>
        </div>

        <div className='text-white/70 mt-6 text-sm sm:text-base'>
          <p className='text-white'>
            Design Engineer building exceptional products.
          </p>
          <p className='flex flex-wrap items-center gap-x-2 gap-y-1 mt-4 text-sm'>
            Passionately designing intuitive web app experiences that blend cutting-edge creativity with rock-solid engineering principles.
          </p>

          <p className='mt-1 text-sm'>
            I like to
            &nbsp;<Link href={'/designs'} className='underline'>design</Link>,
            &nbsp;<Link href={'/crafts'} className='underline'>craft user experiences</Link>,
            build things very quickly and ship often <Link href={'https://github.com/kartikk-k'} target='_blank' className='italic opacity-60'>{`(visit github)`}</Link>
          </p>

          <p className='mt-6 text-sm'>
            Currently working at <Link href={'#'} className=''>Legix</Link> as a Founding Design Engineer.
          </p>
        </div>

        <div className='text-[13px] mt-8 sm:mt-10 font-medium flex flex-col sm:flex-row items-start sm:items-center gap-3'>
          <Link href={'https://cal.com/kartik-khorwal-bjlmzq/30min'} target='_blank' className='flex items-center cursor-pointer gap-1.5 h-8 sm:h-9 bg-white/20 text-white/80 hover:text-white duration-200 rounded-lg pl-2.5 sm:pl-3 pr-3 sm:pr-3.5'>
            <svg xmlns="http://www.w3.org/2000/svg" className='size-3.5' width="18" height="18" viewBox="0 0 18 18"><g fill="currentColor"><path d="M13.75 2H13V0.75C13 0.336 12.664 0 12.25 0C11.836 0 11.5 0.336 11.5 0.75V2H6.5V0.75C6.5 0.336 6.164 0 5.75 0C5.336 0 5 0.336 5 0.75V2H4.25C2.733 2 1.5 3.233 1.5 4.75V13.25C1.5 14.767 2.733 16 4.25 16H8.27656C8.69056 16 9.02656 15.664 9.02656 15.25C9.02656 14.836 8.69056 14.5 8.27656 14.5H4.25C3.561 14.5 3 13.939 3 13.25V7H15V10.9116C15 11.3256 15.336 11.6616 15.75 11.6616C16.164 11.6616 16.5 11.3256 16.5 10.9116V4.75C16.5 3.233 15.267 2 13.75 2Z"></path> <path d="M16.235 13.499L15.376 13.151C14.856 12.921 14.247 13.068 13.909 13.491L12.901 14.66C12.277 14.256 11.744 13.723 11.339 13.099L12.489 12.107C12.93 11.753 13.079 11.144 12.858 10.646L12.49 9.74299C12.242 9.17999 11.622 8.88599 10.989 9.05299L9.87699 9.41799C9.33399 9.59699 8.97799 10.115 9.01299 10.68C9.22599 14.062 11.937 16.773 15.32 16.986C15.345 16.987 15.372 16.988 15.397 16.988C15.93 16.988 16.411 16.64 16.582 16.121L16.96 14.965C17.115 14.37 16.819 13.757 16.235 13.499Z"></path></g></svg>
            Schedule a call
          </Link>
          <Link href={'https://x.com/kartik_builds'} target='_blank' className='flex items-center cursor-pointer gap-1.5 h-8 sm:h-9 border border-white/20 text-white/70 hover:text-white duration-200 rounded-lg pl-2.5 sm:pl-3 pr-3 sm:pr-3.5'>
            <svg xmlns="http://www.w3.org/2000/svg" className='size-3.5' width="32" height="32" viewBox="0 0 32 32"><g fill="currentColor"><path d="M18.42,14.009L27.891,3h-2.244l-8.224,9.559L10.855,3H3.28l9.932,14.455L3.28,29h2.244l8.684-10.095,6.936,10.095h7.576l-10.301-14.991h0Zm-3.074,3.573l-1.006-1.439L6.333,4.69h3.447l6.462,9.243,1.006,1.439,8.4,12.015h-3.447l-6.854-9.804h0Z"></path></g></svg>
            Drop a Message
          </Link>
        </div>

        {/* <div className='mt-12 text-sm'>
          <h3 className='opacity-60'>Crafts</h3>

          <div className='mt-4 flex flex-col sm:flex-row gap-4'>
            <iframe src='/crafts/button-interaction' className='h-32 rounded-2xl'>
            </iframe>
            <iframe src='/crafts/magic-button' className='h-32 rounded-2xl'></iframe>
          </div>
        </div> */}


        <p className='text-white/60 text-[11px] sm:text-[13px] absolute bottom-4'>
          Socials:&nbsp;
          <Link target='_blank' href={'http://x.com/kartik_builds'} className='underline hover:text-white/90'>Twitter</Link> •&nbsp;
          <Link target='_blank' href={'https://github.com/kartikk-k'} className='underline hover:text-white/90'>Github</Link> •&nbsp;
          <Link target='_blank' href={'https://layers.to/kartikk'} className='underline hover:text-white/90'>Layers</Link>
        </p>

      </div>
    </div>
  )
}

export default page