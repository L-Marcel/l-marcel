import { createHmac } from "crypto";
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

function getGithubWebookIsAuth(req: NextApiRequest) {
  try {
    const expectedSignature = "sha1=" +
        createHmac("sha1", secret)
            .update(JSON.stringify(req.body))
            .digest("hex");

    const signature = req.headers["x-hub-signature"];

    console.log(signature !== expectedSignature);
    console.log(signature.length, expectedSignature.length);

    if (signature !== expectedSignature) {
        throw new Error("Invalid signature.");
    }
  } catch (error) {};

  return true;
};


export { 
  getPrismicWebookIsAuth, 
  getGithubWebookIsAuth 
};