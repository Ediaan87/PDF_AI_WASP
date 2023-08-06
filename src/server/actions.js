import HttpError from '@wasp/core/HttpError.js'
import { extractText } from './pdfUtils.js'
import { generateResponse } from "@server/gpt.js"

export const uploadPdf = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const text = extractText(args.file);

  const newPdf = await context.entities.Pdf.create({
    data: {
      content: text,
      user: { connect: { id: args.userId } }
    }
  });

  return newPdf;
}

export const askQuestion = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  const pdf = await context.entities.Pdf.findUnique({ where: { id: args.pdfId } });
  if (!pdf) { throw new HttpError(404) };
  const response = generateResponse(args.question, pdf.content);
  return response;
}