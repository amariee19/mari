'use client'; // Required for hooks in the App Router

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react'; // Or your icon library

export default function BackButton() {
  const router = useRouter();

  return (
    <div className="bg-[#590d22] border-b w-full p-5 pl-[5vw] border-b-[#f7dae7] flex gap-3">
      <button 
        onClick={() => router.back()} 
        className="text-[#fff3e7] flex gap-2 items-center cursor-pointer bg-transparent border-none p-0"
        aria-label="Go back"
      >
        <ArrowLeft className="text-[#fff3e7]" />
        <p className="text-[#fff3e7]">back</p>
      </button>
    </div>
  );
}
