import DashboardLayout from "@/Layout/layout";
import DataCard from "./_components/data-card";
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import Chart from "./_components/chart";
import { useEffect, useState } from "react";

const Analytics = () => {
  const { user} = useUser();
  const [totalSales, setTotalSales] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [data, setData] = useState([]);

  if(!user?.id)
    {
      return <Navigate to="/" replace />;
    }

  useEffect(()=>{

   
    

    (async()=>{

      try {
        const analytics = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/getanalytics/sales?teacherid=${user?.id}`)
        const response = await analytics.json();
   
       setTotalRevenue(response.total[0].total_revenue);
       setTotalSales(response.total[0].total_sales);
       setData(response.data) 

    
      } catch (error) {
        console.log(error)
      }
    })()
  },[])
  
  return (
    <DashboardLayout>
      <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 ">
        <DataCard label='Total Revenue' value={totalRevenue} shouldFormat key='1'/>
        <DataCard label='Total Sales' value={totalSales} key='2'/>
      </div>

      <Chart data={data}/>

      </div>
    </DashboardLayout>
  );
};
export default Analytics;
