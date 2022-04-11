import { NextApiRequest, NextApiResponse } from "next";
import { getGithubWebookIsAuth } from "../../../services/webhook";

export const config = {
  api: {
    bodyParser: false,
  },
}

async function revalidatePagesWithGithubData(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  if(req.method === "POST") {
    const isAuth = getGithubWebookIsAuth(req);

    if(!isAuth) {
      return res.status(401).json({
        message: "[Github Webhook]: Unauthorized request."
      });
    };

    await res.unstable_revalidate('/dev').catch(() => {
      console.log("[Github Webhook]: Can't revalidate /dev");
    });

    await res.unstable_revalidate('/projects').catch(() => {
      console.log("[Github Webhook]: Can't revalidate /projects");
    });

    return res.status(200).json({
      message: "[Github Webhook]: Revalidate request received."
    });
  } else {
    return res.status(404).json({});
  };
};

export default revalidatePagesWithGithubData;