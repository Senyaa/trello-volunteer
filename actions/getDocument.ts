import prisma from "@/lib/prisma";

const getDocument = async (documentName: string) => {
    const document = await prisma.document.findFirst({
        where: {
name: documentName
        },
        orderBy: {createdAt: 'desc'},
        select: {content: true}
      });

      return document?.content || '';
}

export default getDocument;