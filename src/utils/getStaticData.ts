import { getGithubRepos, getGithubReposTopLanguages } from "../services/github";
import { getCertificatesData } from "../services/prismic";
import { getTechnologiesInRepositories } from "./getTechnologiesInRepositories";

const getStaticData = async({
  getRepos = false,
  getLanguages = false,
  getTechnologies = false,
  getCertificates = false
}) => {
  const needRepos = getRepos || getLanguages || getTechnologies;
  const repos = needRepos? await getGithubRepos({ getLanguages }):[];

  const languages = getLanguages? getGithubReposTopLanguages(repos):null;
  const technologies = getTechnologies? getTechnologiesInRepositories(repos):[];

  const certificates = getCertificates? await getCertificatesData():[];

  return {
    languages,
    technologies,
    certificates,
    repos
  };
};

export { getStaticData };