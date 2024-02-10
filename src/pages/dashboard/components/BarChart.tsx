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
import { faker } from '@faker-js/faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Profits Bar Chart',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Gain',
            data: labels.map(() => {
                const revenue = faker.datatype.number({ min: 0, max: 1000 });
                const gain = faker.datatype.number({ min: revenue + 1, max: 2000 });
                return gain;
            }),
            backgroundColor: 'rgba(255, 109, 77, 0.4)',
        },
        {
            label: 'Revenue',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(47, 46, 221, 0.46)',
        },
    ],
};

export default function BarChart() {
    return <Bar options={options} data={data} />;
}
