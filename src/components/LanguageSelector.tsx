import * as Select from '@radix-ui/react-select';
import { ILanguage } from '../interfaces/ILanguage';
import { useState } from 'react'
import { TbChevronDown } from 'react-icons/tb'
import { twMerge } from 'tailwind-merge';

type Props = {
   value: ILanguage,
   languages: ILanguage[],
   onChange: (id: string) => void
}

export const LanguageSelector = ({ value, languages, onChange }: Props) => {
   const [isOpen, setIsOpen] = useState<boolean>(false)

   return (
      <Select.Root open={isOpen} value={value.id} onValueChange={onChange}>

         <Select.Trigger
            className="text-gray-500 flex items-center border-solid border-r-2 border-gray-200 justify-between w-44 outline-none px-2 pr-6 py-1"
            onClick={() => setIsOpen(true)}>
            {value.title}
            <TbChevronDown className={twMerge('duration-200', isOpen && 'rotate-180')}/>
         </Select.Trigger>

         <Select.Content
            className='p-4 rounded-lg bg-white shadow-sm w-32'
            position="popper"
            align='center'
            sideOffset={8}
            onPointerDownOutside={() => setIsOpen(false)}
            onEscapeKeyDown={() => setIsOpen(false)}>
            {
               languages.map(language => (
                  <Select.Item
                     className='py-1 outline-none hover:font-medium cursor-pointer text-gray-500'
                     key={language.id}
                     value={language.id}
                  >
                     {language.title}
                  </Select.Item>
               ))
            }
         </Select.Content>

      </Select.Root>
   )
}