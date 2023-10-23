import * as Slider from "@radix-ui/react-slider"
import { TbVolume, TbVolumeOff } from "react-icons/tb"

type Props = {
   value: number
   changeVolume: (volume: number) => void
}

export const VolumeSlider = ({ value, changeVolume }: Props) => {
   return (
      <div className="flex items-center gap-x-3">

         {
            value > 0
               ? <TbVolume onClick={() => changeVolume(0)} className="duration-100 scale-100 hover:scale-110 text-gray-500 w-7 h-7 cursor-pointer" />
               : <TbVolumeOff onClick={() => changeVolume(50)} className="duration-100 scale-100 hover:scale-110 text-gray-500 w-7 h-7 cursor-pointer" />
         }

         <Slider.Root className="w-32 flex items-center cursor-pointer relative" onValueChange={([ value ]) => changeVolume(value)} value={[value]}min={0} max={100} step={10}>
            <Slider.Track className="rounded-full bg-gray-200 w-full h-[6px] block">
               <Slider.Range className="rounded-full bg-blue-400 h-[6px] absolute" />
            </Slider.Track>
            <Slider.Thumb className="-translate-x-1/2 outline-none -translate-y-1/2 absolute h-4 rounded-full w-4 bg-blue-500 shadow-sm" aria-label="Volume" />
         </Slider.Root>
      </div>
   )
}