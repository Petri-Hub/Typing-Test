import { Button, OutlinedInput, MenuItem, Stack, } from "@mui/material"
import React, { useState, useEffect, } from "react"
import { TextBox } from "./components/TextBox"
import { Languages } from './resources/languages.ts'
import { IWord } from "./interfaces/IWord.ts"
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ReplayIcon from '@mui/icons-material/Replay';
import Timer from "./components/Timer.tsx"
import Slider from '@mui/material/Slider';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import typeSound from './assets/audio/type.mp3'


function App() {

   const generateText = (words: string[]) => Array(250).fill(null).map(() => ({
      id: crypto.randomUUID(),
      word: words[Math.floor(Math.random() * words.length)]
   }))

   const [id, setID] = useState<string>(crypto.randomUUID())
   const [language, setLanguage] = useState(Languages[1])
   const [typed, setTyped] = useState<string>('')
   const [errors, setErrors] = useState<number[]>([])
   const [current, setCurrent] = useState<number>(0)
   const [text, setText] = useState<IWord[]>(generateText(language.words))
   const [volume, setVolume] = useState<number>((localStorage.getItem('volume') as number | null) ?? 50)
   const [finished, setFinished] = useState<boolean>(false)
   const [lastTypeStamp, setLastTypeStamp] = useState<null | number>(null)
   const [score, setScore] = useState({
      wrong: 0,
      right: 0
   })

   const handleReset = () => {
      setFinished(false)
      setID(crypto.randomUUID())
      setTyped('')
      setErrors([])
      setCurrent(0)
      setText(generateText(language.words))
      setScore({
         wrong: 0,
         right: 0
      })
   }

   const getCurrentWord = () => {
      return text[current].word
   }

   const isTypedEqualWord = () => {
      return getCurrentWord() === typed.trim()
   }

   const handleLanguageChange = (event: SelectChangeEvent) => {
      const selectedLang = Languages.find(language => language.id === event.target.value)

      if (!selectedLang) return

      setLanguage(selectedLang)
   }

   const handleVolumeChange = (newVolume: number) => {
      localStorage.setItem('volume', newVolume.toString())
      setVolume(newVolume)
   }

   const handleFinish = () => {
      if (!finished) return

      const lastKeyDifference = Math.floor((new Date().getTime() - (lastTypeStamp as number)) / 1000)
      const wasUserAFK = lastKeyDifference > 10

      /**
       * Salvar score e etc
       */
   }

   const playTypeSound = () => {
      const audio = new Audio(typeSound)
      audio.volume = volume / 100
      audio.playbackRate = 1 + ((Math.random() * 0.35) * (Math.random() < 0.5 ? -1 : 1))
      audio.play()
   }

   const handleInput = (event: React.FormEvent<HTMLDivElement>) => {

      const inputText = (event.target as HTMLInputElement).value.trim()
      const didPressDelete = typed.length > inputText.length
      const didPressSpace = event.nativeEvent.data === ' '
      const didTypeSomething = !!typed.replace(/s/gi, '')

      playTypeSound()
      setTyped(inputText)
      setLastTypeStamp(new Date().getTime())

      if (!didPressDelete && !didPressSpace) {
         getCurrentWord().startsWith(inputText)
            ? setScore({ ...score, right: score.right + 1 })
            : setScore({ ...score, wrong: score.wrong + 1 })
      }

      if (!didPressSpace) {
         return
      }

      if (!didTypeSomething) {
         setTyped('')
         return
      }

      if (!isTypedEqualWord()) {
         setErrors([...errors, current])
      }

      setCurrent(current + 1)
      setTyped('')
   }

   useEffect(handleFinish, [finished, lastTypeStamp])
   useEffect(handleReset, [language])

   return (
      <Stack
         bgcolor={'grey.800'}
         width={'100%'}
         height={'100%'}
         padding={'15% 25%'}
      >

         <Stack gap={'1rem'}>

            <Stack
               direction={'row'}
               alignItems={'center'}
               justifyContent={'space-between'}
            >

               <Stack direction={'row'} alignItems='center' padding='0.5rem 1rem' borderRadius='8px' gap={'1rem'} width={'250px'} bgcolor={'primary.dark'}>
                  {volume
                     ? <VolumeUpIcon htmlColor="white" onClick={() => handleVolumeChange(0)} />
                     : <VolumeMuteIcon htmlColor="white" onClick={() => handleVolumeChange(50)} />}

                  <Slider
                     step={10}
                     color="primary"
                     aria-label="Volume"
                     value={volume}
                     onChange={(_, newValue) => handleVolumeChange(newValue as number)}
                  />
               </Stack>

               <Select
                  value={language.id}
                  label="Language"
                  onChange={(event) => handleLanguageChange(event)}
               >
                  {Languages.map(language => <MenuItem key={language.id} value={language.id}>{language.title}</MenuItem>)}
               </Select>

            </Stack>

            <TextBox
               typed={typed}
               current={current}
               text={text}
               errors={errors}
            />

            <Stack direction={'row'} gap={'1rem'} justifyContent={'center'}>
               <Button sx={{ border: '1px solid transparent', borderColor: 'primary.light' }} variant="contained" onClick={handleReset}><ReplayIcon /></Button>
               <OutlinedInput
                  color="secondary"
                  autoFocus
                  disabled={finished}
                  value={typed}
                  onInput={(event) => handleInput(event)}
               />
               <Timer
                  key={id}
                  active={current > 0 || !!typed}
                  initialTime={10 * 1000}
                  onFinish={() => setFinished(true)}
               />
            </Stack>
         </Stack>

         <div>
            <p>Digitado Certo: {score.right}</p>
            <p>Digitado Errado: {score.wrong}</p>
            <p>Digitado Total: {score.right + score.wrong}</p>
            <p>Palavras: ({current - errors.length} | {errors.length})</p>
            <p>Palavra Atual: {current}</p>
            <p>WPM: {Math.floor((score.right + score.wrong) / 5)}</p>



         </div>

      </Stack>
   )
}

export default App
