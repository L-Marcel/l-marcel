import { NextApiResponse } from "next";

async function revalidatePath(res: NextApiResponse, path: string) {
  await Promise.all([
    res.unstable_revalidate(`/en-US/${path}`),
    res.unstable_revalidate(`/pt-BR/${path}`)
  ]);
};

export { revalidatePath };