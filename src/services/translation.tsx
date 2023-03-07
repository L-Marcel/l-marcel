/* eslint-disable react/display-name */
import { useEffect } from "react";
import { useRouter } from "next/router";

export class Translation {
  static use<Props>(Component: (props: Props) => JSX.Element) {
    return (props: Props) => {
      if (process.env.NODE_ENV === "development") {
        const router = useRouter();
        useEffect(() => {
          const timer = setInterval(() => {
            router.replace(router.asPath, undefined, {
              scroll: false,
            });
          }, 5000);
          return () => {
            return clearTimeout(timer);
          };
        });
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return <Component {...(props as any)} />;
    };
  }
}
