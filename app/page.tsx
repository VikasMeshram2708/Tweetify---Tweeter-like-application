import CreateTweet from "@/components/CreateTweet";
import RecentTweets from "@/components/RecentTweets";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <div className="container mt-10">
            {/* Create Tweet Component */}
            <CreateTweet />
            <div className="mt-5">
              <RecentTweets />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
