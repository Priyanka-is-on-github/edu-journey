import { Card } from '@/components/ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface ChartProps {
  data: {
    title: string;
    price: string;
  }[];
}

function Chart({ data }: ChartProps) {
  // Safe data parsing with error handling
  const parsedData = data.map(item => ({
    title: item.title || 'Untitled',
    price: parseFloat(item.price) || 0  // Default to 0 if parsing fails
  }));

  // Don't render if no valid data
  if (parsedData.length === 0 || parsedData.every(item => item.price === 0)) {
    return (
      <Card className="p-6 text-center">
        <p>No chart data available</p>
      </Card>
    );
  }

  return (
    <Card>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={parsedData}>
          <XAxis 
            dataKey="title" 
            stroke="#888888" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            angle={-45} // Rotate labels if they're long
            textAnchor="end"
            height={80}
          />
          <YAxis 
            stroke="#888888" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            tickFormatter={(value) => `$${value}`}
          />
          <Bar 
            dataKey="price" 
            fill="#0369a1"  // Fixed color code
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

export default Chart;