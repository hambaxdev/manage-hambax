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
    useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const navigate = useNavigate();
    const { isAuthenticated, logout, userRole } = useContext(AuthContext);
    const { t } = useTranslation();
    const isMobile = useMediaQuery('(max-width: 768px)');

    if (!isAuthenticated) return null;

    const allMenuItems = [
        { text: t('sidebar.dashboard'), icon: <DashboardIcon />, path: '/' },
        { text: t('sidebar.profile'), icon: <PersonIcon />, path: '/profile' },
        { text: t('sidebar.events'), icon: <EventIcon />, path: '/events' },
        { text: t('sidebar.scan_qr'), icon: <QrCodeScannerIcon />, path: '/scan-qr' },
        { text: t('sidebar.payouts'), icon: <AttachMoneyIcon />, path: '/payouts' },
        { text: t('sidebar.staff_management'), icon: <PersonIcon />, path: '/staff' }
    ];

    const filteredMenuItems = userRole === 'scanner'
        ? allMenuItems.filter(item =>
            item.path === '/' || item.path === '/scan-qr'
        )
        : allMenuItems;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <>
            {isMobile && (
                <IconButton onClick={toggleSidebar} sx={{ position: 'absolute', top: 16, left: 16, zIndex: 1300 }}>
                    <MenuIcon />
                </IconButton>
            )}

            <Drawer
                variant={isMobile ? 'temporary' : 'permanent'}
                open={isMobile ? isOpen : true}
                onClose={toggleSidebar}
                sx={{
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: isMobile ? (isOpen ? 240 : 0) : isOpen ? 240 : 60,
                        transition: 'width 0.3s',
                        overflowX: 'hidden',
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
                                position: 'relative',
                            }}
                        >
                            {isOpen && (
                                <Typography
                                    variant="h6"
                                    sx={{
                                        marginLeft: isMobile ? '40px' : '0px',
                                        transition: 'margin-left 0.3s',
                                    }}
                                >
                                    {t('sidebar.title')}
                                </Typography>
                            )}
                            {isMobile && (
                                <IconButton
                                    onClick={toggleSidebar}
                                    sx={{ position: 'absolute', left: '8px' }}
                                >
                                    {isOpen ? <CloseIcon /> : <MenuIcon />}
                                </IconButton>
                            )}
                        </Box>
                        <Divider />
                        <List>
                            {filteredMenuItems.map((item, index) => (
                                <ListItem
                                    button
                                    key={index}
                                    onClick={() => {
                                        navigate(item.path);
                                        if (isMobile) toggleSidebar();
                                    }}
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
                            {isOpen && <ListItemText primary={t('sidebar.logout')} />}
                        </ListItem>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
};

export default Sidebar;
