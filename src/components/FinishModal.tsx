import * as Dialog from '@radix-ui/react-dialog';
import { TbStar } from 'react-icons/tb'
import { IHistory } from '../interfaces/IHistory';

type Props = {
   attempt: IHistory
   onConfirm: () => void
}

export const FinishModal = ({ attempt, onConfirm }: Props) => {
   return (
      <Dialog.Root open>
         <Dialog.Portal>
            <Dialog.Overlay className='fixed left-0 top-0 w-full h-full bg-black opacity-20 z-40' />
            <Dialog.Content className='bg-white w-80 h-96 rounded-lg shadow-sm z-50 gap-y-6 absolute flex-col flex items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
               <div className='relative'>
                  <TbStar className="absolute left-full top-0 rotate-45 w-6 -translate-y-1/2 h-6 text-yellow-500" />
                  <p className='text-green-600 text-5xl font-bold'>{Math.floor((attempt.right + attempt.wrong) / 5)}</p>
                  <p className='text-center text-green-600 text-xl font-bold mt-2'>ppm</p>
               </div>
               <p className='text-gray-600 font-medium text-2xl'>Incrível!</p>
               <div className='p-4 rounded-lg bg-gray-100'>
                  <div className='flex justify-between gap-x-8'>
                     <p className='text-md text-gray-600 font-medium'>{attempt.right + attempt.wrong} caracteres</p>
                     <p className='text-md text-green-600 font-medium'>{attempt.right} acertos</p>
                  </div>
                  <div className='flex justify-between gap-x-8 mt-2'>
                     <p className='text-md text-blue-400 font-medium'>{parseFloat((attempt.right / (attempt.right + attempt.wrong) * 100).toFixed(2))}%</p>
                     <p className='text-md text-red-500 font-medium'>{attempt.wrong} erros</p>
                  </div>
               </div>
               <button onClick={() => onConfirm()} className='outline-none text-blue-400 font-medium text-xl'>Continuar</button>
            </Dialog.Content>
         </Dialog.Portal>
      </Dialog.Root>
   )
}