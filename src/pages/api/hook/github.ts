import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import { getGithubWebookIsAuth } from "../../../services/webhook";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function revalidatePagesWithGithubData(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const rawBody = buf.toString();
    const body = JSON.parse(rawBody);

    const signature = req.headers["x-hub-signature-256"];
    const isAuth = await getGithubWebookIsAuth(rawBody, signature);

    if (!isAuth) {
      return res.status(401).json({
        message: "[Github Webhook]: Unauthorized request.",
      });
    }

    if (req.headers["x-github-event"] === "push") {
      const repositoryName = body?.repository?.name?.toLowerCase();

      // await Promise.all([
      //   revalidatePath(res, "projects"),
      //   revalidatePath(res, `projects/${repositoryName}`)
      // ]);

      return res.status(202).json({
        message: "[Github Webhook]: Revalidate request received, but skipped.",
        updatedRepository: repositoryName,
      });
    }

    return res.status(202).json({
      message: "[Github Webhook]: Revalidate request received, but skipped.",
    });
  } else {
    return res.status(404).json({});
  }
}

export default revalidatePagesWithGithubData;
