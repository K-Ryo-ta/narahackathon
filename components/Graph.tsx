import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { DocumentData } from 'firebase/firestore';

const ResultChart = ({ aggregatedData }: { aggregatedData: DocumentData[] }) => {
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
        aggregatedData.forEach((data) => {
          Object.entries(data).forEach(([key, value]) => {
            if (key !== 'total') {
              convertedData[key] = value as number;
            }
          });
        });

        chartInstanceRef.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: Object.keys(convertedData),
            datasets: [
              {
                label: '回答数',
                data: Object.values(convertedData),
                backgroundColor: 'rgba(75,192,192,0.6)',
              },
            ],
          },
          options: {
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

  return <canvas ref={chartRef} />;
};

export default ResultChart;
