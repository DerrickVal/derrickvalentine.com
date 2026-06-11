'use client'

import { ArrowRightIcon } from 'lucide-react'

import { MotionPreset } from '@/components/ui/motion-preset'

import { PrimaryGrowButton, SecondaryGrowButton } from '@/components/ui/grow-button'
import GrowLogo from '@/assets/svg/grow-logo'

import { Marquee } from '@/components/ui/marquee'

import CardStack from '@/components/shadcn-studio/blocks/hero-section-37/card-stack'
import StatisticsOrderCard from '@/components/shadcn-studio/blocks/hero-section-37/statistics-order-card'
import StatisticsImpressionCard from '@/components/shadcn-studio/blocks/hero-section-37/statistics-impression-card'

const items = [
  {
    id: 1,
    content: <StatisticsOrderCard className='w-full max-w-57.5' />
  },
  {
    id: 2,
    content: <StatisticsImpressionCard className='w-full max-w-57.5' />
  }
]

const items2 = [
  {
    id: 1,

    content: <StatisticsImpressionCard className='w-full max-w-57.5' />
  },
  {
    id: 2,
    content: <StatisticsOrderCard className='w-full max-w-57.5' />
  }
]

const HeroSection = () => {
  return (
    <section className='relative flex-1'>
      <MotionPreset
        fade
        blur
        transition={{ duration: 0.5 }}
        delay={1}
        className='bg-accent absolute left-1/2 z-1 hidden size-28.75 -translate-x-27 -rotate-16 flex-col items-center justify-center gap-3 rounded-lg border-3 shadow-[inset_0_0_15px_color-mix(in_oklab,var(--primary)60%,transparent)] md:top-9 md:flex lg:top-12'
      >
        <GrowLogo className='size-8' />
        <img
          src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/cta/grow-text.png'
          alt='Website Mockups Grid'
          className='w-16 dark:hidden'
        />
        <img
          src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/cta/grow-text-dark.png'
          alt='Website Mockups Grid'
          className='hidden w-16 dark:inline-block'
        />
      </MotionPreset>
      <MotionPreset
        fade
        blur
        transition={{ duration: 0.5 }}
        delay={1}
        className='group absolute top-[42%] left-[4%] w-full max-w-57.5 -rotate-21 max-xl:hidden 2xl:left-[13%]'
      >
        <CardStack items={items} direction='left' />
      </MotionPreset>
      <MotionPreset
        fade
        blur
        transition={{ duration: 0.5 }}
        delay={1}
        className='group absolute top-[42%] right-[4%] w-full max-w-57.5 rotate-21 max-xl:hidden 2xl:right-[13%]'
      >
        <CardStack items={items2} direction='right' />
      </MotionPreset>
      <div className='space-y-16 py-12 md:pt-32 md:pb-24'>
        <div className='mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col text-2xl font-semibold *:text-center *:uppercase sm:gap-2 sm:text-5xl lg:text-7xl'>
            <div className='lg:overflow-hidden'>
              <MotionPreset fade slide={{ direction: 'down', offset: 60 }} delay={0.2} transition={{ duration: 0.5 }}>
                Your whole website.
              </MotionPreset>
            </div>
            <div className='lg:overflow-hidden'>
              <MotionPreset fade slide={{ direction: 'down', offset: 60 }} delay={0.4} transition={{ duration: 0.5 }}>
                Off your plate.
              </MotionPreset>
            </div>
            <div className='lg:overflow-hidden'>
              <MotionPreset fade slide={{ direction: 'down', offset: 60 }} delay={0.6} transition={{ duration: 0.5 }}>
                One text away.
              </MotionPreset>
            </div>
          </div>
          <MotionPreset fade zoom transition={{ duration: 0.5 }} delay={0.7} className='mx-auto max-w-2xl'>
            <p className='text-muted-foreground text-center text-lg'>
              I&apos;m Derrick Valentine. For ten years I&apos;ve redesigned, hosted, and maintained websites for small businesses, nonprofits, and creatives, so they can stop fighting with the web and get back to what they&apos;re great at. No agency. No bids. Just me, a text away.
            </p>
          </MotionPreset>

          <MotionPreset
            fade
            zoom
            transition={{ duration: 0.5 }}
            delay={0.7}
            className='flex flex-wrap items-center justify-center gap-4'
          >
            <PrimaryGrowButton asChild size='lg'>
              <a href='/contact'>Request a Website Review</a>
            </PrimaryGrowButton>
            <SecondaryGrowButton asChild className='group' size='lg'>
              <a href='/work'>
                See the work
                <ArrowRightIcon className='size-4 transition-transform duration-500 group-hover:translate-x-1' />
              </a>
            </SecondaryGrowButton>
          </MotionPreset>
        </div>
        {/* removed demo partner badges (Google/Meta/HubSpot) — not real affiliations */}
        <MotionPreset
          fade
          slide={{ direction: 'down', offset: 50 }}
          delay={0.9}
          transition={{ duration: 0.5 }}
          className='border-primary/10 relative overflow-hidden border-y py-2.5'
        >
          <div className='from-background pointer-events-none absolute inset-y-0 left-0 z-1 w-40 bg-linear-to-r from-30% to-transparent' />
          <div className='from-background pointer-events-none absolute inset-y-0 right-0 z-1 w-40 bg-linear-to-l from-30% to-transparent' />
          <Marquee pauseOnHover duration={20} reverse gap={4} className='*:items-center'>
            <img
              src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/dailydev-logo-bw.png'
              alt='Daily Dev'
              className='h-9.5 shrink-0'
            />
            <img
              src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/ycombinator-logo-bw.png'
              alt='Y Combinator'
              className='h-9 shrink-0'
            />
            <img
              src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/bestofjs-logo-bw.png'
              alt='Best of JS'
              className='h-9 shrink-0'
            />
            <img
              src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/product-hunt-logo-bw.png'
              alt='Product Hunt'
              className='h-9 shrink-0'
            />
            <img
              src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/reddit-logo-bw.png'
              alt='Reddit'
              className='h-9 shrink-0'
            />
            <img
              src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/launchtory-logo-bw.png'
              alt='Launchtory'
              className='h-11 shrink-0'
            />
            <img
              src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/medium-logo-bw.png'
              alt='Medium'
              className='h-8.5 shrink-0'
            />
            <img
              src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/devto-logo-bw.png'
              alt='Dev.to'
              className='h-11.5 shrink-0'
            />
          </Marquee>
        </MotionPreset>
      </div>
    </section>
  )
}

export default HeroSection
