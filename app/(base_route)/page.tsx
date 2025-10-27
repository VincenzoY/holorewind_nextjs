"use client"

import Button from "@/components/GenericComponents/Button/Button";
import MainLogo from "@/components/Icons/MainLogo/MainLogo";
import { PrivacyPolicyFooter } from "@/components/RewindComponents/Drawers/PrivacyPolicyDrawer/PrivacyPolicyDrawer";
import { getCurrentRewindYear } from "@/lib/utils/utils";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <div className="w-full flex items-center justify-center h-dvh relative">
      <div className="flex flex-col items-center w-full gap-4">
        <div className="flex text-gray-900">
          <MainLogo />
        </div>
        <Link href="/create-rewind">
          <Button>Create Your {getCurrentRewindYear()} Rewind</Button>
        </Link>
      </div>
      <PrivacyPolicyFooter />
      <BackgroundImage />
    </div>
  )
}

const BackgroundImage = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-black">
      <Image 
        src="/2025/main_background/sand.png"
        alt="Sand Background"
        fill
        className="object-cover opacity-60 -z-20"
        priority
      />
      <Image 
        src="/2025/main_background/stopwatch.png"
        alt="Amelia Watson's Stopwatch"
        fill
        className="object-cover"
        priority
      />
    </div>
  )
}
