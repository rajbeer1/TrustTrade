import z from 'zod'
export const businessSignup = z.object({
  promoter_name: z.string(),
  business_name:z.string(),
  email:z.string().email(),
  password: z.string(),
  
})
export const businessLogin = z.object({
  email: z.string().email(),
  password: z.string(),
})