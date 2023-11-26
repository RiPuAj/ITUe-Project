import z from 'zod'

export const userSchema = z.object({
    name: z.string({
        invalid_type_error: 'Name of the local must be a string',
        required_error: 'Name of the local is required'
    }),
    address: z.string({
        invalid_type_error: 'Address of the local must be string',
        required_error: 'Address of the local is required'
    
    }).min(5),
})