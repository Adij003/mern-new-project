import { useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { CONFIG } from 'src/config-global';
import { varAlpha } from 'src/theme/styles';
import { MyIcon } from 'src/assets/icons/app-icon';

import { Logo } from 'src/components/logo';

import { HeaderSection } from './header-section';
import { Searchbar } from '../components/searchbar';
import { MenuButton } from '../components/menu-button';
import { HelpText } from '../components/help-text-tooltip';
import { SignInButton } from '../components/sign-in-button';
import { AccountDrawer } from '../components/account-drawer';

// import { ReactComponent as MyIcon } from './app-icon.svg';

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

export function HeaderBase({
  sx,
  data,
  slots,
  slotProps,
  onOpenNav,
  layoutQuery,

  slotsDisplay: {
    signIn = true,
    account = true,
    helpLink = true,
    purchase = true,
    searchbar = true,
    menuButton = true,
  } = {},

  ...other
}) {
  const theme = useTheme();
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';


  return (
    <HeaderSection
      sx={{
        ...sx,
        backgroundColor: "common.white",
        borderBottom: "1px dashed",
        borderColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.3)
      }}
      layoutQuery={layoutQuery}
      slots={{
        ...slots,
        leftAreaStart: slots?.leftAreaStart,
        leftArea: (
          <>
            {slots?.leftAreaStart}

            {/* -- Menu button -- */}
            {menuButton && (
              <MenuButton
                data-slot="menu-button"
                onClick={onOpenNav}
                sx={{
                  mr: 1,
                  ml: -1,
                  [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
                }}
              />
            )}

            {/* -- Logo -- */}
            {
              isLoginPage ?
                <Logo data-slot="logo" />
                :
                <>
                  <Box
                    alt='logo'
                    component='img'
                    src={`${CONFIG.site.basePath}/logo/pabbly-full.svg`}
                    width={120}
                    sx={{ display: { xs: 'none', sm: 'block' }, zIndex: theme.zIndex.drawer + 1 }}
                  />

                  <Logo data-slot="logo" sx={{ display: { xs: 'block', sm: 'none' } }} />

                </>

            }

            {/* -- Divider -- */}
            <StyledDivider data-slot="divider" />

            {/* -- Workspace popover -- */}
            {/* {workspaces && <WorkspacesPopover data-slot="workspaces" data={data?.workspaces} />} */}

            {slots?.leftAreaEnd}
          </>
        ),
        rightArea: (
          <>
            {slots?.rightAreaStart}

            <Box
              data-area="right"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 1, sm: 1.5 },
              }}
            >
              {/* -- Help link -- */}
              {helpLink && (
                <Link
                  data-slot="help-link"
                  href={paths.faqs}
                  component={RouterLink}
                  color="inherit"
                  sx={{ typography: 'subtitle2' }}
                >
                  Need help?
                </Link>
              )}

              {/* -- Searchbar -- */}
              {searchbar && <Searchbar data-slot="searchbar" data={data?.nav} />}


              {
                helpLink ? '' :
                  <HelpText text="click here to purchase credits" placement="bottom">
                    <Button variant='contained'
                      size="medium"
                      sx={{
                        backgroundColor: 'var(--palette-error-main)',
                        color: 'var(--palette-error-contrastText)',
                        '&:hover': {
                          backgroundColor: 'var(--palette-error-dark)',
                          transform: 'scale(1.05)',
                        },
                        transition: 'background-color 0.3s, transform 0.3s',
                      }}

                      onClick={() => window.open('https://www.pabbly.com/email-list-cleaning/#pricing', '_blank')}

                    >Upgrade</Button>
                  </HelpText>
              }



              {/* App Icon  */}

              {
                helpLink ? '' :
                  <HelpText text="click here to access other apps from pabbly">
                    <IconButton sx={{ borderRadius: '8px', border: '1px solid grey', p: .7 }}>
                      {/* <CustomIcon /> */}
                      <MyIcon />
                    </IconButton>
                  </HelpText>
              }




              {/* -- Language popover -- */}
              {/* {localization && <LanguagePopover data-slot="localization" data={data?.langs} />} */}

              {/* -- Notifications popover -- */}
              {/* {notifications && (
                <NotificationsDrawer data-slot="notifications" data={data?.notifications} />
              )} */}

              {/* -- Contacts popover -- */}
              {/* {contacts && <ContactsPopover data-slot="contacts" data={data?.contacts} />} */}

              {/* -- Settings button -- */}
              {/* {settings && <SettingsButton data-slot="settings" />} */}

              {/* -- Account drawer -- */}
              {account && <AccountDrawer data-slot="account" data={data?.account} />}



              {/* -- Sign in button -- */}
              {signIn && <SignInButton />}

              {/* -- Purchase button -- */}
              {purchase && (
                <Button
                  data-slot="purchase"
                  variant="contained"
                  rel="noopener"
                  target="_blank"
                  href={paths.minimalStore}
                  sx={{
                    display: 'none',
                    [theme.breakpoints.up(layoutQuery)]: {
                      display: 'inline-flex',
                    },
                  }}
                >
                  Purchase
                </Button>
              )}
            </Box>

            {slots?.rightAreaEnd}
          </>
        ),
      }}
      slotProps={slotProps}
      {...other}
    />
  );
}
