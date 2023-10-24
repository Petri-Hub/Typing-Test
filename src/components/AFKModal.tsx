import * as Dialog from '@radix-ui/react-dialog';
import { TbZzz } from 'react-icons/tb'

type Props = {
   onConfirm: () => void
}

export const AFKModal = ({ onConfirm }: Props) => {
   return (
      <Dialog.Root open>
         <Dialog.Portal>
            <Dialog.Overlay className='fixed left-0 top-0 w-full h-full bg-black opacity-20 z-40' />
            <Dialog.Content className='bg-white w-80 h-96 rounded-lg shadow-sm z-50 gap-y-6 absolute flex-col flex items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
               <TbZzz className="text-blue-400 w-16 h-16"/>
               <p className='text-gray-600 font-medium text-2xl'>Ainda por ai?</p>
               <p className='text-gray-400 text-md w-2/3 text-center'>Parece que você ficou inativo por um tempo. Por isso, não registramos sua tentativa.</p>
               <button onClick={() => onConfirm()} className='outline-none text-blue-400 font-medium text-xl'>Entendi</button>
            </Dialog.Content>
         </Dialog.Portal>
      </Dialog.Root>
   )
}