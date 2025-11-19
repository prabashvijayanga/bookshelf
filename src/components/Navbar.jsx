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
  MenuBook,
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

  const navItems = [
    { path: '/', label: 'Home', icon: <Home /> },
    { path: '/search', label: 'Search', icon: <Search /> },
    { path: '/library', label: 'My Library', icon: <LocalLibrary /> },
    { path: '/statistics', label: 'Statistics', icon: <BarChart /> },
    { path: '/about', label: 'About', icon: <Info /> },
  ]

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ width: 250 }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <MenuBook sx={{ fontSize: 32, color: 'primary.main' }} />
        <Typography variant="h6" color="primary">
          BookShelf
        </Typography>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: 'primary.main' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <>
      <AppBar position="sticky" elevation={0} sx={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(26, 31, 58, 0.8)' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo */}
            <MenuBook sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: 32 }} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 4,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              BookShelf
            </Typography>

            {/* Mobile Menu Icon */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                onClick={handleDrawerToggle}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Mobile Logo */}
            <MenuBook sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              BookShelf
            </Typography>

            {/* Desktop Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  startIcon={item.icon}
                  sx={{
                    color: 'white',
                    backgroundColor: location.pathname === item.path ? 'primary.main' : 'transparent',
                    '&:hover': {
                      backgroundColor: location.pathname === item.path ? 'primary.dark' : 'rgba(92, 107, 192, 0.1)',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* GitHub Link - UPDATED */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Tooltip title="View Source on GitHub">
                <IconButton
                  component="a"
                  href="https://github.com/prabashvijayanga/bookshelf"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="inherit"
                  sx={{
                    '&:hover': {
                      color: 'primary.light',
                    },
                  }}
                >
                  <GitHub />
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
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250, backgroundColor: 'background.paper' },
        }}
      >
        {drawer}
      </Drawer>
    </>
  )
}

export default Navbar