import { getServerSession as gss } from "next-auth";
import { authOptions } from "./authOptions";

export const getServerSession = () => gss(authOptions);
