'use client'
import { useEffect, useState } from 'react'

import { motion } from 'motion/react'

let interval: any

type Card = {
  id: number
  content: React.ReactNode
}

const CardStack = ({
  items,
  offset,
  direction = 'left'
}: {
  items: Card[]
  offset?: number
  direction?: 'left' | 'right'
}) => {
  const CARD_OFFSET = offset || 20
  const [cards, setCards] = useState<Card[]>(items)

  useEffect(() => {
    startFlipping()

    return () => clearInterval(interval)
  }, [])

  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards] // create a copy of the array

        newArray.unshift(newArray.pop()!) // move the last element to the front

        return newArray
      })
    }, 2200)
  }

  return (
    <div className='relative *:w-full *:max-w-57.5'>
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className='absolute'
            style={{
              transformOrigin: 'top center'
            }}
            animate={{
              top: index * -CARD_OFFSET,
              ...(direction === 'left' ? { left: index * -CARD_OFFSET } : { right: index * -CARD_OFFSET }),
              zIndex: cards.length - index
            }}
          >
            {card.content}
          </motion.div>
        )
      })}
    </div>
  )
}

export default CardStack
