import React, { useEffect, useState } from 'react';
import DashboardLayout from "@/Layout/layout";

import { DataTable } from '@/_components/coursepage_components/data-table';
import { columns } from '@/_components/coursepage_components/columns';




const CoursesPage: React.FC = () => {
  const [data, setData] = useState<any[]>([]);



  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/courses`);
      const courses = await result.json();
      setData(courses);
    
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
