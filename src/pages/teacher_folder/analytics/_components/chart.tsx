import { Card } from '@/components/ui/card';


import {Bar, BarChart, ResponsiveContainer, XAxis, YAxis} from 'recharts'

interface ChartProps{
    data:{
        title:string;
        price:string;
    }[];
}



function chart( {data}: ChartProps) {

    const parsedData = data.map(item => ({
        ...item,
        price: parseFloat(item.price)  // Convert 'price' to a number
      }));
   
  return (
   <Card>
    <ResponsiveContainer width='100%' height={350}>

        <BarChart data={parsedData}>

            <XAxis dataKey='title' stroke='#888888' fontSize={12} tickLine={false} axisLine={false}/>
            <YAxis stroke='#888888' fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value)=>`$${value}`}/>

            <Bar dataKey='price' fill='#0369al' radius={[4, 4, 0, 0]}/>

        </BarChart>


    </ResponsiveContainer>
   </Card>
  )
}

export default chart