import { createClient } from "@prismicio/client";
import { getFormattedDate } from "../utils/getFormattedDate";
import { RichText } from "prismic-reactjs";

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
  return await prismic.getAllByType("certificate", {}).then(res => {
    return res.map(({
      id,
      data
    }) => {
      const {
        name,
        issuing_organization,
        issued_in,
        expires_in,
        description,
        code,
        icon,
        url
      } = data;

      return {
        id,
        name: name,
        icon,
        description: RichText.asText(description),
        issuingOrganization: issuing_organization,
        issuedIn: getFormattedDate(issued_in),
        expiresIn: expires_in? getFormattedDate(expires_in):null,
        code: code,
        url: url
      } as Certificate;
    });
  }).catch(() => []);
}

async function getAchievementsData(): Promise<Achievement[]> {
  const prismic = getPrismicClient();
  return await prismic.getAllByType("achievements", {}).then(res => {
    return res.map(({
      id,
      data
    }) => {
      const {
        name,
        issuing_organization,
        issued_in,
        expires_in,
        description,
        code,
        icon,
        url
      } = data;

      return {
        id,
        name: name,
        icon,
        description: RichText.asText(description),
        issuingOrganization: issuing_organization,
        issuedIn: getFormattedDate(issued_in),
        expiresIn: expires_in? getFormattedDate(expires_in):null,
        code: code,
        url: url
      } as Achievement;
    });
  }).catch(() => []);
}

export { 
  getPrismicClient, 
  getCertificatesData,
  getAchievementsData
};