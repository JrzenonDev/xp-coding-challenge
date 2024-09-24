"use client";

import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { makeServer } from "@/src/services/makeServer";

if (typeof window !== "undefined") {
  makeServer();
}

export function DashBoard() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((response) => {
        console.log("Resposta do servidor:", response);
        return response.json();
      })
      .then((dashboardData) => {
        console.log("Dados do dashboard:", dashboardData);
        setData(dashboardData);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados do dashboard:", error);
      });
  }, []);

  return (
    <Card className="w-[300px] flex justify-center items-center">
      <div className="h-full flex justify-center items-center flex-col">
        <div>
          <h2 className="text-[18px] text-gray-700">
            Why do you create a startup?
          </h2>
          <p className="text-[15px] text-gray-500">Trends</p>
        </div>

        <PieChart width={200} height={200}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            startAngle={330}
            endAngle={-270}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>

        <div className="flex w-full gap-7">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-start">
              <div
                className="w-[13.5px] h-[13.5px] rounded-[50%]"
                style={{ backgroundColor: item.color }}
              />
              <p className="text-sm">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
