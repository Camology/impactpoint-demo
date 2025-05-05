// login page component with material ui
import React from 'react';
import { useState } from 'react';
import { loginUser } from '../services/api';
import { useTheme } from '../utils/ThemeContext';
import TextField from '@mui/material/TextField';  // cool text input from material ui
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

// make the login form
function Login(props) {
  // state variables
  const [emailInput, setEmailInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // get dark mode stuff
  const { isDarkMode, toggleDarkMode } = useTheme();

  // handle form submission
  async function submitForm(e) {
    // stop page refresh
    e.preventDefault();
    console.log('submitting form...');

    // validate email
    if (emailInput.trim() === '') {
      setErrorMsg('Enter an email to login!');
      return;
    }

    // try to log in
    setIsLoading(true);
    setErrorMsg('');

    try {
      // call the api
      let result = await loginUser(emailInput);
      console.log('login successful!', result);
      
      // tell parent component
      props.onLogin(emailInput, result.user);
    } catch (error) {
      console.error('login failed:', error);
      setErrorMsg(error.message || 'Something went wrong with your login!');
    }

    setIsLoading(false);
  }

  // update email input
  function handleEmailChange(e) {
    setEmailInput(e.target.value);
  }

  return (
    <div className={`flex items-center justify-center min-h-screen p-5 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className={`w-full max-w-md rounded-lg shadow-sm p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Welcome!
          </h2>
          <IconButton 
            onClick={toggleDarkMode}
            className={isDarkMode ? '!text-white' : '!text-gray-700'}
          >
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </div>

        {/* show error if any */}
        {errorMsg && (
          <Alert severity="error" className="mb-4">
            {errorMsg}
          </Alert>
        )}

        <form onSubmit={submitForm} className="space-y-4">
          <TextField
            type="email"
            value={emailInput}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            variant="outlined"
            fullWidth
            disabled={isLoading}
            label="Email"
            className={`!mb-6 ${isDarkMode ? '!text-white' : ''}`}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: isDarkMode ? 'rgba(255,255,255,0.23)' : undefined,
                },
                '&:hover fieldset': {
                  borderColor: isDarkMode ? 'rgba(255,255,255,0.5)' : undefined,
                },
              },
              '& .MuiInputLabel-root': {
                color: isDarkMode ? 'rgba(255,255,255,0.7)' : undefined,
              },
              '& .MuiOutlinedInput-input': {
                color: isDarkMode ? 'white' : undefined,
              },
            }}
          />
          
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            fullWidth
            startIcon={isLoading ? <CircularProgress size={20} /> : <LoginIcon />}
            className={`${isDarkMode ? '!bg-green-600 hover:!bg-green-700' : '!bg-my-green hover:!bg-green-500'}`}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login; 