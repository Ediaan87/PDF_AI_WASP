import HttpError from '@wasp/core/HttpError.js'

export const getUserPdfs = async ({ userId }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const user = await context.entities.User.findUnique({
    where: { id: userId },
    include: { pdfs: true }
  })

  if (!user) { throw new HttpError(404, `User not found with id ${userId}`) }

  return user.pdfs;
}

export const getPdf = async ({ id }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const pdf = await context.entities.Pdf.findUnique({
    where: { id },
    include: { user: true }
  })

  if (!pdf) { throw new HttpError(404) }

  if (pdf.userId !== context.user.id) { throw new HttpError(400) }

  return pdf
}