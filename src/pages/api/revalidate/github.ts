import { NextApiRequest, NextApiResponse } from "next";
import { getGithubWebookIsAuth } from "../../../services/webhook";
import { revalidatePath } from "../../../utils/revalidatePath";

export const config = {
  api: {
    bodyParser: false,
  },
}

async function revalidatePagesWithGithubData(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === "POST") {
    const isAuth = await getGithubWebookIsAuth(req);

    if(!isAuth) {
      return res.status(401).json({
        message: "[Github Webhook]: Unauthorized request."
      });
    };

    await revalidatePath(res, "dev");
    await revalidatePath(res, "projects");

    return res.status(200).json({
      message: "[Github Webhook]: Revalidate request received."
    });
  } else {
    return res.status(404).json({});
  };
};

export default revalidatePagesWithGithubData;