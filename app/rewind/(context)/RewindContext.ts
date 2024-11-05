import { RewindDataType } from '@/lib/rewind/rewind'
import { createContext } from 'react'

export const RewindContext = createContext<RewindDataType | undefined>(undefined)
