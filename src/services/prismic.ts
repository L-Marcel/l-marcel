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

async function getCertificatesData(locale?: string): Promise<Certificate[]> {
  const prismic = getPrismicClient();
  return await prismic.getAllByType("certificate", {}).then(res => {
    return res.map(({
      id,
      data
    }) => {
      let {
        name,
        "ptbr-name": ptBR_name,
        issuing_organization,
        "ptbr-issuing_organization": ptBR_issuing_organization,
        issued_in,
        expires_in,
        description,
        "ptbr-description": ptBR_description,
        code,
        icon,
        url
      } = data;

      if(locale === "pt-BR") {
        name = ptBR_name;
        issuing_organization = ptBR_issuing_organization;
        description = ptBR_description;
      };

      return {
        id,
        name: name,
        icon,
        description: RichText.asText(description),
        issuingOrganization: issuing_organization,
        issuedIn: issued_in,
        expiresIn: expires_in ?? null,
        code: code,
        url: url
      } as Certificate;
    });
  }).catch(() => []);
}

async function getAchievementsData(locale?: string): Promise<Achievement[]> {
  const prismic = getPrismicClient();
  return await prismic.getAllByType("achievements", {}).then(res => {
    return res.map(({
      id,
      data
    }) => {
      let {
        name,
        "ptbr-name": ptBR_name,
        issuing_organization,
        "ptbr-issuing_organization": ptBR_issuing_organization,
        issued_in,
        expires_in,
        description,
        "ptbr-description": ptBR_description,
        code,
        icon,
        url
      } = data;

      if(locale === "pt-BR") {
        name = ptBR_name;
        issuing_organization = ptBR_issuing_organization;
        description = ptBR_description;
      };

      return {
        id,
        name: name,
        icon,
        description: RichText.asText(description),
        issuingOrganization: issuing_organization,
        issuedIn: issued_in,
        expiresIn: expires_in ?? null,
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