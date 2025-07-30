export const dynamic = "force-dynamic"; 
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../Componentes/Navbar/Navbar";



export default async function AlbumDetailPage({ params }) {
  const { slug } = await  params;
  
  const res = await fetch(`https://skgpsd.com/skgpsdbe/public/api/web/category/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <div className="p-10 text-center text-xl text-red-500">Failed to fetch album data</div>;
  }

  const json = await res.json();
  const albums = json?.data?.albums;

  if (!albums || albums.length === 0) {
    return <>  <Navbar/> 
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Top section with title */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold uppercase">{slug}</h1>
        </div>
       <div className="p-10 text-center text-xl">Album not found</div> 
      </div>
     </>;
  }
  const phoneNumber = "919990144668"; // replace with your number (include country code, no + sign)
  const messageText = "Hi, I want to book a service via your website.";
  
  const whatsappMessage = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageText)}`;
  

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Top section with title */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold uppercase">{slug}</h1>
        </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {albums.map((album) => (
            <div
              key={album.url_key}
              className="max-w-sm rounded overflow-hidden shadow-lg bg-white"
            >
              <Image
                src={`https://skgpsd.com/skgpsdbe/public/${album.image}`}
                alt={album.name}
                width={800}
                height={500}
                className="w-full object-cover"
              />
              <div className="px-6 py-4">
                <h2 className="text-xl font-semibold mb-2">{album.name}</h2>
                <p className="text-gray-700 text-base pb-4">{album.meta_description}</p>
                <div className="flex justify-between gap-2">
                <Link
                  href={`/ditails/${album.url_key}`}
                  className="bg-black text-white text-sm px-4 py-2 rounded hover:bg-gray-800 inline-block"
                >
                  View All
                </Link>
            <a
              href={whatsappMessage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm border border-black text-black py-1.5 px-3 rounded hover:bg-gray-100 transition"
            >
              Book Now
            </a>
            </div>
                
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-4 text-center text-sm flex flex-row justify-around">
        <p>
          <span className="text-gray-300">Copyright © 2022</span>{" "}
          <span className="font-semibold text-yellow-400">SKG PSD.</span>{" "}
          <span className="font-bold">All Right Reserved.</span>
        </p>
        <p>
            <Link href="/privacyPolicyPage"
            >   PrivacyPolicyPage</Link>
     
        </p>
      </footer>
    </>
  );
}
