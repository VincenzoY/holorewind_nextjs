import { createRewind } from "@/lib/rewind/rewind"


export async function POST(request: Request) {
  const formData = await request.formData()
  
  const file = formData.get("watch_history") as File
  const options = JSON.parse(formData.get("options") as string)

  return Response.json(await createRewind(file, options))
}