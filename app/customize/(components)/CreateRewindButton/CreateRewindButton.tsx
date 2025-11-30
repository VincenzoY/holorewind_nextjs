"use client"

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ButtonBlock from '@/components/ButtonBlock/ButtonBlock'

interface CreateRewindButtonProps {
  saveFilter: () => Promise<string>
}

export default function CreateRewindButton({ saveFilter }: CreateRewindButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    try {
      const filterId = await saveFilter()
      router.push(`/create-rewind?filter=${filterId}`)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ButtonBlock
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? 'Saving Filter...' : 'Continue'}
    </ButtonBlock>
  )
}
