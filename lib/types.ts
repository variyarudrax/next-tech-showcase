type Geo = {
  lat: string
  lng: string
}
type Company = {
  name: string
  catchPhrase: string
  bs: string
}
type Address = {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}

export type User = {
  id: string
  name: string
  email: string
  address: Address
  phone: string
  website: string
  company: Company
}
export type Post = {
  id: string
  title: string
  body: string
}
export type ErrorResponse = {
  response?: {
    data?: {
      message?: string
    }
  }
}
export type UserFormData = {
  name?: string
  email: string
  password: string
}
