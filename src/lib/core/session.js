'use server'
import { headers } from "next/headers";
import { auth } from "../auth";

export const getUserSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers() // some endpoints might require headers
    })
    return session?.user || null;
}



// export const getSession = async () => {
//     const { data: session, isPending } = authClient.useSession();
//     const user = session?.user;
//     return user || null;
// }
