// chart component for showing scatter plots
import React from "react";
import { useState, useEffect } from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,    
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import Slider from '@mui/material/Slider';
import Paper from '@mui/material/Paper';  
import { useTheme } from '../utils/ThemeContext'; 

// register the chart stuff we need
ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
);

// make the chart
function ScatterChart(props) {
  // get the data from props
  const data = props.data;
  const title = props.title;

  // get dark mode
  const { isDarkMode } = useTheme();

  // calculate maxY when data changes
  const maxY = React.useMemo(() => {
    if (!data || !data.datasets) return 0;
    
    let max = 0;
    data.datasets.forEach(dataset => {
      dataset.data.forEach(point => {
        if (point.y > max) {
          max = point.y;
        }
      });
    });
    return Math.ceil(max) + 1;
  }, [data]);

  // state for Y axis range
  const [yAxisRange, setYAxisRange] = useState([0, maxY]);

  // Only update range on initial load and when data changes
  useEffect(() => {
    if (data && data.datasets) {
      console.log('data changed, setting initial range');
      setYAxisRange(prevRange => {
        // If we already have a range set, keep it
        if (prevRange[1] > 0) {
          return prevRange;
        }
        // Otherwise set initial range
        return [0, maxY];
      });
    }
  }, [data]); 

  // chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: title + ' Based Measurements',
        font: { size: 16, weight: 'bold' },
        color: isDarkMode ? '#fff' : '#000'
      },
      legend: {
        position: 'top',
        labels: {
          color: isDarkMode ? '#fff' : '#000'
        }
      },
      tooltip: {
        backgroundColor: isDarkMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)',
        titleColor: isDarkMode ? '#fff' : '#000',
        bodyColor: isDarkMode ? '#fff' : '#000'
      },
      // Add custom plugin to set background color
      customCanvasBackgroundColor: {
        color: isDarkMode ? '#1f2937' : '#ffffff',
      }
    },
    scales: {
      x: {
        type: 'linear',  
        title: {
          display: true,
          text: title + ' Length',
          font: { weight: 'bold' },
          color: isDarkMode ? '#fff' : '#000'
        },
        grid: {
          color: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
        },
        ticks: {
          color: isDarkMode ? '#fff' : '#000'
        }
      },
      y: {
        type: 'linear',  
        title: {
          display: true,
          text: 'Size',
          font: { weight: 'bold' },
          color: isDarkMode ? '#fff' : '#000'
        },
        min: yAxisRange[0],
        max: yAxisRange[1],
        grid: {
          color: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
        },
        ticks: {
          color: isDarkMode ? '#fff' : '#000'
        }
      }
    }
  };

  // Register the custom background plugin
  const plugin = {
    id: 'customCanvasBackgroundColor',
    beforeDraw: (chart, args, options) => {
      const {ctx} = chart;
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = options.color || '#ffffff';
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    }
  };

  // Register the plugin
  ChartJS.register(plugin);

  // handle slider change
  function updateYAxis(event, newValue) {
    console.log('updating y-axis range:', newValue);
    setYAxisRange(newValue);
  }

  return (
    <Paper 
      elevation={2} 
      className={`p-5 h-[500px] flex gap-5 ${isDarkMode ? 'bg-gray-800 !bg-gray-800' : 'bg-white'}`}
      sx={{
        backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
        '& .MuiPaper-root': {
          backgroundColor: isDarkMode ? '#1f2937' : '#ffffff'
        }
      }}
    >
      {/* y-axis range slider */}
      <Slider
        orientation="vertical"
        value={yAxisRange}
        onChange={updateYAxis}
        min={0}
        max={maxY}
        valueLabelDisplay="auto"
        step={0.5}
        className={`!mx-2 ${isDarkMode ? '!text-white' : ''}`}
      />

      {/* chart */}
      <div className="flex-1">
        <Scatter 
          data={data} 
          options={chartOptions}
          className="h-full"
        />
      </div>
    </Paper>
  );
}

// export the component
export default ScatterChart; 