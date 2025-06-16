export interface User {
  id: string
  name: string
  country: { name: string; code: string }
  company: string
  status: string
  age: number
}
