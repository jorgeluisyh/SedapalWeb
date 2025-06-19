export interface User {
  id: number
  username: string
  profile: string
  team?: string
  type?: string
  blocked?: boolean
}
