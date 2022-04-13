const fadeLayout = {
  initial: "hidden",
  animate: "visible",
  variants: {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: .3,
        staggerChildren: .2
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
    once: false
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

export { 
  fadeToTop,
  fadeLayout,
  fadeToTopOnScroll,
  scaleOnInteract,
  colorSequenceLayout,
  colorize
};