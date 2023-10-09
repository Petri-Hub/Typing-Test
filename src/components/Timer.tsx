import { Button } from "@mui/material"
import { useState } from "react"
import { useToggle } from '../hooks/useToggle'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

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
      <Button
         sx={{ border: '1px solid transparent', borderColor: 'primary.light' }}
         variant="contained"
         onClick={() => toggleIsShown()}
      >
         {
            isShown
               ? <div>{minutes} : {seconds.toString().padStart(2, '0')}</div>
               : <VisibilityOffIcon />
         }
      </Button>
   )
}