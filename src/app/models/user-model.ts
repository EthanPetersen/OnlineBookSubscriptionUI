export interface UserModel{
  userId: number
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
  createdDate: Date | null
  updatedDate: Date|null
}
