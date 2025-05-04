export interface CreateUserDto {
    username: string
    email: string
    password: string
}

export interface UpdateUserDto {
    username?: string
    email?: string
}

export interface User {
    id: number
    username: string
    email: string
    password: string
}

export interface UserResponse {
    message: string
    data: User | User[]
}
