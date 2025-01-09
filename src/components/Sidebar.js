import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Box,
    IconButton,
    Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useContext(AuthContext); // Доступ к авторизации

    if (!isAuthenticated) return null; // Не показываем сайдбар, если пользователь не авторизован

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
        { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
        { text: 'Events', icon: <EventIcon />, path: '/events' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    width: isOpen ? 240 : 60,
                    transition: 'width 0.3s',
                },
            }}
        >
            <Box
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: isOpen ? 'space-between' : 'center',
                            padding: 2,
                        }}
                    >
                        {isOpen && <Typography variant="h6">Hambax</Typography>}
                        <IconButton onClick={toggleSidebar}>
                            {isOpen ? <CloseIcon /> : <MenuIcon />}
                        </IconButton>
                    </Box>
                    <Divider />
                    <List>
                        {menuItems.map((item, index) => (
                            <ListItem
                                button
                                key={index}
                                onClick={() => navigate(item.path)}
                                sx={{
                                    justifyContent: isOpen ? 'flex-start' : 'center',
                                    '&:hover': { backgroundColor: '#f4f4f4' },
                                }}
                            >
                                <ListItemIcon sx={{ justifyContent: 'center' }}>
                                    {item.icon}
                                </ListItemIcon>
                                {isOpen && <ListItemText primary={item.text} />}
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Box>
                    <Divider />
                    <ListItem
                        button
                        onClick={handleLogout}
                        sx={{
                            justifyContent: isOpen ? 'flex-start' : 'center',
                            '&:hover': { backgroundColor: '#f4f4f4' },
                        }}
                    >
                        <ListItemIcon sx={{ justifyContent: 'center' }}>
                            <LogoutIcon />
                        </ListItemIcon>
                        {isOpen && <ListItemText primary="Logout" />}
                    </ListItem>
                </Box>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
