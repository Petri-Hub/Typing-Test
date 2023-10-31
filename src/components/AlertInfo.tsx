import { ElementType } from "react"
import { TbInfoCircle } from "react-icons/tb"
import { twMerge } from "tailwind-merge"

type Props = {
   icon?: ElementType
   message: string
   background?: string
   color?: string
   className?:string
}

export const AlertInfo = ({ 
   icon: Icon = TbInfoCircle, 
   message = 'Alerta', 
   background = 'bg-gray-100', 
   color = 'text-gray-600',
   className
}: Props) => {
   return (
      <div className={twMerge('w-full rounded-md px-4 py-3 text-md flex items-center gap-x-3', background, color, className)}>
         <Icon className="w-6 h-6"/>
         <p>{message}</p>
      </div>
   )
}