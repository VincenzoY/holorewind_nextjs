"use client"

import LinkIcon from '@/components/Icons/LinkIcon/LinkIcon'
import { toast } from 'react-toastify'

interface ShareFilterButtonProps {
  saveFilter: () => Promise<string>
}

export default function ShareFilterButton({ saveFilter }: ShareFilterButtonProps) {
  const createFilterUrl = async () => {
    const filterId = await saveFilter()
    return getFilterUrl(filterId)
  }

  const copyFilterLink = async () => {
    const filterUrl = await createFilterUrl()
    await copyToClipboard(filterUrl)
  }

  return (
    <button
      className='
        p-2 text-ame-gold rounded-sm transition-colors bg-[#3C3C3C] hover:bg-zinc-600 disabled:bg-zinc-800 disabled:cursor-wait disabled:opacity-75
        flex items-center justify-center text-xl gap-2 fill-ame-gold
      '
      onClick={copyFilterLink}
    >
      <LinkIcon width={24} height={24}/> Share Filter
    </button>
  )
}

async function copyToClipboard(text: string) {
  await toast.promise(
    navigator.clipboard.writeText(text),
    {
      success: {
        render() {
          return "Filter link copied to clipboard!"
        }
      },
      error: {
        render({data}: {data: any}) {
          return data.message
        }
      }
    }
  )
}

function getFilterUrl(filterId: string) {
  return (
    process.env.NODE_ENV === "production" ?
    `https://${window.location.host}/customize?filter=${filterId}` :
    `http://${window.location.host}/customize?filter=${filterId}`
  )
}
