'use client'

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  const handleClick = () => {
    router.push('/login');
  }

  return (
    <div 
      /* Fondo imagen */
      className="flex h-screen bg-cover bg-center" 
      style={{ backgroundImage: "url('/assets/img/fondoHomepages.jpg')" }} 
    >
      {/* Cuadro negro transparente con texto a la izquierda */}
      <div className="flex flex-col justify-center w-1/2 bg-black bg-opacity-80 p-20 text-white">
        <h1 className="text-5xl font-bold mb-4">Bienvenido a Green Genesis</h1>
        <p className="text-lg mb-4">
          Aprende todo lo que necesitas para cultivar tus plantas de forma eficiente y sostenible.
        </p>
        <Button onClick={handleClick} className="mt-10 px-4 py-2 shad-primary-btn w-[300px] text-white rounded-lg">
          Inicia sesión
        </Button>
      </div>

      {/* Mosaico de imágenes a la derecha */}
      <div className="flex w-1/2 h-full items-center justify-center bg-black bg-opacity-30">
        <div className="grid grid-cols-2 grid-rows-2 gap-4 h-3/4">
          {/* Imagen vertical a la izquierda (col-span-1, row-span-2) */}
          <Image 
            src="/assets/img/mosaico1.jpg"
            alt="Mosaico 1"
            width={300}
            height={300}
            className="col-span-1 row-span-2 rounded-lg object-cover transition-transform duration-300 transform hover:scale-105"
          />

          <Image 
            src="/assets/img/mosaico2.jpg"
            alt="Mosaico 1"
            width={300}
            height={300}
            className="col-span-1 row-span-2 rounded-lg object-cover transition-transform duration-300 transform hover:scale-105"
          />
          
          <Image 
            src="/assets/img/mosaico3.jpg" 
            alt="Mosaico 2"
            width={300}
            height={300}
            className="rounded-lg object-cover transition-transform duration-300 transform hover:scale-105"
          />

          <Image 
            src="/assets/img/mosaico4.jpg" 
            alt="Mosaico 3"
            width={300}
            height={300}
            className="rounded-lg object-cover transition-transform duration-300 transform hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}
