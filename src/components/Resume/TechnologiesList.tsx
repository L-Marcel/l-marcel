import { TechnologyLevel } from "./TechnologyLevel";

function TechnologiesList() {
  return (
    <>
      <TechnologyLevel
        level={5}
        title="JavaScript"
      />
      <TechnologyLevel
        level={5}
        title="TypeScript"
      />
      <TechnologyLevel
        level={6}
        title="Next.js"
      />
      <TechnologyLevel
        level={1}
        title="Nest.js"
      />
      <TechnologyLevel
        level={5}
        title="React.js"
      />
      <TechnologyLevel
        level={4}
        title="Node.js"
      />
      <TechnologyLevel
        level={2}
        title="React Native"
      />
      <TechnologyLevel
        level={1}
        title="GraphQL"
      />
      <TechnologyLevel
        level={5}
        title="HTML"
      />
      <TechnologyLevel
        level={4}
        title="CSS or SASS"
        iconName="css"
      />
      <TechnologyLevel
        level={4}
        title="Chakra UI"
        iconName="chakraui"
      />
      <TechnologyLevel
        level={3}
        title="Framer Motion"
      />
      <TechnologyLevel
        level={4}
        title="Prisma"
      />
      <TechnologyLevel
        level={5}
        title="Express"
      />
      <TechnologyLevel
        level={3}
        title="Jest"
      />
      <TechnologyLevel
        level={4}
        title="Git & Github"
        iconName="git"
      />
      <TechnologyLevel
        level={1}
        title="Docker"
      />
      <TechnologyLevel
        level={3}
        title="Figma"
      />
      <TechnologyLevel
        level={1}
        title="Kafka"
      />
      <TechnologyLevel
        level={5}
        title="VSCode"
      />
    </>
  );
};

export { TechnologiesList };