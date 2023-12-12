import z from 'zod'

const restaurantSchema = z.object({
    id: z.number({
        invalid_type_error: 'ID of the local must be a string',
    }).positive(),

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
    rating: z.number().positive().min(0.1).max(5.0)
})

export function validateRestaurant(object){
    return restaurantSchema.safeParse(object)
}

export function validatePartialRestaurant(object){
    return restaurantSchema.partial().safeParse(object)
}

