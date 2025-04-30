import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

import { memo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

interface Link {
  url: string;
  icon: React.ElementType;
  name: string;
}

interface SidebarItemsProps {
  link: Link;
  isLastItem?: boolean;
  onClose: () => void;
}

const SidebarItems = memo(function SidebarItems({
  link,
  isLastItem = false,
  onClose,
}: SidebarItemsProps) {
  const location = useLocation();

  const isActive = location.pathname.startsWith(link.url);

  return (
    <div className={`w-[85%] m-auto ${isLastItem ? 'mt-28' : ''}`}>
      <ListItem
        disablePadding
        disableGutters
        sx={{
          mt: '.5em',
          borderRadius: '10px',
        }}
      >
        <ListItemButton
          component={NavLink}
          to={link.url}
          className=""
          sx={{
            color: '#FFFFFF !important',
            background: isActive ? '#071836' : 'transparent',
            borderRadius: '10px',
            '&.active': {
              background: '#071836',
              color: '#FFFFFF',
            },
            '&:hover': {
              background: '#071836',
              color: '#FFFFFF',
            },
          }}
          onClickCapture={onClose}
        >
          <ListItemIcon
            className="text-[#0B3140]"
            sx={{
              minWidth: '35px',
            }}
          >
            {<link.icon />}
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={<Typography>{link.name}</Typography>}
          />
        </ListItemButton>
      </ListItem>
    </div>
  );
});

SidebarItems.displayName = 'SidebarItems';

export default SidebarItems;
