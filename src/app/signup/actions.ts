'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // Validate inputs
  const email = formData.get('email') as string
  const password = formData.get('password') as string



  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })


  revalidatePath('/', 'layout')
  redirect('/confirm-email?scrollToTop=true')
}