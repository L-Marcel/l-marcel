import { verifyWebhookSignature } from "@graphcms/utils";
import { NextApiRequest, NextApiResponse } from "next";
import { revalidatePath } from "../../../utils/revalidatePath";

async function revalidatePagesWithHygraphData(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  const isValid = verifyWebhookSignature({
    body: {},
    signature: String(req.headers["gcms-signature"]),
    secret: process.env.HYGRAPH_WEBHOOK_SECRET as string
  });

  if(isValid) {
    await revalidatePath(res, "achievements");

    return res.status(200).json({
      message: "[Hygraph Webhook]: Revalidate request received."
    });
  }

  return res.status(401).json({
    message: "[Hygraph Webhook]: Unauthorized request."
  });
}

export default revalidatePagesWithHygraphData;