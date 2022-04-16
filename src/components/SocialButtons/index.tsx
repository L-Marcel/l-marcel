import { Grid, useBreakpointValue } from "@chakra-ui/react";
import { m } from "framer-motion";
import { fadeToTopOnScroll } from "../../theme/animations/motion";
import { SocialButton } from "./SocialButton";

interface SocialButtonsProps {
  locale?: string;
};

function SocialButtons({ locale }: SocialButtonsProps) {
  const messageTitle = locale === "pt-BR"? "👋 Olá, Marcel!":"👋 Hello, Marcel!";
  const message = locale === "pt-BR"? "Eu adoraria falar com você sobre...":"I would love to talk to you about...";

  const rocketseat = "https://app.rocketseat.com.br/me/l-marcel";
  const github = "https://github.com/l-marcel";
  const linkedIn = "https://linkedin.com/in/l-marcel";
  const whatsapp = `https://api.whatsapp.com/send?phone=5584996230190&text=*${messageTitle}*%0D%0A%0D%0A${message}`;
  const webEmail = `https://mail.google.com/mail/u/0/?to=lmgh1312@gmail.com&su=${messageTitle}&body=${message}&tf=cm`;
  const mobileEmail = `mailto:lmgh1312@gmail.com?subject=${messageTitle}&body=${message}&tf=cm`;
  const email = useBreakpointValue({
    xl: webEmail,
    lg: webEmail,
    md: webEmail,
    base: mobileEmail
  });

  return (
    <Grid
      as={m.div}
      mt={4} columnGap={4} rowGap={4}
      templateColumns={[
        "1fr 1fr",
        "1fr 1fr",
        "1fr 1fr 1fr",
        "1fr 1fr 1fr 1fr 1fr",
        "1fr 1fr 1fr 1fr 1fr"
      ]}
      {...fadeToTopOnScroll}
    >
      <SocialButton onClick={() => window.open(linkedIn, "_blank")}>
        LinkedIn
      </SocialButton>
      <SocialButton onClick={() => window.open(rocketseat, "_blank")}>
        Rocketseat
      </SocialButton>
      <SocialButton onClick={() => window.open(github, "_blank")}>
        Github
      </SocialButton>
      <SocialButton onClick={() => window.open(email, "_blank")}>
        Gmail
      </SocialButton>
      <SocialButton onClick={() => window.open(whatsapp, "_blank")}>
        Whatsapp
      </SocialButton>
    </Grid>
  );
};

export { SocialButtons };