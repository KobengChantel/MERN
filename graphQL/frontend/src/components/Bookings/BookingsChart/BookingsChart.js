import React from 'react';
import { Bar } from 'react-chartjs-2';

const BOOKINGS_BUCKETS = {
  Cheap: {
    min: 0,
    max: 100
  },
  Normal: {
    min: 100,
    max: 200
  },
  Expensive: {
    min: 200,
    max: 10000000
  }
};

const BookingsChart = (props) => {
  const chartData = {
    labels: [],
    datasets: [
      {
        label: 'Bookings',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: []
      }
    ]
  };

  for (const bucket in BOOKINGS_BUCKETS) {
    const filteredBookingsCount = props.bookings.reduce((prev, current) => {
      if (
        current.event.price > BOOKINGS_BUCKETS[bucket].min &&
        current.event.price < BOOKINGS_BUCKETS[bucket].max
      ) {
        return prev + 1;
      } else {
        return prev;
      }
    }, 0);
    chartData.labels.push(bucket);
    chartData.datasets[0].data.push(filteredBookingsCount);
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <Bar data={chartData} />
    </div>
  );
};

export default BookingsChart;
