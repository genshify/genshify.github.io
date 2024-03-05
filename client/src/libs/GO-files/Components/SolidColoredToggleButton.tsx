import type { ButtonProps, ButtonPropsColorOverrides, ToggleButtonProps } from '@mui/material'
import { ToggleButton, styled } from '@mui/material'

type SolidColoredToggleButtonPartial = {
  baseColor?: ButtonProps['color']
  selectedColor?: ButtonProps['color']
}
export type SolidColoredToggleButtonProps = SolidColoredToggleButtonPartial &
  ToggleButtonProps

const SolidColoredToggleButton = styled(ToggleButton, {
  shouldForwardProp: (prop) => prop !== 'baseColor' && prop !== 'selectedColor',
})<SolidColoredToggleButtonPartial>(
  ({ theme, baseColor = 'secondary', selectedColor = 'success' }) => ({
    '&': {
      backgroundColor: theme.palette[baseColor as keyof ButtonPropsColorOverrides].main,
      color: theme.palette[baseColor as keyof ButtonPropsColorOverrides].contrastText,
    },
    '&:hover': {
      backgroundColor: theme.palette[baseColor as keyof ButtonPropsColorOverrides].dark,
    },
    '&.Mui-selected': {
      backgroundColor: theme.palette[selectedColor as keyof ButtonPropsColorOverrides].main,
      color: theme.palette[selectedColor as keyof ButtonPropsColorOverrides].contrastText,
    },
    '&.Mui-selected:hover': {
      backgroundColor: theme.palette[selectedColor as keyof ButtonPropsColorOverrides].dark,
    },
    '&.Mui-disabled': {
      backgroundColor: theme.palette[baseColor as keyof ButtonPropsColorOverrides].dark,
    },
    '&.Mui-selected.Mui-disabled': {
      backgroundColor: theme.palette[selectedColor as keyof ButtonPropsColorOverrides].dark,
    },
  })
)

export default SolidColoredToggleButton
