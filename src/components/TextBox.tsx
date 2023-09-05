import { Box, Stack } from "@mui/material"
import { Word } from "./Word"
import { IWord } from "../interfaces/IWord"

type Props = {
   text: IWord[]
   errors: number[]
   current: number
}

export function TextBox({ text, errors, current }: Props) {
   return (
      <Box
         bgcolor={'grey.800'}
         maxHeight={'100px'}
         overflow={'hidden'}
         padding={'1rem'}
         borderRadius={'6px'}
      >
         <Stack direction={'row'} flexWrap={'wrap'} gap={'8px'}>
            {text.map((word, index) => (
               <Word
                  key={word.id}
                  id={word.id}
                  word={word.word}
                  isOpaque={index - 1 > current}
                  isHighlighted={current === index}
                  isRight={index < current && !errors.includes(index)}
                  isWrong={errors.includes(index)}
               />
            ))}
         </Stack>

      </Box>
   )
}