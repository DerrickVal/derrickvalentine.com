'use client'

import { useEffect } from 'react'

import { CheckIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import { cn } from '@/lib/utils'

export type PricingPlan = {
  name: string
  price: string
  period?: string
  description: string
  buttonText: string
  buttonHref: string
  features: string[]
  highlighted?: boolean
}

type PricingProps = {
  heading: string
  subheading: string
  plans: PricingPlan[]
}

const Pricing = ({ heading, subheading, plans }: PricingProps) => {
  useEffect(() => {
    const all = document.querySelectorAll('.card')

    const handleMouseMove = (ev: MouseEvent) => {
      all.forEach(e => {
        const blob = e.querySelector('.blob') as HTMLElement
        const fblob = e.querySelector('.fake-blob') as HTMLElement

        if (!blob || !fblob) return

        const rec = fblob.getBoundingClientRect()

        blob.style.opacity = '0.8'

        blob.animate(
          [
            {
              transform: `translate(${ev.clientX - rec.left - 24 - rec.width / 2}px, ${
                ev.clientY - rec.top - 24 - rec.height / 2
              }px)`
            }
          ],
          {
            duration: 300,
            fill: 'forwards'
          }
        )
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl space-y-12 px-4 sm:space-y-16 sm:px-6 lg:space-y-24 lg:px-8'>
        <div className='flex flex-col items-center gap-4'>
          <div className='flex flex-col gap-0.5 text-center'>
            <h2 className='text-2xl font-semibold sm:text-3xl lg:text-4xl'>{heading}</h2>
            <Separator className='bg-primary h-px' />
          </div>
          <p className='text-muted-foreground max-w-2xl text-center text-xl font-normal'>{subheading}</p>
        </div>

        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {plans.map((plan, index) => (
            <div
              className={cn(
                'bg-foreground/10 card group relative h-full overflow-hidden rounded-xl p-px transition-all duration-300 ease-in-out max-lg:last:col-span-full',
                { 'p-0': plan.highlighted }
              )}
              key={index}
            >
              <Card
                className={cn('group-hover:bg-card/90 h-full shadow-none transition-all duration-300 ease-in-out', {
                  'border-primary border-2': plan.highlighted
                })}
              >
                <CardContent className='flex flex-col gap-6'>
                  <div className='flex flex-col gap-4'>
                    <div className='flex flex-wrap items-center gap-2'>
                      <h3 className='text-2xl font-semibold'>{plan.name}</h3>
                      {plan.highlighted && (
                        <span className='bg-primary text-primary-foreground rounded-full px-2.5 py-0.5 text-xs font-medium'>
                          Most popular
                        </span>
                      )}
                    </div>
                    <div className='flex items-end gap-1'>
                      <span className='text-3xl font-bold'>{plan.price}</span>
                      {plan.period && (
                        <span className='text-muted-foreground self-end text-lg font-normal'>{plan.period}</span>
                      )}
                    </div>
                    <p className='text-muted-foreground text-base font-normal'>{plan.description}</p>
                  </div>

                  <Button
                    size='lg'
                    className='border-primary'
                    variant={plan.highlighted ? 'default' : 'outline'}
                    asChild
                  >
                    <a href={plan.buttonHref}>{plan.buttonText}</a>
                  </Button>

                  <div className='flex flex-col gap-1.5'>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className='flex items-start gap-2 py-1'>
                        <CheckIcon className='text-primary mt-0.5 size-4 shrink-0' />
                        <span className='text-base font-normal'>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <div className='blob bg-primary absolute top-0 left-0 -z-1 size-62.5 rounded-full opacity-0 blur-2xl transition-all duration-300 ease-in-out' />
              <div className='fake-blob absolute top-0 left-0 -z-1 [display:hidden] size-40 rounded-full' />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Pricing
