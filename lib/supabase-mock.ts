// This is a mock implementation of Supabase client for the v0 environment
// It simulates the basic functionality without actually importing @supabase/supabase-js

export type User = {
  id: string
  email: string
  user_metadata?: {
    full_name?: string
  }
}

export type Session = {
  user: User
}

// Mock data
const MOCK_USERS = [
  {
    id: "1",
    email: "aviiluz1000@gmail.com",
    user_metadata: { full_name: "Admin User" },
    is_admin: true,
  },
  {
    id: "2",
    email: "user@example.com",
    user_metadata: { full_name: "Regular User" },
    is_admin: false,
  },
]

const MOCK_CONTENT = [
  {
    id: "1",
    user_id: "1",
    title: "Sample Blog Post",
    content_type: "blog",
    topic: "AI Content Creation",
    status: "completed",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    user_id: "1",
    title: "Social Media Campaign",
    content_type: "social",
    topic: "Product Launch",
    status: "in-progress",
    created_at: new Date().toISOString(),
  },
]

const MOCK_BRAND_PROFILES = [
  {
    id: "1",
    user_id: "1",
    name: "Tech Brand",
    description: "A modern tech company",
    brand_keywords: ["technology", "innovation", "future"],
    brand_tone: "Professional",
  },
]

interface AuthResponse {
  data: {
    user: User | null
    session: Session | null
  }
  error: { message: string } | null
}

interface CountResponse {
  count: number
  error: null | { message: string }
}

interface DataResponse<T> {
  data: T[] | null
  error: null | { message: string }
  count?: number
}

interface SingleResponse<T> {
  data: T | null
  error: null | { message: string }
}

class MockSupabaseClient {
  private currentUser: User | null = null
  private currentSession: Session | null = null

  auth = {
    getSession: async (): Promise<{ data: { session: Session | null }; error: null | { message: string } }> => {
      return {
        data: { session: this.currentSession },
        error: null,
      }
    },
    signInWithPassword: async ({ email, password }: { email: string; password: string }): Promise<AuthResponse> => {
      const user = MOCK_USERS.find((u) => u.email === email)
      if (user && password === "password") {
        // Simple mock password check
        this.currentUser = user
        this.currentSession = { user }
        return { data: { user, session: { user } }, error: null }
      }
      return { data: { user: null, session: null }, error: { message: "Invalid login credentials" } }
    },
    signUp: async ({
      email,
      password,
      options,
    }: { email: string; password: string; options?: any }): Promise<AuthResponse> => {
      const newUser = {
        id: `user-${Date.now()}`,
        email,
        user_metadata: options?.data || {},
      }
      this.currentUser = newUser
      this.currentSession = { user: newUser }
      return { data: { user: newUser, session: { user: newUser } }, error: null }
    },
    signOut: async (): Promise<{ error: null | { message: string } }> => {
      this.currentUser = null
      this.currentSession = null
      return { error: null }
    },
    onAuthStateChange: (callback: (event: string, session: Session | null) => void) => {
      // Mock subscription
      return {
        data: { subscription: { unsubscribe: () => {} } },
      }
    },
  }

  from = (table: string) => {
    let data: any[] = []

    if (table === "users_profiles") {
      data = MOCK_USERS
    } else if (table === "content") {
      data = MOCK_CONTENT
    } else if (table === "brand_profiles") {
      data = MOCK_BRAND_PROFILES
    }

    let filteredData = [...data]

    return {
      select: (columns = "*", options?: { count?: string; head?: boolean }) => {
        if (options?.count === "exact" && options?.head) {
          return { count: filteredData.length, error: null } as CountResponse
        }

        return {
          eq: (column: string, value: any) => {
            filteredData = filteredData.filter((item) => item[column] === value)
            return {
              eq: (column: string, value: any) => {
                filteredData = filteredData.filter((item) => item[column] === value)
                return { data: filteredData, error: null, count: filteredData.length } as DataResponse<any>
              },
              order: (column: string, { ascending }: { ascending: boolean }) => {
                filteredData.sort((a, b) => {
                  if (ascending) {
                    return a[column] > b[column] ? 1 : -1
                  } else {
                    return a[column] < b[column] ? 1 : -1
                  }
                })
                return {
                  limit: (limit: number) => {
                    return { data: filteredData.slice(0, limit), error: null } as DataResponse<any>
                  },
                  data: filteredData,
                  error: null,
                } as DataResponse<any>
              },
              single: () => {
                return { data: filteredData[0] || null, error: null } as SingleResponse<any>
              },
              data: filteredData,
              error: null,
              count: filteredData.length,
            }
          },
          order: (column: string, { ascending }: { ascending: boolean }) => {
            filteredData.sort((a, b) => {
              if (ascending) {
                return a[column] > b[column] ? 1 : -1
              } else {
                return a[column] < b[column] ? 1 : -1
              }
            })
            return {
              limit: (limit: number) => {
                return { data: filteredData.slice(0, limit), error: null } as DataResponse<any>
              },
              data: filteredData,
              error: null,
            } as DataResponse<any>
          },
          data: filteredData,
          error: null,
        }
      },
      insert: (data: any) => {
        const newItem = {
          id: `item-${Date.now()}`,
          created_at: new Date().toISOString(),
          ...data,
        }

        if (table === "users_profiles") {
          MOCK_USERS.push(newItem)
        } else if (table === "content") {
          MOCK_CONTENT.push(newItem)
        } else if (table === "brand_profiles") {
          MOCK_BRAND_PROFILES.push(newItem)
        }

        return {
          select: () => ({ data: [newItem], error: null }) as DataResponse<any>,
        }
      },
    }
  }
}

// Create a singleton instance
let browserClient: MockSupabaseClient | null = null

export const getSupabaseBrowserClient = () => {
  if (!browserClient) {
    browserClient = new MockSupabaseClient()
  }
  return browserClient
}
