import { ElementType } from 'react'
import * as HoverCard from '@radix-ui/react-hover-card'
import { TbLink, TbArrowRight } from 'react-icons/tb'
import { twMerge } from 'tailwind-merge'

type Props = {
   icon: ElementType
   className: string
   link: string
   title: string
}

export const DetailIcon = ({ icon: Icon, className, link, title }: Props) => {
   return (
      <HoverCard.Root openDelay={0} closeDelay={50}>
         <HoverCard.Trigger asChild>
            <a target="_blank" href={link}>
               <Icon className={twMerge('text-gray-400 w-8 h-8 scale-100 rotate-0 hover:rotate-12 hover:scale-110 duration-100 cursor-pointer', className)} />
            </a>
         </HoverCard.Trigger>
         <HoverCard.Content side="top" sideOffset={8} asChild>
            <a target="_blank" href={link} className="block animate-fade-up p-3 px-4 rounded-lg bg-white shadow-sm">
               <div className='flex items-center justify-between'>
                  <p className='text-gray-600 font-medium text-md mb-1'>{title}</p>
                  <TbArrowRight className='text-gray-400' />
               </div>
               <div className='flex gap-x-1 text-gray-400 items-center '>
                  <TbLink />
                  <a target="_blank" href={link} className='text-sm underline'>{link}</a>
               </div>
            </a>
         </HoverCard.Content>
      </HoverCard.Root>
   )
}