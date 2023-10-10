import { Word } from "./Word"
import { IWord } from "../interfaces/IWord"
import { useRef } from "react"

type Props = {
   text: IWord[]
   errors: number[]
   current: number
   typed: string
}


export function TextBox({ text, errors, current, typed }: Props) {

   const boxRef = useRef<HTMLDivElement>(null)
   const currentRef = useRef<HTMLParagraphElement>(null)

   const scrollToCurrent = () => {
      if (!boxRef.current) return
      if (!currentRef.current) return

      const currentBounding = currentRef.current.getBoundingClientRect()
      const boxBounding = boxRef.current.getBoundingClientRect()
      const scrollTop = (currentBounding.top + boxRef.current.scrollTop) - boxBounding.top - 16

      boxRef.current.scrollTo({
         left: 0,
         top: scrollTop,
      })
   }

   scrollToCurrent()

   return (
      <div
         className="bg-gray-100 w-full rounded-lg p-4 max-h-28 overflow-hidden"
         ref={boxRef}
      >
         <div className="flex items-center gap-x-3 gap-y-2 flex-wrap">
            {text.map((word, index) => {
               const possibleRef = index === current ? { ref: currentRef } : {}

               return <Word
                  key={word.id}
                  id={word.id}
                  word={word.word}
                  isOpaque={index - 1 > current}
                  isHighlighted={current === index}
                  isRight={index < current && !errors.includes(index)}
                  isWrong={errors.includes(index) || (index === current && !word.word.startsWith(typed))}
                  {...possibleRef}
               />
            })}
         </div>

      </div>
   )
}