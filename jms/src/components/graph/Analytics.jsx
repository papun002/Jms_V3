import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

function Analytics() {
  const [chartData, setChartData] = useState([]); // Default data for the chart
  const [activeButton, setActiveButton] = useState("one_year");

  useEffect(() => {
    fetchData(activeButton);
  }, [activeButton]);

  const fetchData = (timeRange) => {
    // Simulate fetching data based on time range
    let endpoint = "";
    switch (timeRange) {
      case "one_month":
        endpoint = "your_api_endpoint_one_month";
        break;
      case "six_months":
        endpoint = "your_api_endpoint_six_months";
        break;
      case "one_year":
        endpoint = "your_api_endpoint_one_year";
        break;
      case "ytd":
        endpoint = "your_api_endpoint_ytd";
        break;
      case "all":
        endpoint = "your_api_endpoint_all";
        break;
      default:
        endpoint = "your_api_endpoint_one_year";
    }

    // For the sake of the example, we're not making a real API call, just using the default data
    setChartData([
      30, 40, 125, 1, 67, 6, 87, 43, 45, 94, 34, 72
    ]);
  };

  const handleButtonClick = (timeRange) => {
    setActiveButton(timeRange);
  };

  const options = {
    chart: {
      type: 'area',
      stacked: false,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true
        },
        autoSelected: 'zoom'
      }
    },
    colors: ['#FF4500'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 100]
      }
    },
    series: [{
      name: 'Series 1',
      data: chartData
    }],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yaxis: {
      title: {
        text: 'Value'
      },
    },
    tooltip: {
      theme: 'dark',
      x: {
        format: 'MMM',
      },
      y: {
        formatter: (val) => `$${val}`,
        title: {
          formatter: (seriesName) => seriesName,
        }
      },
    },
  };

  return (
    <div className="col-xl-12 col-lg-12">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Sales Analytics</h3>
          <div className="card-options">
            <button
              className={`btn btn-sm btn-outline-secondary mr-1 ${activeButton === "one_month" && "active"}`}
              onClick={() => handleButtonClick("one_month")}
            >
              1M
            </button>
            <button
              className={`btn btn-sm btn-outline-secondary mr-1 ${activeButton === "six_months" && "active"}`}
              onClick={() => handleButtonClick("six_months")}
            >
              6M
            </button>
            <button
              className={`btn btn-sm btn-outline-secondary mr-1 ${activeButton === "one_year" && "active"}`}
              onClick={() => handleButtonClick("one_year")}
            >
              1Y
            </button>
            <button
              className={`btn btn-sm btn-outline-secondary ${activeButton === "all" && "active"}`}
              onClick={() => handleButtonClick("all")}
            >
              ALL
            </button>
          </div>
        </div>
        <div className="card-body">
          <ReactApexChart options={options} series={options.series} type="area" height={350} />
        </div>
      </div>
    </div>
  );
}

export default Analytics;
