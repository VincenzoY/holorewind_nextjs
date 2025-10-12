"use client"

import Button from "@/components/GenericComponents/Button/Button";
import MainLogo from "@/components/Icons/MainLogo/MainLogo";
import { PrivacyPolicyFooter } from "@/components/RewindComponents/Drawers/PrivacyPolicyDrawer/PrivacyPolicyDrawer";
import { getCurrentRewindYear } from "@/lib/utils/utils";
import Link from "next/link";

export default function Page() {
  return (
    <div className="w-full flex items-center justify-center h-dvh relative">
      <div className="flex flex-col items-center w-full gap-4">
        <div className="flex">
          <MainLogo />
          <h6 className="text-page-white text-md md:text-2xl font-bold">({getCurrentRewindYear()})</h6>
        </div>
        <Link href="/create-rewind">
          <Button>Create Your Rewind</Button>
        </Link>
      </div>
      <PrivacyPolicyFooter />
    </div>
  )
}
