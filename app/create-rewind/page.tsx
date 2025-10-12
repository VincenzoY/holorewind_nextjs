import CreateRewind from "./(components)/CreateRewind"

type PageProps = {
  searchParams: Promise<{ filter?: string }>
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams
  const filterId = params.filter || null

  return <CreateRewind filterId={filterId} />
}
