import type { ComponentType } from 'react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'

import { MotionPreset } from '@/components/ui/motion-preset'

type FAQs = {
  icon: ComponentType
  title: string
  subtitle: string
  description: string
}[]

const FAQ = ({ faqItems }: { faqItems: FAQs }) => {
  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* FAQ Header */}
        <div className='mb-12 space-y-4 text-center sm:mb-16 lg:mb-24'>
          <MotionPreset
            component='h2'
            className='text-2xl font-semibold md:text-3xl lg:text-4xl'
            fade
            slide
            transition={{ duration: 0.7 }}
          >
            <span className='relative z-10'>
              Frequently Asked
              <span className='bg-primary absolute bottom-1 left-0 -z-10 h-px w-full'></span>
            </span>
            <span> Questions</span>
          </MotionPreset>

          <MotionPreset
            component='p'
            className='text-muted-foreground text-xl'
            fade
            slide
            delay={0.3}
            transition={{ duration: 0.7 }}
          >
            The money questions, answered straight. No fine print.
          </MotionPreset>
        </div>

        <div className='grid grid-cols-1 gap-x-16 gap-y-6 md:grid-cols-2'>
          {faqItems.map((item, index) => {
            const IconComponent = item.icon

            return (
              <MotionPreset key={index} delay={0.6 + index * 0.15} fade blur transition={{ duration: 0.7 }}>
                <div className='space-y-4 p-6'>
                  <div className='flex gap-4'>
                    <Avatar className='size-10.5 rounded-sm'>
                      <AvatarFallback className='bg-primary/10 text-primary rounded-sm [&>svg]:size-5'>
                        <IconComponent />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className='mb-0.5 text-xl font-medium'>{item.title}</h3>
                      <p className='text-muted-foreground text-sm'>{item.subtitle}</p>
                    </div>
                  </div>
                  <p className='text-muted-foreground'>{item.description}</p>
                </div>
              </MotionPreset>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQ
