import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b bg-white">
      <div className="text-xl font-bold">
        <Link href="/">Cookeasy</Link>
      </div>
    </header>
  )
}