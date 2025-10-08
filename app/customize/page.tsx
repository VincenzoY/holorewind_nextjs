'use client'

import NiceModal from "@ebay/nice-modal-react";
import TextLink from "@/components/GenericComponents/Link/Link"
import PrivacyPolicyDrawer from "@/components/RewindComponents/Drawers/PrivacyPolicyDrawer/PrivacyPolicyDrawer";
import VTuberBadge from "./(components)/VTuberBadge/VTuberBadge";
import TextInput from "@/components/GenericComponents/TextInput/TextInput";

export default function Page() {


  return (
    <>
      <div className="w-full flex items-center justify-center py-16 lg:py-32">
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-8 justify-center w-[75%] lg:w-[60%]">
          <div className="flex flex-col gap-2">
            <label htmlFor="vtuber" className="text-ame-gold text-md lg:text-lg font-semibold">VTuber</label>
            <TextInput id="vtuber" className="text-sm lg:text-lg w-full"/>
          </div>
          <div className="flex gap-4 lg:gap-8">
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="org" className="text-ame-gold text-md lg:text-lg font-semibold">Organization</label>
              <TextInput id="org" className="text-sm lg:text-lg w-full"/>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="group" className="text-ame-gold text-md lg:text-lg font-semibold">Group</label>
              <TextInput id="group" className="text-sm lg:text-lg w-full"/>
            </div>
          </div>
        </div>
        
      </div>
      <div className="fixed bottom-0 left-0 bg-page-white px-2 py-1 rounded-sm text-xs md:text-sm">
        By using this site you agree to our <TextLink href="#" onClick={() => NiceModal.show(PrivacyPolicyDrawer)}>Privacy Policy</TextLink>
      </div>
    </>
  )
}
