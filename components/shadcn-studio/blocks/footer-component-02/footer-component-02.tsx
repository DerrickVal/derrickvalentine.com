import { ArrowRightIcon } from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

import GithubIcon from '@/assets/svg/github-icon'
import InstagramIcon from '@/assets/svg/instagram-icon'
import TwitterIcon from '@/assets/svg/twitter-icon'
import YoutubeIcon from '@/assets/svg/youtube-icon'

const Footer = () => {
  return (
    <footer>
      <div className='mx-auto grid max-w-7xl grid-cols-6 gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-16 md:py-24'>
        <div className='col-span-full flex flex-col items-start gap-4 lg:col-span-2'>
          <Link href='/' className='inline-block'>
            <Image src='/logo-black.png' alt='Derrick Valentine' width={392} height={111} className='h-8 w-auto' />
          </Link>
          <p className='text-muted-foreground'>
            I redesign, host, and maintain websites for small businesses, nonprofits, and creatives, so you can get
            back to the work you&apos;re great at. One developer, a text away.
          </p>
          <Separator className='w-35!' />
          {/* Social links — kept as placeholders (light marketing social proof to come). */}
          <div className='flex items-center gap-4'>
            <a href='#' aria-label='GitHub'>
              <GithubIcon className='size-5' />
            </a>
            <a href='#' aria-label='Instagram'>
              <InstagramIcon className='size-5 text-sky-600 dark:text-sky-400' />
            </a>
            <a href='#' aria-label='Twitter'>
              <TwitterIcon className='size-5 text-amber-600 dark:text-amber-400' />
            </a>
            <a href='#' aria-label='YouTube'>
              <YoutubeIcon className='text-destructive size-5' />
            </a>
          </div>
        </div>
        <div className='col-span-full grid grid-cols-2 gap-6 sm:grid-cols-4 lg:col-span-4 lg:gap-8'>
          <div className='flex flex-col gap-5'>
            <div className='text-lg font-medium'>Explore</div>
            <ul className='text-muted-foreground space-y-3'>
              <li>
                <a href='/services' className='hover:text-foreground transition-colors duration-300'>
                  Services
                </a>
              </li>
              <li>
                <a href='/work' className='hover:text-foreground transition-colors duration-300'>
                  Work
                </a>
              </li>
              <li>
                <a href='/pricing' className='hover:text-foreground transition-colors duration-300'>
                  Pricing
                </a>
              </li>
              <li>
                <a href='/resources' className='hover:text-foreground transition-colors duration-300'>
                  Resources
                </a>
              </li>
            </ul>
          </div>
          <div className='flex flex-col gap-5'>
            <div className='text-lg font-medium'>Company</div>
            <ul className='text-muted-foreground space-y-3'>
              <li>
                <a href='/about' className='hover:text-foreground transition-colors duration-300'>
                  About
                </a>
              </li>
              <li>
                <a href='/contact' className='hover:text-foreground transition-colors duration-300'>
                  Contact
                </a>
              </li>
              <li>
                <a href='/contact' className='hover:text-foreground transition-colors duration-300'>
                  Request a Website Review
                </a>
              </li>
            </ul>
          </div>
          <div className='col-span-full flex flex-col gap-5 sm:col-span-2'>
            <div>
              <p className='mb-3 text-lg font-medium'>Get occasional updates</p>
              <div className='flex gap-2'>
                <Input type='email' placeholder='Your email...' />
                <Button size='icon' type='submit' className='rounded-lg'>
                  <ArrowRightIcon />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className='mx-auto flex max-w-7xl justify-center px-4 py-6 sm:px-6'>
        <p className='text-center font-medium text-balance'>
          {`© ${new Date().getFullYear()} Derrick Valentine`} · Web developer in the DMV
        </p>
      </div>
    </footer>
  )
}

export default Footer
