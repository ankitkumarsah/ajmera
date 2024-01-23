import { useEffect, useState } from "react";
import { request } from "../api/requests";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPage = () => {

  const [dashboardData, setDashboardData]: any = useState();
  useEffect(() => {
    getDashboardData();
  }, []);

  const getDashboardData = async () => {
    const res = await request.get({ url: '/user/dashboard' });
    if (res.success) {
      setDashboardData(res.data);
    }
  }

  const data = {
    labels: dashboardData?.chartdata?.map((data: any) => data.month),
    datasets: [
      {
        label: 'Total Count',
        data: dashboardData?.chartdata?.map((data: any) => data.totalCount),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Pendings',
        data: dashboardData?.chartdata?.map((data: any) => data.pendingCount),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart',
      },
    },
  };
  return (
    <div className="container px-6 mx-auto grid mt-2">
      <div className="chart-container bg-white p-4 width-[100%] rounded">
        <Bar options={options} data={data} />
      </div>

    </div>
  )
}

export default DashboardPage