import React, { useState, useEffect, } from "react"
import { TextBox } from "./components/TextBox"
import { Languages } from './resources/languages.ts'
import { IWord } from "./interfaces/IWord.ts"
import typeSound from './assets/audio/type.mp3'
import { TbBrandTypescript, TbMedal2, TbHistory, TbRotateClockwise, TbBrandReact, TbSettings, TbBrandTailwind, TbBrandRadixUi, TbBrandLinkedin, TbBrandGithub, TbPencilPlus } from 'react-icons/tb'
import { LanguageSelector } from "./components/LanguageSelector.tsx"
import Timer from "./components/Timer.tsx"
import { DetailIcon } from "./components/DetailIcon.tsx"
import { VolumeSlider } from "./components/VolumeSlider.tsx"
import { AlertInfo } from "./components/AlertInfo.tsx"
import { AFKModal } from "./components/AFKModal.tsx"
import { IHistory } from "./interfaces/IHistory.ts"
import { HistoryItem } from "./components/HistoryItem.tsx"
import { twMerge } from "tailwind-merge"
import { FinishModal } from "./components/FinishModal.tsx"

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
   const [history, setHistory] = useState<IHistory[]>(JSON.parse(localStorage.getItem('history') ?? '[]'))
   const [text, setText] = useState<IWord[]>(generateText(language.words))
   const [volume, setVolume] = useState<number>((localStorage.getItem('volume') as number | null) ?? 50)
   const [finished, setFinished] = useState<boolean>(false)
   const [lastTypeStamp, setLastTypeStamp] = useState<null | number>(null)
   const [score, setScore] = useState({ wrong: 0, right: 0 })

   const [isAFKModalShown, setIsAFKModalShown] = useState<boolean>(false)
   const [isFinishModalShown, setIsFinishModalShown] = useState<boolean>(false)

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

   const getBestAttempt = () => {
      return history.reduce((best, current) => {
         const currentWPM = Math.floor((current.right + current.wrong) / 5)
         const bestWPM = Math.floor((best.right + best.wrong) / 5)

         if (!best) return current
         if (currentWPM < bestWPM) return best

         return current
      },)
   }

   const handleVolumeChange = (newVolume: number) => {
      setVolume(newVolume)
      playTypeSound()
   }

   const getLastAttempt = () => {
      return history[0]
   }

   const handleFinish = () => {
      if (!finished) return

      const lastKeyDifference = Math.floor((new Date().getTime() - (lastTypeStamp as number)) / 1000)
      const wasUserAFK = lastKeyDifference > 10

      if (wasUserAFK) {
         setIsAFKModalShown(true)
         return
      }

      setHistory([{
         date: new Date().getTime(),
         text: text,
         errors: errors,
         current,
         right: score.right,
         wrong: score.wrong,
         precision: parseFloat(((score.right + score.wrong) / score.right).toFixed(2)),
         id: crypto.randomUUID()
      }, ...history])

      setIsFinishModalShown(true)
   }

   const playTypeSound = () => {
      const audio = new Audio(typeSound)
      audio.volume = volume / 100
      audio.playbackRate = 1 + ((Math.random() * 0.35) * (Math.random() < 0.5 ? -1 : 1))
      audio.play()
   }

   const getTypesAmountForChar = (char: string | null) => {
      if (!char) return 0

      const isJapaneseChar = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/.test(char)
      const twoTypesChars = 'ãõĉŭŝĝĵáĥÆØÅάήίώόύέΓΔΘΛΞΠΣΦΨΩÖÜÇŞĞİABCDEFGHIJKLMNOPQRSTUVWXYZàèòéíóúÇ!"·$%&/()?¿@#€:'.split('')
      const threeTypesChars = 'ÁÉÍÓÚÝÀÈÒÉÍÓÚïüàâêîôûďťň'.split('')
      const fourTypesChars = 'ÏÜÀÂÊÎÔÛĚŠČŘŽŇŤĎŮ'.split('')

      if (isJapaneseChar) return 5
      if (twoTypesChars.includes(char)) return 2
      if (fourTypesChars.includes(char)) return 4
      if (threeTypesChars.includes(char)) return 3

      return 1
   }

   const handleInput = (event: React.FormEvent<HTMLInputElement>) => {

      const inputText = event.currentTarget.value.trim()
      const typedChar = (event.nativeEvent as InputEvent).data
      const typedCount = getTypesAmountForChar(typedChar)

      const didPressDelete = typed.length > inputText.length
      const didPressSpace = typedChar === ' '
      const didTypeSomething = !!typed.replace(/s/gi, '')

      playTypeSound()
      setTyped(inputText)
      setLastTypeStamp(new Date().getTime())

      if (!didPressDelete && !didPressSpace) {
         getCurrentWord().startsWith(inputText)
            ? setScore({ ...score, right: score.right + typedCount })
            : setScore({ ...score, wrong: score.wrong + typedCount })
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

   const saveHistory = () => {
      localStorage.setItem('history', JSON.stringify(history))
   }

   const saveVolume = () => {
      localStorage.setItem('volume', volume.toString())
   }

   useEffect(handleFinish, [finished])
   useEffect(handleReset, [language])
   useEffect(saveHistory, [history])
   useEffect(saveVolume, [volume])

   return (
      <div className="w-full h-full bg-gray-100">
         <div className="w-4/5 grid grid-cols-main gap-6 mx-auto pt-48">

            {isAFKModalShown && <AFKModal onConfirm={() => setIsAFKModalShown(false)} />}
            {isFinishModalShown && <FinishModal attempt={getLastAttempt()} onConfirm={() => setIsFinishModalShown(false)} />}

            {/* History */}
            <div className="rounded-xl w-full h-min bg-white p-5">
               <div className="flex justify-between mb-3 pb-3 border-b-2 border-gray-100 border-solid">
                  <div>
                     <p className="text-gray-500 font-medium text-lg">Histórico ({history.length})</p>
                     <p onClick={() => setHistory([])} className="text-gray-400 text-sm cursor-pointer">Limpar histórico</p>
                  </div>
                  <TbHistory className="w-12 text-blue-400 h-12" />
               </div>
               <div className="flex flex-col gap-y-3">
                  {
                     history.length
                        ? history.map(history => <HistoryItem key={history.id} {...history} />)
                        : <AlertInfo message="Sem histórico" background="bg-orange-100" color="text-orange-800" />
                  }
               </div>
            </div>

            {/* Typing */}
            <div className="relative bg-white rounded-xl p-5 h-min">

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

                  <p className="text-green-600 text-lg whitespace-nowrap font-bold">{Math.floor((score.right + score.wrong) / 5)} PPM</p>

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
                     initialTime={20 * 1000}
                     onFinish={() => setFinished(true)}
                  />
               </div>
            </div>

            {/* Record */}
            <div className="rounded-xl bg-white h-min p-5 relative">
               <p className="font-medium text-gray-500 text-lg">Maior Record</p>
               <p className="text-gray-400 text-sm">{getBestAttempt() ? new Date(getBestAttempt().date).toLocaleDateString('en-GB') : 'Sem nenhum record'}</p>
               <TbMedal2 className={twMerge("absolute right-5 top-5 w-12 h-12", history.length ? 'text-yellow-500' : 'text-gray-300')} />
               {
                  history.length
                     ? <div className="mt-6 flex items-end justify-between">
                        <div>
                           <p className="text-green-600 text-sm">{getBestAttempt().right} acertos</p>
                           <p className="text-red-600 text-sm">{getBestAttempt().wrong} erros</p>
                        </div>
                        <div className="text-green-600 text-2xl font-bold">{Math.floor((getBestAttempt().right + getBestAttempt().wrong) / 5)} PPM</div>
                     </div>
                     : <AlertInfo className="mt-3" message="Jogue uma vez!" background="bg-orange-100" color="text-orange-800" />
               }
            </div>


         </div>
      </div >


   )
}

export default App
