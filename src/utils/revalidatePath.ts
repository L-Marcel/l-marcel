import { NextApiResponse } from "next";

async function revalidatePath(res: NextApiResponse, path: string) {
  try {
    await Promise.all([res.revalidate(`/en-US/${path}`), res.revalidate(`/${path}`)]);
  } catch (err) {
    console.log(err);
  }
}

export { revalidatePath };
