import { createFileRoute } from "@tanstack/react-router";
import { seo } from "../lib/seo";
import { MarkdownDoc } from "../components/MarkdownDoc";
import privacyMd from "../../docs/SLICE_Privacy_Policy.md?raw";

export const Route = createFileRoute("/privacy")({
  head: () =>
    seo({
      title: "Privacy Policy",
      path: "/privacy",
      description:
        "How SLICE collects, uses, stores, and protects your personal and debt-planning information.",
    }),
  component: Privacy,
});

function Privacy() {
  return <MarkdownDoc raw={privacyMd} />;
}
