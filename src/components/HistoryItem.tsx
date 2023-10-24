import { IHistory } from "../interfaces/IHistory"

export const HistoryItem = ({ right, wrong, date }: IHistory) => {
   return (
      <div className="grid grid-cols-history w-full gap-x-3">
         <div className="w-14 flex items-center justify-center flex-col gap-y-1 rounded-md aspect-square bg-green-100">
            <p className="text-green-600 font-bold leading-[0.85] text-lg">{Math.floor((right + wrong) / 5)}</p>
            <p className="text-green-600 font-medium leading-[0.85] text-sm">PPM</p>
         </div>
         <div className="flex justify-between items-center">
            <div>
               <p className="text-green-600 text-sm">{right} acertos</p>
               <p className="text-red-600 text-sm">{wrong} erros</p>
            </div>
            <div className="">
               <p className="text-gray-400 text-right text-sm">{new Date(date).toLocaleDateString('en-GB')}</p>
               <p className="text-gray-400 text-right text-sm">{new Date(date).toLocaleTimeString('en-GB')}</p>
            </div>

         </div>
      </div>
   )
}