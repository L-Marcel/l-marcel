import { Transition } from "@headlessui/react";
import { useMenuIsOpen } from "../../../context/hooks/useMenuIsOpen";
import { MobileNavLink } from "../../Navigation/MobileNavLink";
import { NavLink } from "../../Navigation/NavLink";
import { MobileMenuContentContainer, MobileMenuLinksList } from "./styles";
import { TFunction } from "next-i18next";

interface MobileMenuContentProps {
  t: TFunction;
}

export function MobileMenuContent({ t }: MobileMenuContentProps) {
  const { isOpen, toggleMenu } = useMenuIsOpen();

  function handleOnClickInOverlay() {
    isOpen && toggleMenu();
  }

  return (
    <>
      <Transition
        show={isOpen}
        onClick={handleOnClickInOverlay}
        enter="duration-[350ms] transition-all ease-in-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="duration-[350ms] transition-all ease-in-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="custom-backdrop-blur fixed bottom-0 right-0 -z-30 h-screen w-screen bg-[rgba(255,255,255,.3)] dark:bg-[rgba(0,0,0,.3)]"
      />
      <Transition
        show={isOpen}
        enter="transform duration-[400ms] transition-all ease-in-out"
        enterFrom="translate-y-full opacity-60"
        enterTo="opacity-100 translate-y-0"
        leave="transform duration-[400ms] transition-all ease-in-out"
        leaveFrom="translate-y-0 opacity-100"
        leaveTo="translate-y-full opacity-60"
        className="fixed bottom-0 right-0 -z-20 w-full pb-[3rem]"
      >
        <MobileMenuContentContainer>
          <ul className="mobile-locale-menu-group flex flex-row justify-center">
            <NavLink t={t} path="" name="pt-BR" locale="pt-BR" liClassName="flex-1" />
            <NavLink t={t} path="" name="en-US" locale="en-US" liClassName="flex-1" />
          </ul>
          <MobileMenuLinksList>
            <MobileNavLink t={t} path="/" name="resume" />
            <MobileNavLink t={t} path="/projects" name="projects" dynamic />
            <MobileNavLink t={t} path="/achievements" name="achievements" />
          </MobileMenuLinksList>
        </MobileMenuContentContainer>
      </Transition>
    </>
  );
}
