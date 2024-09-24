"use client";

import { Card } from "antd";
import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "DUNNO", value: 900, color: "#855CF8" },
  { name: "I’m Boring", value: 150, color: "#E289F2" },
  { name: "Money", value: 150, color: "#3f2780" },
  { name: "Fun", value: 150, color: "#a98cfa" },
];

export function DashBoard() {
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
