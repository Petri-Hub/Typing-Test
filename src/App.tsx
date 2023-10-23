import React, { useState, useEffect, } from "react"
import { TextBox } from "./components/TextBox"
import { Languages } from './resources/languages.ts'
import { IWord } from "./interfaces/IWord.ts"
import typeSound from './assets/audio/type.mp3'
import { TbBrandTypescript, TbRotateClockwise, TbBrandReact, TbSettings, TbBrandTailwind, TbBrandRadixUi, TbBrandLinkedin, TbBrandGithub, TbPencilPlus } from 'react-icons/tb'
import { LanguageSelector } from "./components/LanguageSelector.tsx"
import Timer from "./components/Timer.tsx"
import { DetailIcon } from "./components/DetailIcon.tsx"
import { VolumeSlider } from "./components/VolumeSlider.tsx"

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

   const handleLanguageChange = (id: string) => {
      const selectedLang = Languages.find(language => language.id === id)

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

      if(wasUserAFK) return
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

   const handleInput = (event: React.FormEvent<HTMLInputElement>) => {      

      const inputText = event.currentTarget.value.trim()
      const didPressDelete = typed.length > inputText.length
      const didPressSpace = (event.nativeEvent as InputEvent).data
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
      <div className="w-full h-full bg-gray-100">
         <div className="w-2/3 mx-auto pt-48">

            {/* Typing */}
            <div className="relative bg-white rounded-xl p-5">

               {/* Technologies and Social media */}
               <div className="flex absolute left-0 mb-4 bottom-full justify-between w-full">
                  <p className="absolute bottom-full mb-2 left-0 text-gray-400">built with</p>
                  <p className="absolute bottom-full mb-2 right-0 text-gray-400">made by Petri</p>
                  <div className="flex items-center gap-x-2">
                     <DetailIcon
                        title="Typescript"
                        icon={TbBrandTypescript}
                        className={'hover:text-[#377CC8]'}
                        link={'https://www.typescriptlang.org/'}
                     />
                     <DetailIcon
                        title="React"
                        icon={TbBrandReact}
                        className={'hover:text-[#61DBFB]'}
                        link={'https://react.dev/'}
                     />
                     <DetailIcon
                        title="Tailwind"
                        icon={TbBrandTailwind}
                        className={'hover:text-[#07B6D5]'}
                        link={'https://tailwindcss.com/'}
                     />
                     <DetailIcon
                        title="Radix UI"
                        icon={TbBrandRadixUi}
                        className={'hover:text-black'}
                        link={'https://www.radix-ui.com/'}
                     />
                  </div>
                  <div className="flex items-center gap-x-2">
                     <DetailIcon
                        title="Github"
                        icon={TbBrandGithub}
                        className={'hover:text-black'}
                        link={'https://github.com/Petri-Hub'}
                     />
                     <DetailIcon
                        title="LinkedIn"
                        icon={TbBrandLinkedin}
                        className={'hover:text-[#0274B3]'}
                        link={'https://www.linkedin.com/in/fernando-petri/'}
                     />
                  </div>
               </div>

               {/* Top area */}
               <div className="grid grid-cols-topbar mb-4 px-3">

                  {/* Options */}
                  <div className="flex gap-5 pr-4 border-r-2 border-solid border-gray-200">

                     <TbSettings className="text-gray-500 w-8 h-8 cursor-pointer" />
                     <TbPencilPlus className="text-gray-500 w-7 h-7 cursor-pointer" />

                  </div>

                  {/* Volume */}
                  <div className="flex items-center gap-4 pl-4">

                     <VolumeSlider
                        value={volume}
                        changeVolume={handleVolumeChange}
                     />

                  </div>

                  <p className="text-green-600 text-lg whitespace-nowrap font-bold">{Math.floor((score.right + score.wrong) / 5)} WPM</p>

               </div>

               <TextBox
                  typed={typed}
                  current={current}
                  text={text}
                  errors={errors}
               />

               <div className="items-center justify-center px-2 mt-4 grid grid-cols-footer">

                  <LanguageSelector
                     value={language}
                     languages={Languages}
                     onChange={handleLanguageChange}
                  />

                  <div className="px-4 relative">
                     <input
                        className=" py-1 outline-none w-full bg-transparent"
                        placeholder="Digite aqui..."
                        autoFocus
                        disabled={finished}
                        value={typed}
                        onInput={(event) => handleInput(event)}
                     />
                     <div className="text-gray-300 absolute right-4 top-1/2 -translate-y-1/2">{getCurrentWord()}</div>
                  </div>

                  <TbRotateClockwise
                     className="w-20 px-6 h-6 cursor-pointer text-blue-400 border-l-2 border-solid border-gray-200"
                     onClick={() => handleReset()}
                  />

                  <Timer
                     key={id}
                     active={current > 0 || !!typed}
                     initialTime={60 * 1000}
                     onFinish={() => setFinished(true)}
                  />
               </div>
               {/* 
               <div>
                  <p>Digitado Certo: {score.right}</p>
                  <p>Digitado Errado: {score.wrong}</p>
                  <p>Digitado Total: {score.right + score.wrong}</p>
                  <p>Palavras: ({current - errors.length} | {errors.length})</p>
                  <p>Palavra Atual: {current}</p>
                  <p>WPM: {Math.floor((score.right + score.wrong) / 5)}</p>



               </div> */}

            </div>
         </div>
      </div >


   )
}

export default App
