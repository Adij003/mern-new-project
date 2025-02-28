

import { styled, useTheme } from '@mui/material/styles';

import { varAlpha } from 'src/theme/styles';

import { FooterSection } from './footer-section';
// import { WorkspacesPopover } from '../components/workspaces-popover';



// ----------------------------------------------------------------------

const StyledDivider = styled('span')(({ theme }) => ({
  width: 1,
  height: 10,
  flexShrink: 0,
  display: 'none',
  position: 'relative',
  alignItems: 'center',
  flexDirection: 'column',
  marginLeft: theme.spacing(2.5),
  marginRight: theme.spacing(2.5),
  backgroundColor: 'currentColor',
  color: theme.vars.palette.divider,
  '&::before, &::after': {
    top: -5,
    width: 3,
    height: 3,
    content: '""',
    flexShrink: 0,
    borderRadius: '50%',
    position: 'absolute',
    backgroundColor: 'currentColor',
  },
  '&::after': { bottom: -5, top: 'auto' },
}));

// ----------------------------------------------------------------------

export function FooterBase({
  sx

}) {
  const theme = useTheme();

  return (
    <FooterSection
      sx={{
        ...sx,
        backgroundColor: "common.white",
        borderBottom: "1px dashed",
        borderColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.3)
      }}
    />
  );
}
