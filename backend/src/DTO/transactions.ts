import z from 'zod'
export const newTransaction = z.object({
  date: z.string(),
  id: z.string(),
  amount: z.number(),
  invoice : z.string(),

})