import Link from "next/link";

export function BreadCrumbs() {
  return (
    <div className="flex w-full text-[16px] text-gray-600">
      <Link href="/">Home</Link>
      <span className="mx-1">/</span>
      <Link className="underline" href="/about">
        Reports & Insights
      </Link>
    </div>
  );
}
