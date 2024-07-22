

import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({ required_error: 'Username is required' }),
  email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email' }),
  password: z.string({ required_error: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters long' }),
  confirmPassword: z.string({ required_error: 'Confirm Password is required' })
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // Path of error
});


export const loginSchema= z.object({

    email: z.string({required_error: 'email is required'}).email({message: 'Email no es válido'}),
    password: z.string({required_error: 'Password is required'})
    .min(8,{
        message: 'Password debe ser de al menos 8 caracteres'
    
    })
    });



