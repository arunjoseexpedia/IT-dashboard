import { useState } from 'react';
import { Box, Tooltip } from '@mui/material';
import { ChatBubbleRounded } from '@mui/icons-material';
import ChatBot from './ChatBot';

const FloatingChatButton = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      <Tooltip title="Need Help?">
        <Box
          onClick={() => setChatOpen(true)}
          sx={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #D85A30 0%, #D85A30 100%)',
            boxShadow: '0 4px 20px rgba(216, 90, 48, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 999,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'scale(1.08)',
              boxShadow: '0 6px 28px rgba(37, 99, 235, 0.5)',
            },
            '&:active': {
              transform: 'scale(0.95)',
            },
            '@media (max-width: 768px)': {
              width: '52px',
              height: '52px',
              bottom: '16px',
              right: '16px',
            },
          }}
        >
          <ChatBubbleRounded
            sx={{
              fontSize: '28px',
              color: 'white',
              '@media (max-width: 768px)': {
                fontSize: '24px',
              },
            }}
          />
        </Box>
      </Tooltip>

      {/* ChatBot Modal */}
      <ChatBot open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
};

export default FloatingChatButton;
