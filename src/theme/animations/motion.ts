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

const scaleOnInteract = {
  whileHover: {
    scale: .9
  },
  whileTap: {
    scale: .85
  }
}

export { 
  fadeToTop,
  fadeLayout,
  scaleOnInteract
};