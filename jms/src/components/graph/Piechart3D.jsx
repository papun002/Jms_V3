import React, { useRef, useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement,    Tooltip, Legend);   

const Piechart3D = ({
  data = [12000, 144000, 22350],
  labels = ['Monthly Sales', 'Yearly Sales', 'Today Sales'],
  options: customOptions,
  backgroundColor = ['rgba(0, 255, 170, 0.6)', 'rgba(255, 165, 0, 0.6)', 'rgba(100, 255, 255, 0.6)'],
  borderColor = ['rgba(0, 255, 170, 1)', 'rgba(255, 165, 0, 1)', 'rgba(100, 255, 255, 1)'],
  hoverBackgroundColor = ['rgba(0, 255, 170, 0.8)', 'rgba(255, 165, 0, 0.8)', 'rgba(100, 255, 255, 0.8)'],
  hoverBorderColor = ['rgba(0, 255, 170, 1)', 'rgba(255, 165, 0, 1)', 'rgba(100, 255, 255, 1)'],
}) => {
  const chartRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      const ctx = chart.ctx;

      // Create gradients for each slice
      const gradients = data.map((_, index) => {
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, backgroundColor[index]);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.2)'); // Add a subtle glow
        return gradient;
      });

      chart.data.datasets[0].backgroundColor = gradients;
      chart.update();
    }
  }, [data, backgroundColor]);

  const defaultOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
          color: '#fff', // White text for futuristic look
          padding: 20,
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw;
            const label = tooltipItem.label;
            return `${label}: ${value.toLocaleString()}`;
          },
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1500,
      easing: 'easeInOutElastic',
    },
    elements: {
      arc: {
        borderWidth: 2,
        borderColor: '#fff',
        shadowOffsetX: 2,
        shadowOffsetY: 2,
        shadowBlur: 10,
        shadowColor: 'rgba(0, 0, 0, 0.3)',
      },
    },
    // Add a dark, starry background
    backgroundColor: 'rgba(0, 0, 20, 0.8)',
    // Add data labels
    plugins: {
      datalabels: {
        color: '#fff',
        font: {
          weight: 'bold',
        },
        formatter: (value) => `${value} - ${((value / data.reduce((a, b) => a + b, 0)) * 100).toFixed(2)}%`,
      },
    },
  };

  const options = { ...defaultOptions, ...customOptions };

  return (
    <Pie
      ref={chartRef}
      data={{
        labels,
        datasets: [
          {
            data,
            backgroundColor,
            borderColor,
            hoverBackgroundColor,
            hoverBorderColor,
            borderWidth: 2,
          },
        ],
      }}
      options={options}
    />
  );
};

export default Piechart3D;
