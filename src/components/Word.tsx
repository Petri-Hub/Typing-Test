import { Typography } from '@mui/material'

type Props = {
   word: string
   id: string
   isHighlighted: boolean
   isWrong: boolean
   isRight: boolean
   isOpaque: boolean
}

export function Word({ word, isHighlighted, isWrong, isOpaque, isRight }: Props) {
   return (
      <Typography
         fontSize={'20px'}
         padding={'0rem 0.5rem'}
         borderRadius={'6px'}
         color={isWrong ? 'error.dark' : isRight ? 'success.light' : 'text.primary'}
         bgcolor={isHighlighted ? 'primary.dark' : 'transparent'}
         sx={{ opacity: isOpaque ? 0.5 : 1}}
      >
         {word}
      </Typography>
   )
}