import { useState } from 'react';
import { Box, Paper, TextField, IconButton, Typography, Dialog, DialogTitle, Divider } from '@mui/material';
import { Close, Send } from '@mui/icons-material';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatBotProps {
  open: boolean;
  onClose: () => void;
}

const ChatBot = ({ open, onClose }: ChatBotProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hey there 👋 How can we help you?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Thanks for your message! Our team will assist you shortly.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: '450px',
          height: '600px',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          backgroundColor: '#02355A',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 20px',
          margin: 0,
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Typography sx={{ fontSize: '18px', fontWeight: 700 }}>
            Virtual Assistant
          </Typography>
        </Box>
        <IconButton
          size="small"
          onClick={onClose}
          sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <Divider />

      {/* Messages Container */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          backgroundColor: '#F5F5F5',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#e0e0e0',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#9e9e9e',
            borderRadius: '3px',
            '&:hover': {
              backgroundColor: '#757575',
            },
          },
        }}
      >
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <Paper
              sx={{
                maxWidth: '70%',
                padding: '10px 14px',
                borderRadius: '8px',
                backgroundColor: message.sender === 'user' ? '#0052CC' : '#FFFFFF',
                color: message.sender === 'user' ? '#FFFFFF' : '#333333',
                fontSize: '14px',
                lineHeight: '1.4',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              {message.text}
            </Paper>
          </Box>
        ))}
      </Box>

      <Divider />

      {/* Input Container */}
      <Box
        sx={{
          padding: '14px 16px',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          gap: '8px',
          alignItems: 'flex-end',
        }}
      >
        <TextField
          fullWidth
          multiline
          maxRows={3}
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          variant="outlined"
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px',
              backgroundColor: '#F5F5F5',
              fontSize: '14px',
              '& fieldset': {
                borderColor: '#D0D0D0',
              },
              '&:hover fieldset': {
                borderColor: '#B0B0B0',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#0052CC',
              },
            },
            '& .MuiOutlinedInput-input': {
              padding: '10px 16px',
              '&::placeholder': {
                color: '#999999',
                opacity: 1,
              },
            },
          }}
        />
        <IconButton
          onClick={handleSendMessage}
          disabled={inputValue.trim() === ''}
          sx={{
            color: '#0052CC',
            '&:hover': {
              backgroundColor: 'rgba(0,82,204,0.1)',
            },
            '&:disabled': {
              color: '#CCCCCC',
            },
          }}
        >
          <Send sx={{ fontSize: 20 }} />
        </IconButton>
      </Box>
    </Dialog>
  );
};

export default ChatBot;
