import { useEffect, useRef } from 'react';
import Chart, { DoughnutAnimationOptions } from 'chart.js/auto';
import { DocumentData } from 'firebase/firestore';

const ResultChart = ({ aggregatedData }: { aggregatedData: DocumentData }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        // aggregatedDataをオブジェクトに変換
        const convertedData: { [key: string]: number } = {};
        Object.entries(aggregatedData).forEach(([key, value]) => {
          if (key !== 'total') {
            convertedData[key] = value as number;
          }
        });

        chartInstanceRef.current = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: Object.keys(convertedData),
            datasets: [
              {
                label: '回答数',
                data: Object.values(convertedData),
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 205, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                  'rgb(255, 99, 132)',
                  'rgb(255, 159, 64)',
                  'rgb(255, 205, 86)',
                  'rgb(75, 192, 192)',
                  'rgb(54, 162, 235)',
                  'rgb(153, 102, 255)',
                  'rgb(201, 203, 207)'
                ],
                borderWidth: 1
              },
            ],
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            plugins: {
              legend: {
                position: 'top' as const,
              },
              title: {
                display: true,
                text: 'アンケート結果',
              },
            },
          },
        });
      }
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [aggregatedData]);

  return <canvas ref={chartRef} className='mt-10'/>;
};

export default ResultChart;
