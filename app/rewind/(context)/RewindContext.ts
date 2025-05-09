import { RewindDataType } from '@/lib/rewind/rewindData/rewindData'
import { createContext } from 'react'

export const RewindContext = createContext<RewindDataType | undefined>(undefined)
