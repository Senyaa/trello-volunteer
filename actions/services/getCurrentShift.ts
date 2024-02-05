import prisma from "@/lib/prisma";

const getCurrentShift = async (shiftType = "cats", userId: string) => {
    const currentShift = await prisma.shift.findFirst({
        where: {
          AND: [{ finished: null }, { shiftType }, { users: { some: { userId } } }],
        },
        select: {id: true}
      });

      return currentShift;
}

export default getCurrentShift;