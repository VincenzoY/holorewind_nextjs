'use server'

import PocketBase from 'pocketbase';

const SUPERUSER_EMAIL = process.env.POCKETBASE_SUPERUSER_EMAIL || ""
const SUPERUSER_PASS = process.env.POCKETBASE_SUPERUSER_PASS || ""

export const loginAsAdmin = (pb: PocketBase) => {
  pb.collection('_superusers').authWithPassword(
    SUPERUSER_EMAIL, 
    SUPERUSER_PASS, 
    {
      autoRefreshThreshold: 30 * 60
    }
  )
}
