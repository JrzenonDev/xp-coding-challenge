"use client";

import { Card } from "antd";
import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Group A", value: 900 },
  { name: "Group B", value: 100 },
  { name: "Group C", value: 100 },
  { name: "Group D", value: 100 },
];

const COLORS = ["#855CF8", "#ACB9FF", "#3f2780", "#E289F2"];

export function DashBoard() {
  return (
    <Card
      style={{
        width: 300,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
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
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </div>
    </Card>
  );
}
