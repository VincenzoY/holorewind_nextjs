import { useState } from "react"

interface SearchParamsType {
  vtuber: string
  org: string
  group: string
}

type SetSeachParamType = (param: keyof SearchParamsType, value: string) => void

export const useVTuberSearchParams = () => {
  const [searchParams, setSearchParams] = useState<SearchParamsType>({
    vtuber: "",
    org: "",
    group: ""
  })

  const setSearchParam: SetSeachParamType = (param, value) => {
    setSearchParams({
      ...searchParams,
      [param]: value
    })
  }


  return [searchParams, setSearchParam] as [SearchParamsType, SetSeachParamType]
}
