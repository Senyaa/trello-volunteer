import getCurrentUserId from "./getCurrentUserId";

const getCurrentShiftIdOrThrow = async () => {
    const userId = await getCurrentUserId()

    if(!userId) {
        throw new Error("Current user not found");
    }

    return userId;
}

export default getCurrentShiftIdOrThrow;