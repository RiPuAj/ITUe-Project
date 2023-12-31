import z from 'zod'

const phoneRegExp = /^\d{3}-\d{3}-\d{4}$/;

export const userSchema = z.object({
    id: z.number().positive(),
    
    first_name: z.string({
        invalid_type_error: 'Name of the local must be a string',
        required_error: 'Name of the local is required'
    }),

    last_name: z.string({
        invalid_type_error: 'Name of the local must be a string',
        required_error: 'Name of the local is required'
    }),

    email: z.string().email(),

    phone: z.string().regex(phoneRegExp, "Invalid phone number"),

    address: z.string({
        invalid_type_error: 'Address of the local must be string',
        required_error: 'Address of the local is required'
    
    }).min(5),
})

export function validateUser(object){
    return userSchema.safeParse(object)
}

export function validatePartialUser(object){
    return userSchema.partial().safeParse(object)
}