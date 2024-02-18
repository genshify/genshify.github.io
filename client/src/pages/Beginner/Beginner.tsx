import type { Palette, PaletteColor } from '@mui/material'
import type { HTMLAttributes } from 'react'
import { styled } from '@mui/material'

interface ColorTextProps extends HTMLAttributes<HTMLSpanElement> {
  color?: keyof Palette
  variant?: keyof PaletteColor
}

const ColorText = styled('span')<ColorTextProps>(
  ({ theme, color, variant = 'main' }) => {
    if (!color) return {}
    const pc = theme.palette[color] as PaletteColor
    if (!pc) return {}
    const pcv = pc[variant]
    if (!pcv) return {}
    return { color: pcv }
  }
)

export default function Beginner() {
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <h1>Beginner</h1>
      <p>
        <ColorText color="hydro">Lorem ipsum dolor sit amet</ColorText>,
        consectetur adipisicing elit. Quos, voluptate.
      </p>
    </div>
  );
}
