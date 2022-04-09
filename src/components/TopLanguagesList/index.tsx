import { Grid } from "@chakra-ui/react";
import { TopLanguageItem } from "./TopLanguageItem";

interface TopLanguagesListProps extends BoxProps {
  languages?: { [key: string]: number };
};

function TopLanguagesList({
  languages,
  ...rest
}: TopLanguagesListProps) {
  let langs = Object.entries(languages);
  
  const total = langs.reduce((pre, cur) => {
    const [_, value] = cur;
    pre += value;

    return pre;
  }, 0);

  langs = langs.sort((a, b) => b[1] - a[1]).reduce((pre, cur, i) => {
    if(i < 8) {
      pre.push(cur);
    };

    return pre;
  }, []);

  return (
    <Grid
      mt={5}
      gridTemplateColumns="1fr 1fr"
      gridTemplateAreas={[
        `"a1""a2""a3""a4""a5""a6""a7""a8"`,
        `"a1""a2""a3""a4""a5""a6""a7""a8"`,
        `"a1 a2""a3 a4""a5 a6""a7 a8"`,
        `"a1 a2""a3 a4""a5 a6""a7 a8"`,
        `"a1 a2""a3 a4""a5 a6""a7 a8"`,
        `"a1 a2""a3 a4""a5 a6""a7 a8"`,
        `"a1 a2""a3 a4""a5 a6""a7 a8"`
      ]} 
      {...rest}
    >
      {langs.map((l, i) => {
        const [key, value] = l;

        return (
          <TopLanguageItem
            gridArea={`a${i + 1}`}
            key={key}
            name={key}
            value={value}
            compareWith={total}
          />
        );
      })}
    </Grid>
  );
};

export { TopLanguagesList };