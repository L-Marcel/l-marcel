function boxShadow(withHoverEffect = false, color?: string) {
  return withHoverEffect? {
    filter: `drop-shadow(0px 4px 4px var(--chakra-colors-alt-200)) !important`,
    _hover: {
      filter: `drop-shadow(0px 4px 4px var(--chakra-colors-alt-200)) brightness(0.9) !important`,
    }
  }:{
    filter: "drop-shadow(0px 4px 4px var(--chakra-colors-alt-200)) !important",
  };
};

export { boxShadow };