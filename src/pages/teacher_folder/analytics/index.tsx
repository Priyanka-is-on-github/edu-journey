import DashboardLayout from "@/Layout/layout";
import DataCard from "./_components/data-card";
import { useUser } from "@clerk/clerk-react";
import Chart from "./_components/chart";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

const Analytics = () => {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();
  const [totalSales, setTotalSales] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSignedIn) {
      toast.error("Please sign in to access your analytics");
      navigate("/teacher/courses");
      return;
    }

    (async () => {
      try {
        setLoading(true);
        const analytics = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/getanalytics/sales?teacherid=${user?.id}`
        );
        
        if (!analytics.ok) {
          throw new Error('Failed to fetch analytics');
        }
        
        const response = await analytics.json();
        setTotalRevenue(response.total[0]?.total_revenue || 0);
        setTotalSales(response.total[0]?.total_sales || 0);
        setData(response.data || []); // Ensure data is always an array
      } catch (error) {
        console.error("Analytics error:", error);
        toast.error("Failed to load analytics data");
      } finally {
        setLoading(false);
      }
    })();
  }, [isSignedIn, navigate, user?.id]); // Added dependencies

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6">Loading analytics...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <DataCard label="Total Revenue" value={totalRevenue} shouldFormat key="1" />
          <DataCard label="Total Sales" value={totalSales} key="2" />
        </div>

        {/* Only show chart if there's data */}
        {data.length > 0 ? (
          <Chart data={data} />
        ) : (
          <Card className="p-6 text-center">
            <p>No analytics data available yet</p>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Analytics;