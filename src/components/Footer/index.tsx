import { IconButton } from "../Button/IconButton";
import { FooterContainer, FooterNavigation } from "./styles";

export function Footer() {
  const network = {
    discord: "https://discordapp.com/users/286662065802838016",
    whatsapp: "https://wa.me/5584996230190",
    github: "https://github.com/l-marcel",
    linkedin: "https://linkedin.com/in/l-marcel",
    npm: "https://www.npmjs.com/~lmarcel",
    rocketseat: "https://app.rocketseat.com.br/me/l-marcel",
    email: "https://mail.google.com/mail/u/0/?to=lmgh1312@gmail.com&su=&body=&tf=cm",
    emailApp: "mailto:lmgh1312@gmail.com?subject=&body=&tf=cm",
  };

  function redirectToSocial(social: keyof typeof network) {
    window.open(network[social], "_blank");
  }

  return (
    <FooterContainer>
      <FooterNavigation>
        <ul className="flex flex-row flex-wrap gap-2 pb-6">
          <li>
            <IconButton
              onClick={() => {
                return redirectToSocial("discord");
              }}
              className="rounded-lg"
              icon="discord"
              size="sm"
              title="discord"
            />
          </li>
          <li>
            <IconButton
              onClick={() => {
                return redirectToSocial("whatsapp");
              }}
              className="rounded-lg"
              icon="whatsapp"
              size="sm"
              title="whatsapp"
            />
          </li>
          <li>
            <IconButton
              onClick={() => {
                return redirectToSocial("github");
              }}
              className="rounded-lg"
              icon="github"
              size="sm"
              title="github"
            />
          </li>
          <li className="hidden md:inline">
            <IconButton
              onClick={() => {
                return redirectToSocial("email");
              }}
              className="rounded-lg"
              icon="mail"
              size="sm"
              title="email"
            />
          </li>
          <li className="inline md:hidden">
            <IconButton
              onClick={() => {
                return redirectToSocial("emailApp");
              }}
              className="rounded-lg"
              icon="mail"
              size="sm"
              title="email"
            />
          </li>
          <li>
            <IconButton
              onClick={() => {
                return redirectToSocial("linkedin");
              }}
              className="rounded-lg"
              icon="linkedin"
              size="sm"
              title="linkedin"
            />
          </li>
          <li>
            <IconButton
              onClick={() => {
                return redirectToSocial("npm");
              }}
              className="rounded-lg"
              icon="npm"
              size="sm"
              title="npm"
            />
          </li>
          <li>
            <IconButton
              onClick={() => {
                return redirectToSocial("rocketseat");
              }}
              className="rounded-lg"
              icon="rocketseat"
              size="sm"
              title="rocketseat"
            />
          </li>
        </ul>
      </FooterNavigation>
    </FooterContainer>
  );
}
