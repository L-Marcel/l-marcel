import { Box, HStack, Stack, useBreakpointValue } from "@chakra-ui/react";
import { AnimatePresence, domMax, LazyMotion } from "framer-motion";
import { useState } from "react";
import useShowOverlay from "../../contexts/hooks/useShowOverlay";
import { RepositoriesListItem } from "./RepositoriesListItem";
import RepositoryModal from "./RepositoryModal";

interface RepositoriesListGridProps {
  repos: Repository[];
};

function RepositoriesListGrid({
  repos
}: RepositoriesListGridProps) {
  const { setShowOverlay } = useShowOverlay();
  const [repo, setRepo] = useState<Repository>();
  const stacks = useBreakpointValue({
    base: ["a"],
    xl: ["a", "b", "c"],
    lg: ["a", "b"],
    md: ["a"],
    sm: ["a"]
  }) ?? [];
  const qtdStacks = stacks.length;

  const rows = [];

  for(let c = 0; c < repos.length/qtdStacks; c++) {
    let child = repos.slice(c*qtdStacks, qtdStacks + (qtdStacks * c));
    rows.push(child);
  };

  const columns = rows.reduce((pre, cur) => {
    cur.length >= 1 && pre[0].push(cur[0]);
    cur.length >= 2 && pre[1].push(cur[1]);
    cur.length >= 3 && pre[2].push(cur[2]);
    
    return pre;
  }, [[], [], []] as [Repository[], Repository[], Repository[]]);

  return (
    <LazyMotion features={domMax}>
      <Box 
        pt={["30px!important", "50px!important", "40px!important", 35]}
        position="relative"
        display="flex"
        justifyContent="center"
      >
        <AnimatePresence>
          {repo && <RepositoryModal 
            repo={repo}
          />}
        </AnimatePresence>
        <HStack
          alignItems="flex-start"
          justifyContent="center"
          spacing={5}
        >
          {stacks.map((a, i) => {
            if(i >= repos.length) {
              return null;
            };

            return (
              <Stack
                key={a} 
                spacing={5}
                minW="33%"
                maxW={["100%", "100%", "90%", "60%"]}
                mb={["20px", 0, 0, 0, 0, 0]}
              >
                {columns.length > i && columns[i].map(r => {
                  return (
                    <RepositoriesListItem
                      onSelect={() => {
                        setShowOverlay(true, "repo");
                        setRepo(r);
                      }}
                      key={r.id}
                      repo={r}
                    />
                  );
                })}
              </Stack>
            );
          })}
        </HStack>
      </Box>
    </LazyMotion>
  );
};

export { RepositoriesListGrid };