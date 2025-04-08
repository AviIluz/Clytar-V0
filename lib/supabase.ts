// Import the mock implementation instead of the real Supabase client
import { getSupabaseBrowserClient as getMockSupabaseClient, User } from "./supabase-mock"

// Define types for our database tables
export type ContentProject = {
  id: string
  user_id: string
  title: string
  type: string
  objective: string
  audience?: string
  notes?: string
  status: string
  created_at: string
}

export type ContentDraft = {
  id: string
  project_id: string
  draft_final: string
  refinement_notes: string
  optimization_notes: string
  status: string
  created_at: string
}

export type Notification = {
  id: string
  message: string
  recipient_id?: string
  timestamp: string
}

export type Feedback = {
  id: string
  user_id?: string
  message: string
  email?: string
  timestamp: string
}

export type Contact = {
  id: string
  name: string
  email: string
  message: string
  timestamp: string
}

// Re-export the User type and the getSupabaseBrowserClient function
export { User }
export const getSupabaseBrowserClient = getMockSupabaseClient
