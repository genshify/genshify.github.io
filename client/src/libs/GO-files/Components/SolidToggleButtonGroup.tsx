import type { ButtonProps, ButtonPropsColorOverrides, ToggleButtonGroupProps } from '@mui/material'
import { styled, ToggleButtonGroup } from '@mui/material'

export type SolidToggleButtonGroupProps = SolidToggleButtonGroupPropsPartial &
  ToggleButtonGroupProps
type SolidToggleButtonGroupPropsPartial = {
  baseColor?: ButtonProps['color']
  selectedColor?: ButtonProps['color']
}

const SolidToggleButtonGroup = styled(ToggleButtonGroup, {
  shouldForwardProp: (prop) => prop !== 'baseColor' && prop !== 'selectedColor',
})<SolidToggleButtonGroupPropsPartial>(
  ({ theme, baseColor = 'secondary', selectedColor = 'success' }) => ({
    '& .MuiToggleButtonGroup-grouped': {
      '&': {
        backgroundColor: theme.palette[baseColor as keyof ButtonPropsColorOverrides].main,
        color: theme.palette[baseColor as keyof ButtonPropsColorOverrides].contrastText,
      },
      '&:hover': {
        backgroundColor: theme.palette[baseColor as keyof ButtonPropsColorOverrides].dark,
        transition: 'background-color 0.25s ease',
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
    },
  })
)

export default SolidToggleButtonGroup
