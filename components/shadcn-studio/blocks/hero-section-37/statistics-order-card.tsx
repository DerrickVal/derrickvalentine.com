'use client'

import { Bar, BarChart } from 'recharts'

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

import { cn } from '@/lib/utils'

// Order chart data
const orderChartData = [
  { day: 'Monday', orders: 120 },
  { day: 'Tuesday', orders: 285 },
  { day: 'Wednesday', orders: 190 },
  { day: 'Thursday', orders: 190 },
  { day: 'Friday', orders: 315 },
  { day: 'Saturday', orders: 190 },
  { day: 'Sunday', orders: 220 }
]

const orderChartConfig = {
  orders: {
    label: 'Orders',
    color: 'var(--primary)'
  }
} satisfies ChartConfig

const StatisticsCardData = {
  title: 'Order',
  description: 'Last week',
  children: (
    <>
      <ChartContainer config={orderChartConfig} className='h-21 w-full px-2.75'>
        <BarChart
          accessibilityLayer
          data={orderChartData}
          barSize={12}
          margin={{
            left: 0,
            right: 0
          }}
        >
          <Bar
            dataKey='orders'
            fill='var(--color-orders)'
            background={{ fill: 'color-mix(in oklab, var(--primary) 10%, transparent)', radius: 12 }}
            radius={12}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        </BarChart>
      </ChartContainer>
    </>
  ),
  value: '124K',
  changePercentage: '+12.6%'
}

const StatisticsOrderCard = ({ className }: { className?: string }) => {
  return (
    <Card className={cn('gap-4', className)}>
      <CardHeader className='gap-0'>
        <CardTitle className='text-lg font-semibold'>{StatisticsCardData.title}</CardTitle>
        <CardDescription className='text-muted-foreground text-base'>{StatisticsCardData.description}</CardDescription>
      </CardHeader>
      {StatisticsCardData.children}

      <CardFooter className='justify-between'>
        <span className='text-xl font-semibold'>{StatisticsCardData.value}</span>
        <span className='text-primary'>{StatisticsCardData.changePercentage}</span>
      </CardFooter>
    </Card>
  )
}

export default StatisticsOrderCard
