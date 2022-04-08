import { api } from "../services/api";
import { getGithubRepos, getGithubReposTopLanguages, getGithubUser } from "../services/github";
import { getPrismicClient } from "../services/prismic";

const getStaticUserData = async({
  getRepos = false,
  getLanguages = false
}) => {
  const prismic = getPrismicClient();

  const links = await prismic.getSingle("social-links", {}).then(res => {
    const { media, "cv-link": cvLink } = res.data;
    const socialLinks: SocialLink[] = media.map(sl => {
      return {
        name: sl.name,
        link: sl.link,
        type: sl.islink? "link":"copy",
      } as SocialLink;
    });
    
    return {
      links: socialLinks,
      cv: cvLink
    };
  });

  const user = await getGithubUser();

  const formatters = getRepos? await prismic.getSingle("name_formatter", {}).then(res => {
    const formatters = res.data.formatter.map(f => {
      return {
        ...f,
        replace: f.replace !== ""? f.replace:" "
      } as Formatter;
    });
    return formatters;
  }).catch((err) => {
    console.log(err);
  }):null;

  const repos = getRepos || getLanguages? await getGithubRepos(user.reposUrl, {
    initialPage: 1,
    reposPerPage: 50,
    repos: [],
    formatters,
    getLanguages
  }):[];

  const languages = getLanguages? getGithubReposTopLanguages(repos):null;

  return {
    user: {
      ...user,
      ...links
    },
    languages,
    repos
  };
};

export { getStaticUserData };