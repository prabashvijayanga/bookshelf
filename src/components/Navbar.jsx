import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material'
import {
  Home,
  Search,
  LocalLibrary,
  BarChart,
  Info,
  Menu as MenuIcon,
  GitHub,
} from '@mui/icons-material'

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  // Icons preserved for mobile drawer only
  const navItems = [
    { path: '/', label: 'Overview', icon: <Home /> },
    { path: '/search', label: 'Index', icon: <Search /> },
    { path: '/library', label: 'Library', icon: <LocalLibrary /> },
    { path: '/statistics', label: 'Telemetry', icon: <BarChart /> },
    { path: '/about', label: 'Architecture', icon: <Info /> },
  ]

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ width: 280, bgcolor: '#09090b', height: '100%', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
          BookShelf.
        </Typography>
      </Box>
      <List sx={{ px: 2, py: 3 }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{
                  borderRadius: 1,
                  backgroundColor: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
                  color: isActive ? 'text.primary' : 'text.secondary',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    color: 'text.primary',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.label} 
                  primaryTypographyProps={{ fontWeight: isActive ? 600 : 500, fontSize: '0.9rem' }} 
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={0} 
        sx={{ 
          backdropFilter: 'blur(12px)', 
          backgroundColor: 'rgba(9, 9, 11, 0.7)',
          borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ height: 64, minHeight: '64px !important' }}>
            
            {/* Desktop Logo */}
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 6,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 800,
                color: 'text.primary',
                textDecoration: 'none',
                letterSpacing: '-0.02em'
              }}
            >
              BookShelf.
            </Typography>

            {/* Mobile Menu Icon */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                onClick={handleDrawerToggle}
                color="inherit"
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Mobile Logo */}
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontWeight: 800,
                color: 'text.primary',
                textDecoration: 'none',
                letterSpacing: '-0.02em'
              }}
            >
              BookShelf.
            </Typography>

            {/* Desktop Nav Links (Text Only) */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 3 }}>
              {navItems.map((item) => {
                const isActive = location.pathname === item.path
                return (
                  <Button
                    key={item.path}
                    component={Link}
                    to={item.path}
                    disableRipple
                    sx={{
                      color: isActive ? 'text.primary' : 'text.secondary',
                      fontWeight: isActive ? 600 : 500,
                      fontSize: '0.85rem',
                      px: 0,
                      minWidth: 'auto',
                      backgroundColor: 'transparent !important',
                      '&:hover': {
                        color: 'text.primary',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                )
              })}
            </Box>

            {/* GitHub Repo Link */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Tooltip title="View Source Architecture">
                <IconButton
                  component="a"
                  href="https://github.com/prabashvijayanga/bookshelf"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{
                    color: 'text.secondary',
                    '&:hover': { color: 'text.primary', bgcolor: 'rgba(255,255,255,0.05)' },
                  }}
                >
                  <GitHub fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280, bgcolor: '#09090b' },
        }}
      >
        {drawer}
      </Drawer>
    </>
  )
}

export default Navbar