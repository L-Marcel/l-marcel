import { useRouter as useNextRouter } from "next/router";

export function useRouter() {
  const router = useNextRouter();
  const isNotPtBr = router.locale === "en-us";

  return {
    isNotPtBr,
    ...router,
  };
}
