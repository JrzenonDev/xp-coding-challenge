"use client";

import React, { useEffect, useState } from "react";
import { Collapse } from "antd";
import { makeServer } from "@/src/services/makeServer";

if (typeof window !== "undefined") {
  makeServer();
}

interface Employee {
  avatar: string;
  employee: string;
  mail: string;
  lastLogin: string;
  department: string;
  isActive: boolean;
  label: JSX.Element;
}

export function ListCollapseEmployeesByDepartment() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [employeeFilter, setEmployeeFilter] = useState("");
  const [lastLoginFilter, setLastLoginFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetch("/api/employees")
      .then((response) => response.json())
      .then((data) => {
        const items = data.map((employeeData: Employee, index: number) => ({
          key: index.toString(),
          label: (
            <div className="grid grid-cols-4 gap-4">
              <span>{employeeData.employee}</span>
              <span>
                {new Date(employeeData.lastLogin).toLocaleDateString()}
              </span>
              <span>{employeeData.department}</span>
              <span>{employeeData.isActive ? "Active" : "Inactive"}</span>
            </div>
          ),
          children: (
            <div className="flex flex-col space-y-1">
              <p>Email: {employeeData.mail}</p>
              <p>
                Last Login: {new Date(employeeData.lastLogin).toLocaleString()}
              </p>
              <p>Department: {employeeData.department}</p>
              <p>Status: {employeeData.isActive ? "Active" : "Inactive"}</p>
            </div>
          ),
        }));

        setEmployees(items);
        setFilteredItems(items);
      });
  }, []);

  useEffect(() => {
    const filtered = employees.filter((item) => {
      const employeeName = item.label.props.children[0].props.children;
      const lastLoginDate = item.label.props.children[1].props.children;

      const employeeMatch = employeeName
        .toLowerCase()
        .includes(employeeFilter.toLowerCase());
      const lastLoginMatch = lastLoginFilter
        ? new Date(lastLoginDate).toLocaleDateString() ===
          new Date(lastLoginFilter).toLocaleDateString()
        : true;
      const departmentMatch = departmentFilter
        ? item.label.props.children[2].props.children === departmentFilter
        : true;
      const statusMatch = statusFilter
        ? item.label.props.children[3].props.children === statusFilter
        : true;

      return employeeMatch && lastLoginMatch && departmentMatch && statusMatch;
    });

    setFilteredItems(filtered);
  }, [
    employeeFilter,
    lastLoginFilter,
    departmentFilter,
    statusFilter,
    employees,
  ]);

  const clearFilters = () => {
    setEmployeeFilter("");
    setLastLoginFilter("");
    setDepartmentFilter("");
    setStatusFilter("");
  };

  return (
    <div className="bg-white p-8 rounded-lg border border-gray-200">
      <div className="mb-4">
        <p className="mb-4 text-lg font-semibold">Filter</p>
        <div className="flex space-x-2 mb-2">
          <input
            type="text"
            placeholder="Employee"
            value={employeeFilter}
            onChange={(e) => setEmployeeFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-1 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={lastLoginFilter}
            onChange={(e) => setLastLoginFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-1 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-1 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Departments</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Research and Development">
              Research and Development
            </option>
            <option value="Finance">Finance</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-1 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button
            onClick={clearFilters}
            className="bg-[#1e1add] text-white rounded-lg px-1 py-1 hover:bg-blue-600 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 font-bold mb-2 bg-transparent border-x border-t border-b border-gray-300 rounded-t-lg px-4 pt-8 pb-5 mb-0">
        <span>Employee</span>
        <span>Last Login</span>
        <span>Department</span>
        <span>Status</span>
      </div>
      <Collapse
        items={filteredItems}
        className="border-t-transparent rounded-t-lg rounded-l-none rounded-r-none bg-transparent"
      />
    </div>
  );
}
