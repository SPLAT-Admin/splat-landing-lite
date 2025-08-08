import type { AppProps } from "next/app";
import withSplatBoundary from "./_splat-sentry-boundary";
import BaseApp from "./_app.base";

const Wrapped = withSplatBoundary(BaseApp as any);
export default function MyApp(props: AppProps) {
  return <Wrapped {...props} />;
}
