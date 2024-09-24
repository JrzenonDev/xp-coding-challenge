"use client";

import { BreadCrumbs } from "@/src/components/BreadCrumbs";
import { DashBoard } from "@/src/components/DashBoard";
import { ListCollapseEmployeesByDepartment } from "@/src/components/ListCollapseEmployeesByDepartment";

export default function Home() {
  return (
    <main className="p-6">
      <BreadCrumbs />
      <section className="flex items-start gap-12">
        <DashBoard />
        <ListCollapseEmployeesByDepartment />
      </section>
    </main>
  );
}
