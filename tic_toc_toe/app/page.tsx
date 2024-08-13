import Image from "next/image";
import TicTocToe from "./components/tic_toc_toe/tic_toc_toe";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TicTocToe></TicTocToe>
    </main>
  );
}
