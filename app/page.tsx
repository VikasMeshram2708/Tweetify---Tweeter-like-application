import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="flex">
        <Sidebar />
        <h2>Hello,World!</h2>
      </div>
    </main>
  );
}
