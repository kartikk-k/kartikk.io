'use client'

import Link from 'next/link';
import Image from 'next/image';

import BarGraphConceptImg from '@/assets/designs/bar-graph-concept.png';
import ConsumerAppImg from '@/assets/designs/consumer-app.png';
import F1LapImg from '@/assets/designs/f1-lap.png';
import GymNotesBannerImg from '@/assets/designs/gym-notes-banner.png';
import GymNotesHomeImg from '@/assets/designs/gym-notes-home.png';
import LegixHomePageImg from '@/assets/designs/legix-home-page.png';
import PortfolioExampleImg from '@/assets/designs/portfolio-example.png';
import PosterImg from '@/assets/designs/poster.png';
import QuickTipToastImg from '@/assets/designs/quick-tip-toast.png';
import SupermemoryConceptImg from '@/assets/designs/supermemory-concept.png';

function page() {

    return (
        <div className='min-h-[120dvh] md:min-h-screen w-screen bg-white relative overflow-x-hidden'>

            <div className='max-w-2xl mx-auto mt-16 px-2 pb-20 z-10 relative text-sm space-y-4'>

                <div className='flex justify-center pb-4'>
                    <div className='flex items-center w-full'>
                        <div className='relative flex-1 px-2'>
                            <Link href={'/'} className='flex flex-col gap-1'>
                                <span className='text-black/60 text-xs font-light flex items-center gap-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className='opacity-60' width="18" height="18" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="currentColor"><line x1="2.75" y1="9" x2="15.25" y2="9"></line><polyline points="7 13.25 2.75 9 7 4.75"></polyline></g></svg>
                                    Go Back
                                </span>
                            </Link>
                        </div>
                    </div>

                </div>

                <Image src={LegixHomePageImg} alt='Legix Home Page' className='w-full ' />
                <Image src={GymNotesBannerImg} alt='Gym Notes Banner' className='w-full ' />
                <Image src={GymNotesHomeImg} alt='Gym Notes Home' className='w-full ' />
                <Image src={PortfolioExampleImg} alt='Portfolio Example' className='w-full ' />
                <Image src={QuickTipToastImg} alt='Quick Tip Toast' className='w-full ' />
                <Image src={SupermemoryConceptImg} alt='Supermemory Concept' className='w-full ' />
                <Image src={ConsumerAppImg} alt='Consumer App' className='w-full ' />
                <Image src={BarGraphConceptImg} alt='Bar Graph Concept' className='w-full shadow-2xl' />
                <Image src={F1LapImg} alt='F1 Lap' className='w-full ' />
                <Image src={PosterImg} alt='Poster' className='w-full ' />

            </div>

        </div>
    )
}

export default page