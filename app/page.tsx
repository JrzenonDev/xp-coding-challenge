import { BreadCrumbs } from "@/src/components/BreadCrumbs";
import { DashBoard } from "@/src/components/DashBoard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6">
      <BreadCrumbs />
      <DashBoard />
    </main>
  );
}
