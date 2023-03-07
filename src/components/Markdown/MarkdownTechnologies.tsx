import { useRouter } from "../../context/hooks/useRouter";
import { LibrariesIcons } from "./Icons/LibrariesIcons";
import { TechnologiesIcons } from "./Icons/TechnologiesIcons";
import { UtilitiesIcons } from "./Icons/UtilitiesIcons";
import { MarkdownDiv } from "./MarkdownDiv";
import { TechnologiesLevel } from "./TechnologyLevel/TechnologiesLevel";

export function MarkdownTechnologies() {
  const { isNotPtBr } = useRouter();

  return (
    <>
      <MarkdownDiv className="flex flex-col gap-4">
        {isNotPtBr ? (
          <h2>
            Technologies <span>proficiency</span>
          </h2>
        ) : (
          <h2>
            <span>Proeficiência</span> com as technologias
          </h2>
        )}
        <TechnologiesIcons />
      </MarkdownDiv>
      <TechnologiesLevel />
      <div className="flex flex-col gap-2">
        <MarkdownDiv isHighlight={true} className="flex flex-col gap-4">
          {isNotPtBr ? (
            <h3>Production utilities</h3>
          ) : (
            <h3>Proeficiência com as technologias</h3>
          )}
          <UtilitiesIcons />
        </MarkdownDiv>
        <MarkdownDiv isHighlight={true} className="flex flex-col gap-4">
          {isNotPtBr ? (
            <h3>Frequently used libraries</h3>
          ) : (
            <h3>Bibliotecas mais usadas</h3>
          )}
          <LibrariesIcons />
        </MarkdownDiv>
      </div>
    </>
  );
}
