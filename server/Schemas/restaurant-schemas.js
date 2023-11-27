import z from 'zod'

const restaurantSchema = z.object({
    name: z.string({
        invalid_type_error: 'Name of the local must be a string',
        required_error: 'Name of the local is required'
    }).min(3),
    address: z.string({
        invalid_type_error: 'Address of the local must be string',
        required_error: 'Address of the local is required'
    
    }).min(5),
    menu: z.object(
        z.string({
            invalid_type_error: 'Name of the local must be a string',
            required_error: 'Name of the local is required'
        }).min(3),
        z.number().positive().min(0.01)
    ),
    open: z.boolean().default(false)
})

export function validateRestaurant(object){
    return restaurantSchema.safeParse(object)
}

export function validatePartialRestaurant(object){
    return restaurantSchema.partial().safeParse(object)
}