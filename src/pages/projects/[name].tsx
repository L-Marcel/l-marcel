import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import Resume, { ResumeProps } from "..";
import { useRouter } from "../../context/hooks/useRouter";
import { Github } from "../../services/classes/Github";
import { ReadStream } from "tty";


export function Project(props: ResumeProps) {
  const router = useRouter();

  if(router.isFallback) {
    return (
      <></>
    );
  }

  return Resume({ ...props, withProfile: false });
}

export const getStaticPaths: GetStaticPaths = async({ locales }) => {
  const repositories = await Github.getRepositories({});
  let paths: (string | {
      params: ParsedUrlQuery;
      locale?: string | undefined;
  })[] = [];

  for(const l in locales) {
    const localePaths = await Promise.all(repositories.map(async(repository) => {
      return {
        params: {
          name: repository.name.toLowerCase()
        },
        locale: locales[Number(l)]
      };
    }));

    paths = [...paths, ...localePaths];
  }

  return {
    paths,
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async({ locale, params }) => {
  if(!params?.name || Array.isArray(params?.name)) {
    return {
      notFound: true
    };
  }

  const repositoryExist = await Github.checkRepository(params?.name);

  if(!repositoryExist) {
    return {
      notFound: true
    };
  }

  const { readme, demoVideoURL } = await Github.getRepositoryDocs({
    repositoryName: params?.name,
    locale: locale ?? "pt-br",
    replaceRules: (readme) => {
      readme = readme.replace("<span id=\"repository-name\"/>", `<span>${params?.name}</span>`);
      readme = readme.replace("<div id=\"repository-buttons\"/>", `<a class="navigation-link" href="https://github.com/l-marcel/${params?.name}" target="__blank__">
  ${locale !== "pt-br"? "repository":"repositório"}
</a>
<span id="only-if-not-last">•</span>`);
      return readme;
    },
  });
  
  const updatedAt = new Date().toString();

  return {
    props: {
      data: readme,
      updatedAt,
      name: params?.name,
      demoVideoURL
    },
    revalidate: 1
  };
};

export default Resume;