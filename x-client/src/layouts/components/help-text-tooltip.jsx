import * as React from 'react';

import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

// ----------------------------------------------------------------------
const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.grey,
    color: theme.palette.common.white, // Tooltip text color
    padding: theme.spacing(.9), // Padding for better spacing
    borderRadius: theme.shape.borderRadius, // Rounded corners
  },
}));

export function HelpText({ children, text, placement = 'top', arrow = true }) {
  return (
    <BootstrapTooltip title={text} placement={placement} arrow={arrow}>
      {children}
    </BootstrapTooltip>
  );
}
