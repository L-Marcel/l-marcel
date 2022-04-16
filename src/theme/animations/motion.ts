const fadeLayout = {
  initial: "hidden",
  animate: "visible",
  variants: {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      duration: .2,
      transition: {
        delayChildren: .05,
        staggerChildren: .05
      }
    }
  }
};

const fadeToTop = {
  variants: {
    hidden: {
      opacity: 0,
      y: 5
    },
    visible: {
      opacity: 1,
      y: 0
    }
  }
};

const fadeToTopOnScroll = {
  initial: "hidden",
  viewport: { 
    once: true
  },
  whileInView: "inView",
  variants: {
    hidden: {
      opacity: 0,
      y: 5
    },
    inView: {
      opacity: 1,
      y: 0,
      transition: {
        delay: .2,
        duration: .2
      }
    }
  }
};

const scaleOnInteract = {
  whileHover: {
    scale: .9
  },
  whileTap: {
    scale: .85
  }
};

const weakScaleOnInteract = {
  whileHover: {
    scale: .95
  },
  whileTap: {
    scale: .9
  }
};

const colorSequenceLayout = {
  initial: "uncolorized",
  whileInView: "colorized",
  variants: {
    uncolorized: {
      opacity: 0
    },
    colorized: {
      opacity: 1,
      transition: {
        delayChildren: .3,
        staggerChildren: .2
      }
    }
  }
};

const colorize = {
  variants: {
    uncolorized: {
      backgroundColor: "var(--chakra-colors-alt-300)"
    },
    colorized: {
      backgroundColor: "currentColor",
      transition: {
        duration: .2
      }
    }
  }
};

const expandedFilterButton = {
  variants: {
    initial: {
      paddingRight: "0.75rem"
    },
    selected: {
      paddingRight: "1.75rem",
      transition: {
        duration: .2,
        delayChildren: .1,
        staggerChildren: .1
      }
    }
  }
};


const reverseExpandedFilterButton = {
  variants: {
    initial: {
      paddingLeft: "0.75rem"
    },
    selected: {
      paddingLeft: "1.75rem",
      transition: {
        duration: .2,
        delayChildren: .1,
        staggerChildren: .1
      }
    }
  }
};

const expandedFilterButtonIcon = {
  variants: {
    initial: {
      opacity: 0
    },
    selected: {
      opacity: 1
    }
  }
};

export { 
  fadeToTop,
  fadeLayout,
  fadeToTopOnScroll,
  scaleOnInteract,
  weakScaleOnInteract,
  colorSequenceLayout,
  colorize,
  expandedFilterButton,
  expandedFilterButtonIcon,
  reverseExpandedFilterButton
};