import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <main className="flex  text-2xl text-lime-500 align-items-center h-screen">
      <p>This is the Landing page!</p>

      <Button className="bg-lime-500 text-white hover:bg-lime-600">
        Click Me
      </Button>
    </main>
  );
}
