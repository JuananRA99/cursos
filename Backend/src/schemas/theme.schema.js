import {z} from "zod";


export const createThemeSchema= z.object({
    title: z.string({
        required_error: 'title is required'
    }),
    description: z.string({
        required_error: 'description must be a string'
    }).optional(),
    date: z.string().datetime().optional(),
   
});