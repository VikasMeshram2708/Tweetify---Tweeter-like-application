import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function CreateTweet() {
  return (
    <section className="bg-slate-700 p-5 rounded shadow-xl">
      <Input
        type="text"
        className="text-black text-lg"
        placeholder="What's in your mind ?"
      />
      <Button variant={"secondary"} className="mt-2">Send</Button>
    </section>
  );
}
