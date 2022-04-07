import { api } from "../services/api";
import { getGithubRepos } from "../services/github";
import { getPrismicClient } from "../services/prismic";

const getStaticUserData = async({
  getRepos = false
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

  const user = await api.get("https://api.github.com/users/l-marcel")
  .then(res => {
    const data = res.data;
    const splitedName = data.name.split(" ");
    const firstName = splitedName.length > 0 ? splitedName[0]:"";
    const lastName = splitedName.length > 1 ? splitedName[splitedName.length - 1]:"";

    return {
      username: String(data.login).toLowerCase(),
      fullname: data.name,
      name: `${firstName} ${lastName}`,
      avatar: data.avatar_url,
      reposUrl: data.repos_url,
      qtdRepos: data.public_repos,
      about: ""
    } as User;
  });

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
  }):undefined;

  const repos = getRepos? await getGithubRepos(user.reposUrl, {
    initialPage: 1,
    reposPerPage: 50,
    repos: [],
    formatters
  }):[];

  return {
    user: {
      ...user,
      ...links
    },
    repos
  };
};

export { getStaticUserData };