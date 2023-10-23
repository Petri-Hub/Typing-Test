import React from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
   word: string
   id: string
   isHighlighted: boolean
   isWrong: boolean
   isRight: boolean
}

export const Word = React.forwardRef(({ word, isHighlighted, isWrong, isRight }: Props, ref: React.ForwardedRef<HTMLParagraphElement>) => {
   return (
      <span
         ref={ref}
         className={twMerge(
            "text-gray-400 p-2 py-1 rounded-md text-md font-medium",
            isWrong && 'text-red-400',
            isRight && 'text-green-600',
            isHighlighted && 'bg-blue-300 text-white',
            isHighlighted && isWrong && 'bg-red-400 text-white'
         )}>
         {word}
      </span>
   )
})