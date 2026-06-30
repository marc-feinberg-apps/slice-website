import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/learn/$videoId")({
  beforeLoad: () => {
    throw redirect({ to: "/learn" });
  },
  component: () => null,
});
