import { Box, FilledInput, InputBase, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material"
import React, { useState, useMemo, useEffect } from "react"
import { TextBox } from "./components/TextBox"
import { Languages } from './resources/languages.ts'
import { IWord } from "./interfaces/IWord.ts"

function App() {

   const generateText = (words: string[]) => Array(250).fill(null).map(() => ({
      id: crypto.randomUUID(),
      word: words[Math.floor(Math.random() * words.length)]
   }))


   const [language, setLanguage] = useState(Languages[0])
   const [typed, setTyped] = useState<string>('')
   const [errors, setErrors] = useState<number[]>([])
   const [current, setCurrent] = useState<number>(0)
   const [text, setText] = useState<IWord[]>(generateText(language.words))

   useEffect(() => {

      setTyped('')
      setErrors([])
      setCurrent(0)
      setText(generateText(language.words))

   }, [language])

   const handleKeyup = (event: React.KeyboardEvent) => {
      const pressedSpace = event.key === ' '
      const typedSomething = !!typed

      if (!pressedSpace) {
         return
      }

      if (!typedSomething) {
         setTyped('')
         return
      }

      if (pressedSpace) {
         if (typed.trim() !== text[current].word) setErrors([...errors, current])

         setTyped('')
         setCurrent(current + 1)
      }
   }

   const handleInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
      setTyped(event.target.value)
   }


   return (
      <Stack
         bgcolor={'grey.900'}
         width={'100%'}
         height={'100%'}
         padding={'15% 15%'}
      >
         <Stack gap={'1rem'}>
            <TextBox
               current={current}
               text={text}
               errors={errors}
            />

            <Box display={'flex'} justifyContent={'center'}>
               <FilledInput
                  autoFocus
                  value={typed}
                  onInput={(event) => handleInput(event)}
                  onKeyUp={(event) => handleKeyup(event)}
               />
            </Box>
         </Stack>

      </Stack>
   )
}

export default App
