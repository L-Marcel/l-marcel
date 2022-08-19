import { Transition } from "@headlessui/react";
import { useMobileMenuIsOpen } from "../../../context/hooks/useMobileMenuIsOpen";
import { NavLink } from "../../Navigation/NavLink";
import { MobileMenuContentContainer } from "./styles";

export function MobileMenuContent() {
  const { isOpen } = useMobileMenuIsOpen();

  return (
    <>
      <Transition
        show={isOpen}
        enter="duration-[350ms] transition-all ease-in-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="duration-[350ms] transition-all ease-in-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="fixed bottom-0 right-0 -z-30 h-screen w-screen bg-[#ffffff30] backdrop-blur-sm dark:bg-[#00000030]"
      />
      <Transition
        show={isOpen}
        enter="transform duration-[400ms] transition-all ease-in-out"
        enterFrom="translate-y-full opacity-60"
        enterTo="opacity-100 translate-y-0"
        leave="transform duration-[400ms] transition-all ease-in-out"
        leaveFrom="translate-y-0 opacity-100"
        leaveTo="translate-y-full opacity-60"
        className="fixed bottom-0 right-0 -z-20 h-[70vh] w-full pb-[3rem]"
      >
        <MobileMenuContentContainer>
          <ul className="mobile-locale-menu-group flex flex-row justify-center">
            <NavLink
              path=""
              name="pt-br"
              locale="pt-br"
              liClassName="flex-1"
            />
            <NavLink
              path=""
              name="en-us"
              locale="en-us"
              liClassName="flex-1"
            />
          </ul>
        </MobileMenuContentContainer>
      </Transition>
    </>
  );
}