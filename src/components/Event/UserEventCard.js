import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';

const UserEventCard = ({ event, onDelete }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleEdit = () => {
    handleMenuClose();
    navigate(`/events/${event._id}`);
  };

  const handleDelete = () => {
    handleMenuClose();
    if (onDelete) onDelete(event._id);
  };

  const eventDate = new Date(event.eventDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDay = new Date(eventDate);
  eventDay.setHours(0, 0, 0, 0);

  let badgeLabel = 'Upcoming';
  let badgeColor = '#00e676';

  if (eventDay < today) {
    badgeLabel = 'Overdue';
    badgeColor = '#ffea00';
  } else if (eventDay.getTime() === today.getTime()) {
    badgeLabel = 'Today';
    badgeColor = '#2979ff';
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'stretch',
        minHeight: 100,
        position: 'relative',
        width: '100%',
        transition: 'transform 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
        },
      }}
      onClick={() => navigate(`/events/${event._id}`)}
    >
      {/* Левый блок — дата */}
      <Box
        sx={{
          backgroundColor: 'grey.800',
          color: 'white',
          px: 2,
          py: 1.5,
          minWidth: 100,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 3,
          zIndex: 1,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {eventDate.getDate()}
        </Typography>
        <Typography variant="body2">
          {eventDate.toLocaleString('default', { month: 'short' })}
        </Typography>
      </Box>

      {/* Правый блок */}
      <Box
        sx={{
          zIndex: 2,
          flexGrow: 1,
          px: 2,
          py: 1.5,
          backgroundColor: 'background.paper',
          borderTopLeftRadius: 24,
          borderBottomLeftRadius: 24,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          boxShadow: 3,
          ml: -3,
        }}
      >
        {/* Заголовок + кнопка меню */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="500">
            {event.title}
          </Typography>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              handleMenuOpen(e);
            }}
          >
            <MoreVertIcon />
          </IconButton>
        </Box>

        {/* Дата и статус */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
          <Box
            sx={{
              backgroundColor: badgeColor,
              color: '#000',
              px: 1.5,
              py: 0.5,
              borderRadius: 2,
              fontSize: 12,
              fontWeight: 600,
              lineHeight: 1,
            }}
          >
            {badgeLabel}
          </Box>
          <Typography variant="body2" color="text.secondary">
            {eventDate.toLocaleDateString()}
          </Typography>
        </Box>
      </Box>

      {/* Контекстное меню */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        onClick={(e) => e.stopPropagation()}
      >
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleEdit();
          }}
        >
          Изменить
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
        >
          Удалить
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserEventCard;
