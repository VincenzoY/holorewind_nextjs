'use client'

import TextInput from "@/components/GenericComponents/TextInput/TextInput"
import { useVTuberSearchParams } from "../../(hooks)/useVTuberSearchParams"

type SearchFieldsProps = {
  searchParams: ReturnType<typeof useVTuberSearchParams>[0]
  setSearchParams: ReturnType<typeof useVTuberSearchParams>[1]
}

export default function SearchFields({ searchParams, setSearchParams }: SearchFieldsProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-2 lg:gap-8 justify-center w-full">
      <div className="flex flex-col gap-2">
        <label htmlFor="vtuber" className="text-ame-gold text-md lg:text-lg font-semibold">VTuber</label>
        <TextInput
          id="vtuber"
          className="text-sm lg:text-lg w-full"
          value={searchParams.vtuber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchParams("vtuber", e.target.value)}
        />
      </div>
      <div className="flex gap-4 lg:gap-8">
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="org" className="text-ame-gold text-md lg:text-lg font-semibold">Organization</label>
          <TextInput
            id="org"
            className="text-sm lg:text-lg w-full"
            value={searchParams.org}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchParams("org", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="group" className="text-ame-gold text-md lg:text-lg font-semibold">Group</label>
          <TextInput
            id="group"
            className="text-sm lg:text-lg w-full"
            value={searchParams.group}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchParams("group", e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
