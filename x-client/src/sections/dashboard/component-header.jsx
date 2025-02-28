import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// import { varAlpha } from 'src/theme/styles';
import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export function ComponentHeader({ title = 'Blank', subtitle = 'Blank Subtitle' }) {
    return (
        <DashboardContent maxWidth="xl">
            <Box sx={{ mb: 2, mt: 2 }}>
                <Typography variant="h4" sx={{ mb: 1 }}>
                    {title}
                </Typography>
                <Typography
                    sx={{ color: 'text.secondary' }}
                >{subtitle} <Link> Learn more</Link></Typography>

            </Box>
        </DashboardContent>
    );
}
