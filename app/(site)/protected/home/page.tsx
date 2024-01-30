"use client"
import Link from "next/link";
import Image from "next/image";
import { MAIN_PAGE } from "@/app/helpers/consts";

export default function Home() {

    return (
      <main className="flex min-h-screen flex-col items-center w-full">
        <Link
          href={MAIN_PAGE}
          className="block w-full relative h-[40vh]"
        >
          <Image
            alt="cats"
            src="https://images.unsplash.com/photo-1568043210943-0e8aac4b9734?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            fill
            className="brightness-75 md:hover:brightness-50 object-cover"
          />
          <span className="absolute bottom-1 text-bold text-5xl md:text-7xl">
            koty
          </span>
        </Link>
        
      </main>
    );
}
