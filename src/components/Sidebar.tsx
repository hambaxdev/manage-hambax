import React, { useContext } from 'react';
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
import { AuthContext } from '../context/AuthContext';
import type { AuthContextType } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

// Define interface for menu items
interface MenuItem {
    text: string;
    icon: React.ReactNode;
    path: string;
}

// Define interface for Sidebar props
interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
    const navigate = useNavigate();
    const { isAuthenticated, logout, userRole } = useContext(AuthContext) as AuthContextType;
    const { t } = useTranslation();
    const isMobile = useMediaQuery('(max-width: 768px)');

    if (!isAuthenticated) return null;

    const allMenuItems: MenuItem[] = [
        { text: t('sidebar.dashboard'), icon: <DashboardIcon />, path: '/' },
        { text: t('sidebar.profile'), icon: <PersonIcon />, path: '/profile' },
        { text: t('sidebar.events'), icon: <EventIcon />, path: '/events' },
        { text: t('sidebar.scan_qr'), icon: <QrCodeScannerIcon />, path: '/scan-qr' },
        { text: t('sidebar.payouts'), icon: <AttachMoneyIcon />, path: '/payouts' },
        { text: t('sidebar.staff_management'), icon: <PersonIcon />, path: '/staff' }
    ];

    const filteredMenuItems: MenuItem[] = userRole === 'scanner'
        ? allMenuItems.filter(item =>
            item.path === '/' || item.path === '/scan-qr'
        )
        : allMenuItems;

    const handleLogout = (): void => {
        logout();
        navigate('/login');
    };

    return (
        <>
            {/* Only show the toggle button in mobile view when sidebar is closed */}
            {isMobile && !isOpen && (
                <IconButton 
                    onClick={toggleSidebar} 
                    sx={{ 
                        position: 'absolute', 
                        top: 16, 
                        left: 16, 
                        zIndex: 1300
                    }}
                >
                    <MenuIcon />
                </IconButton>
            )}

            <Drawer
                variant={isMobile ? 'temporary' : 'persistent'}
                open={isMobile ? isOpen : true}
                onClose={toggleSidebar}
                sx={{
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: isMobile 
                            ? (isOpen ? 240 : 0) 
                            : (isOpen ? 240 : 60),
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

                            {/* Toggle button - different position based on mode */}
                            <IconButton
                                onClick={toggleSidebar}
                                sx={{ 
                                    position: isOpen ? 'absolute' : 'relative',
                                    right: isMobile ? 'auto' : (isOpen ? '8px' : 'auto'),
                                    left: isMobile ? '8px' : 'auto'
                                }}
                            >
                                {isOpen ? <CloseIcon /> : <MenuIcon />}
                            </IconButton>
                        </Box>
                        <Divider />
                        <List>
                            {filteredMenuItems.map((item, index) => (
                                <ListItem
                                    component="button"
                                    key={index}
                                    onClick={() => {
                                        navigate(item.path);
                                        if (isMobile) toggleSidebar();
                                    }}
                                    sx={{
                                        justifyContent: isOpen ? 'flex-start' : 'center',
                                        '&:hover': { backgroundColor: '#f4f4f4' },
                                        background: 'none',
                                        border: 'none',
                                        padding: '8px 16px',
                                        textAlign: 'left',
                                        width: '100%',
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
                            component="button"
                            onClick={handleLogout}
                            sx={{
                                justifyContent: isOpen ? 'flex-start' : 'center',
                                '&:hover': { backgroundColor: '#f4f4f4' },
                                background: 'none',
                                border: 'none',
                                padding: '8px 16px',
                                textAlign: 'left',
                                width: '100%',
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
