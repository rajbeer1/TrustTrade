import z from 'zod'
export const newTransaction = z.object({
  date: z.string(),
  sellerEmail: z.string(),
  amount: z.number()

})