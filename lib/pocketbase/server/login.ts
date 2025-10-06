'import server-only'

import pb from "../pocketbase"

const SUPERUSER_EMAIL = process.env.POCKETBASE_SUPERUSER_EMAIL || ""
const SUPERUSER_PASS = process.env.POCKETBASE_SUPERUSER_PASS || ""

const loginAsAdmin = () => {
  pb.basePocketBase.collection('_superusers').authWithPassword(
    SUPERUSER_EMAIL, 
    SUPERUSER_PASS
  )
}

export const withLoggedInSession = async <T>(fn: () => Promise<T>) => {
  loginAsAdmin()
  const result = await fn()
  pb.basePocketBase.authStore.clear()

  return result
}
