import { getGithubRepos, getGithubReposTopLanguages } from "../services/github";
import { getAchievementsData, getCertificatesData } from "../services/prismic";
import { getTechnologiesInRepositories } from "./getTechnologiesInRepositories";

const getStaticData = async({
  getRepos = false,
  getLanguages = false,
  getTechnologies = false,
  getCertificates = false,
  getAchievements = false
}, locale?: string) => {
  const needRepos = getRepos || getLanguages || getTechnologies;
  const repos = needRepos? await getGithubRepos({ getLanguages, locale }):[];

  const languages = getLanguages? getGithubReposTopLanguages(repos):null;
  const technologies = getTechnologies? getTechnologiesInRepositories(repos):[];

  const certificates = getCertificates? await getCertificatesData(locale):[];
  const achievements = getAchievements? await getAchievementsData(locale):[];

  return {
    languages,
    technologies,
    certificates,
    achievements,
    repos
  };
};

export { getStaticData };