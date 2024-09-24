"use client";

import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { makeServer } from "@/src/services/makeServer";

if (typeof window !== "undefined") {
  makeServer();
}

interface Employee {
  id: number;
  name: string;
  department: string;
}

export function DashBoard() {
  const [data, setData] = useState<
    { name: string; value: number; color: string }[]
  >([]);

  useEffect(() => {
    fetch("/api/employees")
      .then((response) => {
        console.log("Resposta do servidor:", response);
        return response.json();
      })
      .then((employees: Employee[]) => {
        console.log("Dados dos funcionários:", employees);
        const departmentCounts: { [key: string]: number } = {};

        employees.forEach((employee) => {
          const department = employee.department;
          if (departmentCounts[department]) {
            departmentCounts[department]++;
          } else {
            departmentCounts[department] = 1;
          }
        });

        const pieData = Object.keys(departmentCounts).map((dept) => ({
          name: dept,
          value: departmentCounts[dept],
          color: getRandomColor(),
        }));

        setData(pieData);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados do dashboard:", error);
      });
  }, []);

  const getRandomColor = (): string => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    value,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {value}
      </text>
    );
  };

  return (
    <Card className="w-[300px] flex justify-center items-center">
      <div className="h-full flex justify-center items-center flex-col">
        <div>
          <h2 className="text-[18px] text-gray-700">Employees by department</h2>
          <p className="text-[15px] text-gray-500">Departments</p>
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="flex w-full gap-7 flex-wrap flex-col">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-start">
              <div
                className="w-[13.5px] h-[13.5px] rounded-[50%]"
                style={{ backgroundColor: item.color }}
              />
              <p className="text-sm">
                {item.name}: {item.value}
              </p>{" "}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
