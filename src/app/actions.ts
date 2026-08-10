"use server";

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addScholarship(formData: FormData) {
  const supabase = await createClient();
  
  const name = formData.get('name') as string;
  const provider = formData.get('provider') as string;
  const country_id = formData.get('country_id') as string | null;
  const fully_funded = formData.get('fully_funded') === 'on';
  
  // Generate a simple slug
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 6);
  
  const { error } = await supabase.from('scholarships').insert({
    name,
    provider,
    slug,
    country_id: country_id || null,
    fully_funded,
    degree_level: "Master's",
  });

  if (error) {
    console.error("Error adding scholarship:", error);
    return { error: error.message };
  }

  revalidatePath('/scholarships');
  revalidatePath('/dashboard');
  return { success: true };
}

export async function addDocument(formData: FormData) {
  const supabase = await createClient();
  
  // Requires user auth to be working
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const name = formData.get('name') as string;
  const document_type = formData.get('document_type') as string;
  
  const { error } = await supabase.from('documents').insert({
    user_id: user.id,
    name,
    document_type,
    status: 'draft',
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/documents');
  return { success: true };
}
