// Simple React app showing iris data visualizations
import React from "react";
import { useState } from "react";
import { useChartData } from "./utils/Data";
import { useTheme } from "./utils/ThemeContext";
import ScatterChart from "./components/ScatterChart";
import Login from "./components/Login";
import Button from '@mui/material/Button';  // found this cool material ui button!
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import "./App.css";

// my first react app with material ui!
function App() {
  // variables for user stuff
  let [user, changeUser] = useState(null);

  // get the dark mode stuff
  const { isDarkMode, toggleDarkMode } = useTheme();

  // get the chart data
  const myChartData = useChartData(user?.permissions);

  // handle the login
  function doLogin(email, userInfo) {
    console.log('logging in user:', email);
    changeUser(userInfo);
  }

  // handle logout button
  function doLogout() {
    console.log('logging out...');
    changeUser(null);
  }

  // show different screens
  if (user == null) {
    return <Login onLogin={doLogin} />;
  }

  if (myChartData.isLoading === true) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white'}`}>
        <CircularProgress />
        <span className={`ml-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading your data...</span>
      </div>
    );
  }

  if (myChartData.error != null) {
    return (
      <div className={`p-5 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <Alert severity="error">
          Error: {myChartData.error}
        </Alert>
      </div>
    );
  }

  // main app screen
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* top bar with user info and logout */}
      <div className={`px-5 py-4 flex justify-between items-center shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div>
          <h2 className={`text-xl font-semibold m-0 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Hi {user.name}!
          </h2>
          <div className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
            Access: {user.permissions}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* dark mode toggle */}
          <IconButton 
            onClick={toggleDarkMode} 
            className={isDarkMode ? '!text-white' : '!text-gray-700'}
          >
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          <Button 
            variant="contained"
            onClick={doLogout}
            startIcon={<LogoutIcon />}
            className={`${isDarkMode ? '!bg-red-600 hover:!bg-red-700' : '!bg-my-red hover:!bg-red-500'}`}
            size="small"
          >
            Logout
          </Button>
        </div>
      </div>

      {/* charts */}
      <div className="max-w-7xl mx-auto mt-10 p-5">
        {myChartData.data && (
          <>
            <div className="mb-10">
              <ScatterChart data={myChartData.data.sepal} title="Sepal" />
            </div>
            <div>
              <ScatterChart data={myChartData.data.petal} title="Petal" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// export the app
export default App;
