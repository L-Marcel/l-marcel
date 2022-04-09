import { createClient } from "@prismicio/client";
import { getFormattedDate } from "../utils/getFormattedDate";

function getPrismicClient() {
  const prismic = createClient(
    process.env.PRISMIC_ENDPOINT,
    {
      accessToken: process.env.PRISMIC_ACCESS_TOKEN
    }
  );

  return prismic;
};

async function getCertificatesData(): Promise<Certificate[]> {
  const prismic = getPrismicClient();
  return await prismic.getSingle("certificates", {}).then(res => {
    return res.data.list.map(certificate => {
      return {
        name: certificate.name,
        issuingOrganization: certificate.issuing_organization,
        issuedIn: getFormattedDate(certificate.issued_in),
        expiresIn: certificate.expires_in? getFormattedDate(certificate.expires_in):null,
        code: certificate.code,
        url: certificate.url
      } as Certificate;
    });
  }).catch(() => []);
}

export { 
  getPrismicClient, 
  getCertificatesData
};