// utils/Data.js
import { useState, useEffect } from 'react';
import { getChartData } from '../services/api';
import { useTheme } from './ThemeContext';

// custom hook for chart data
export function useChartData(permissions) {
  // state variables
  let [chartData, setChartData] = useState(null);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);
  const { isDarkMode } = useTheme();

  // fetch data when permissions change
  useEffect(() => {
    // don't fetch if no permissions
    if (!permissions) {
      return;
    }

    // function to get the data
    async function getData() {
      console.log('fetching data for permissions:', permissions);
      setLoading(true);
      setError(null);

      try {
        // get data from api
        let apiData = await getChartData(permissions);
        console.log('got data:', apiData);

        // Define colors based on dark mode
        const colors = {
          green: isDarkMode ? 'rgba(0, 255, 179, 0.9)' : 'rgba(75, 192, 192, 0.8)',
          pink: isDarkMode ? 'rgba(255, 105, 180, 0.9)' : 'rgba(255, 99, 132, 0.8)',
          blue: isDarkMode ? 'rgba(51, 194, 255, 0.9)' : 'rgba(54, 162, 235, 0.8)'
        };

        // process sepal data
        let sepalData = {
          datasets: [
            {
              label: 'Sepal Width',
              data: apiData.map(item => ({
                x: item['sepal.length'],
                y: item['sepal.width']
              })),
              backgroundColor: colors.green
            },
            {
              label: 'Petal Length',
              data: apiData.map(item => ({
                x: item['sepal.length'],
                y: item['petal.length']
              })),
              backgroundColor: colors.pink
            },
            {
              label: 'Petal Width',
              data: apiData.map(item => ({
                x: item['sepal.length'],
                y: item['petal.width']
              })),
              backgroundColor: colors.blue
            }
          ]
        };

        // process petal data
        let petalData = {
          datasets: [
            {
              label: 'Sepal Width',
              data: apiData.map(item => ({
                x: item['petal.length'],
                y: item['sepal.width']
              })),
              backgroundColor: colors.green
            },
            {
              label: 'Petal Width',
              data: apiData.map(item => ({
                x: item['petal.length'],
                y: item['petal.width']
              })),
              backgroundColor: colors.pink
            },
            {
              label: 'Sepal Length',
              data: apiData.map(item => ({
                x: item['petal.length'],
                y: item['sepal.length']
              })),
              backgroundColor: colors.blue
            }
          ]
        };

        // update state with processed data
        setChartData({
          sepal: sepalData,
          petal: petalData
        });
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      }

      setLoading(false);
    }

    // call the function
    getData();
  }, [permissions, isDarkMode]); // Add isDarkMode to dependencies

  // return the state
  return {
    data: chartData,
    isLoading: loading,
    error: error
  };
}

export const Data = [
    
  ];