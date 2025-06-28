import Link from "next/link";

export const metadata = {
  title: "FabricFinds",
  description: "The ultimate fabric shop",
};

export default function HomePage() {
  return (
    <main className="p-6">
      <section
        className="h-[70vh] bg-cover bg-center text-black flex flex-col items-center justify-center"
        style={{ backgroundImage: "url('pics.jpg')" }}
      >
        <h1 className="text-5xl font-bold backdrop-blur-md px-4 py-2">  
          Fabric Find,
        </h1>
        <h2 className="text-3xl font-bold backdrop-blur-md px-4 py-2"> 
          where style meets
        </h2>

        <div className="text-lg mt-4 backdrop-blur-sm px-4 py-2">
          <p> Unique. Affordable. Sustainable.</p>
          <p> Every piece is handpicked with love.</p> 
          <p> Shopping here means saving the planet (and your wallet).</p>
        </div>

        <Link
          href="/clothes"
          className="mt-6 px-8 py-3 bg-white text-black rounded-full shadow hover:bg-gray-200 transition"
        >
          Start Browsing
        </Link>
      </section>
    </main>
  );
}
