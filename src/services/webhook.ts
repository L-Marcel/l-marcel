import { createHmac } from "crypto";
import { buffer } from "micro";
import { NextApiRequest } from "next";

const secret = process.env.WEBHOOK_SECRET;

function getPrismicWebookIsAuth(req: NextApiRequest) {
  try {
    if(req.body.secret === secret) {
      return true;
    };
  } catch (error) {};

  return false;
};

async function getGithubWebookIsAuth(req: NextApiRequest) {
  try {
    const raw = await buffer(req);

    const expectedSignature = "sha256=" + createHmac("sha256", secret)
      .update(raw)
      .digest("hex");

    const signature = req.headers["x-hub-signature-256"];

    if (signature === expectedSignature) {
      return true;
    }
  } catch (error) {};

  return false;
};


export { 
  getPrismicWebookIsAuth, 
  getGithubWebookIsAuth 
};