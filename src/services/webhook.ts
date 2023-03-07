import { createHmac } from "crypto";

const secret = process.env.WEBHOOK_SECRET;

async function getGithubWebookIsAuth(rawBody: string, signature?: string | string[]) {
  try {
    const expectedSignature =
      "sha256=" +
      createHmac("sha256", secret as string)
        .update(rawBody)
        .digest("hex");

    if (signature === expectedSignature) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }

  return false;
}

export { getGithubWebookIsAuth };
