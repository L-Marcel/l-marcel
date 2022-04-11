import { NextApiRequest, NextApiResponse } from "next";
import { getPrismicWebookIsAuth } from "../../../services/webhook";

async function revalidatePagesWithPrismicData(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === "POST") {
    const isAuth = getPrismicWebookIsAuth(req);

    if(!isAuth) {
      return res.status(401).json({
        message: "[Prismic Webhook]: Unauthorized request."
      });
    };

    await res.unstable_revalidate('/achievements').catch(() => {
      console.log("[Prismic Webhook]: Can't revalidate /achievements");
    });

    return res.status(200).json({
      message: "[Prismic Webhook]: Revalidate request received."
    });
  } else {
    return res.status(404).json({});
  };
};

export default revalidatePagesWithPrismicData;