import { useState } from "react"
import { useToggle } from '../hooks/useToggle'
import { TbEyeOff } from 'react-icons/tb'

type Props = {
   active: boolean
   initialTime: number
   onFinish: () => void
}

export default function Timer({ active, initialTime, onFinish }: Props) {
   const [time, setTime] = useState<number>(initialTime)
   const [isShown, toggleIsShown] = useToggle(true)

   const minutes = Math.floor(time / (60 * 1000))
   const seconds = Math.floor((time / 1000) % 60)

   if (active && time >= 1000) setTimeout(() => setTime(time - 1000), 1000)
   if (time <= 0) onFinish()

   return (
      <div
         className="whitespace-nowrap w-20 flex justify-center font-bold tracking-wide text-orange-400 pl-4 border-l-2 border-solid border-gray-200 cursor-pointer"
         onClick={() => toggleIsShown()}
      >
         {
            isShown
               ? <div>{minutes}:{seconds.toString().padStart(2, '0')}</div>
               : <TbEyeOff className="w-6 h-6"/>
         }
      </div>
   )
}