import { SxProps, Typography } from '@mui/material'
import React from 'react'

type Props = {
   word: string
   id: string
   isHighlighted: boolean
   isWrong: boolean
   isRight: boolean
   isOpaque: boolean
}

const style = ({ isHighlighted, isWrong, isOpaque, isRight }: Props): SxProps => ({
   fontSize: '17px',
   padding: '0.25rem 0.75rem',
   borderRadius: '6px',
   color: isWrong ? 'error.main' : isRight ? 'success.light' : 'text.primary',
   bgcolor: isHighlighted ? 'primary.main' : 'transparent',
   borderWidth: '1px',
   borderStyle: 'solid',
   borderColor: isHighlighted ? 'primary.light' : 'transparent',
   opacity: isOpaque ? 0.5 : 1
})

export const Word = React.forwardRef((props: Props, ref: React.ForwardedRef<HTMLParagraphElement>) => {
   return (
      <Typography component={'p'} ref={ref} sx={style(props)}>
         {props.word}
      </Typography>
   )
})