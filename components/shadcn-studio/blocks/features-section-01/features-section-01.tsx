import type { ComponentType } from 'react'

import { ArrowRightIcon } from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import { cn } from '@/lib/utils'

type Features = {
  icon: ComponentType
  title: string
  description: string
  cardBorderColor: string
  avatarTextColor: string
  avatarBgColor: string
}[]

const Features = ({ featuresList }: { featuresList: Features }) => {
  return (
    <section className='brand-band py-24 sm:py-32 lg:py-40'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-12 space-y-4 sm:mb-16 lg:mb-24'>
          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>Everything a website needs. Handled by one person.</h2>
          <p className='text-muted-foreground text-xl'>
            You&apos;re great at your work. The website is the thing that&apos;s three years out of date and that you&apos;d
            rather never think about again. That part&apos;s on me.
          </p>
          <Button variant='outline' className='rounded-lg text-base shadow-none has-[>svg]:px-6' size='lg' asChild>
            <a href='/contact'>
              Request a Website Review
              <ArrowRightIcon />
            </a>
          </Button>
        </div>

        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {featuresList.map((features, index) => (
            <Card key={index} className={cn('shadow-none transition-colors duration-300', features.cardBorderColor)}>
              <CardContent>
                <Avatar className='mb-6 size-10 rounded-md'>
                  <AvatarFallback
                    className={cn('rounded-md [&>svg]:size-6', features.avatarBgColor, features.avatarTextColor)}
                  >
                    <features.icon />
                  </AvatarFallback>
                </Avatar>
                <h6 className='mb-2 text-lg font-semibold'>{features.title}</h6>
                <p className='text-muted-foreground'>{features.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
