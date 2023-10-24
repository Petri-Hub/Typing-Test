import { IWord } from "./IWord"

export interface IHistory{
   id: string
   date: number
   text: IWord[]
   errors: number[]
   current: number
   right: number
   wrong: number
   precision: number
}