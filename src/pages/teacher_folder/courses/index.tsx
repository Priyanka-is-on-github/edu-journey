import React, { useEffect, useState } from 'react';
import DashboardLayout from "@/Layout/layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DataTable } from '@/_components/coursepage_components/data-table';
import { columns } from '@/_components/coursepage_components/columns';




const CoursesPage: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('http://localhost:3001/api/v1/courses');
      const courses = await result.json();
      setData(courses);
      setLoading(false);
    };

    fetchData();
  }, []);

  

  return (
    <DashboardLayout>
      <div className="p-6">
        <DataTable columns={columns} data={data} />
      </div>

      
    </DashboardLayout>
  );
};

export default CoursesPage;
