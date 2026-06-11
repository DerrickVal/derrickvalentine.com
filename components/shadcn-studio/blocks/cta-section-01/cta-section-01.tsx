import { Card, CardContent } from '@/components/ui/card'

const CTA = () => {
  return (
    <section className='bg-muted py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <Card className='rounded-[24px] border-none py-8 shadow-lg sm:py-16 lg:py-24'>
          <CardContent className='flex flex-wrap items-center justify-between gap-8 px-8 sm:flex-nowrap sm:px-16 lg:px-24'>
            <div className='max-w-xs lg:max-w-lg'>
              <h2 className='mb-4 text-3xl font-bold'>Let&apos;s get your website off your plate.</h2>
              <p className='text-muted-foreground text-lg font-medium'>
                Send me your current site and I&apos;ll tell you what I&apos;d fix. Free, no pitch. From there it&apos;s one
                text away from handled.
              </p>
            </div>
            <div className='flex flex-wrap items-center gap-6 max-md:w-full max-md:flex-col md:justify-end'>
              <a
                href='/contact'
                className='bg-card-foreground text-card flex items-center justify-center rounded-md px-8 py-4 text-base font-medium whitespace-nowrap'
              >
                Request a Website Review
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default CTA
