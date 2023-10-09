import { Box, Stack, SxProps } from "@mui/material"
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
      if(!boxRef.current) return
      if(!currentRef.current) return      

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
      <Box
         ref={boxRef}
         bgcolor={'primary.dark'}
         maxHeight={'100px'}
         overflow={'hidden'}
         padding={'1rem'}
         borderRadius={'8px'}
      >
         <Stack direction={'row'} flexWrap={'wrap'} gap={'4px'}>
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
         </Stack>

      </Box>
   )
}