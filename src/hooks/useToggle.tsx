import { useState } from 'react'

export function useToggle(initialState: boolean): [boolean, () => void] {
   const [toggled, setToggled] = useState<boolean>(initialState)

   const toggler = () => setToggled(!toggled)

   return [toggled, toggler]
}