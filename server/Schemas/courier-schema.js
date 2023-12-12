import z from 'zod'

const phoneRegExp = /^\d{3}-\d{3}-\d{4}$/;

export const courierSchema = z.object({
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
})

export function validateCourier(object){
    return courierSchema.safeParse(object)
}

export function validatePartialCourier(object){
    return courierSchema.partial().safeParse(object)
}