import { NextApiRequest, NextApiResponse } from "next";
import { getGithubWebookIsAuth } from "../../../services/webhook";

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

    await res.unstable_revalidate('/en-US/dev').catch(() => {
      console.log("[Github Webhook]: Can't revalidate /en-US/dev");
    });

    await res.unstable_revalidate('/en-US/projects').catch(() => {
      console.log("[Github Webhook]: Can't revalidate /en-US/projects");
    });

    await res.unstable_revalidate('/pt-BR/dev').catch(() => {
      console.log("[Github Webhook]: Can't revalidate /pt-BR/dev");
    });

    await res.unstable_revalidate('/pt-BR/projects').catch(() => {
      console.log("[Github Webhook]: Can't revalidate /pt-BR/projects");
    });

    return res.status(200).json({
      message: "[Github Webhook]: Revalidate request received."
    });
  } else {
    return res.status(404).json({});
  };
};

export default revalidatePagesWithGithubData;