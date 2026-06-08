import { createFileRoute } from "@tanstack/react-router";
import { seo } from "../lib/seo";
import { MarkdownDoc } from "../components/MarkdownDoc";
import termsMd from "../../docs/SLICE_Terms_and_Conditions.md?raw";

export const Route = createFileRoute("/terms")({
  head: () =>
    seo({
      title: "Terms & Conditions",
      path: "/terms",
      description:
        "The terms and conditions governing your use of the SLICE debt resolution app, website, AI tools, coaching, and subscriptions.",
    }),
  component: Terms,
});

function Terms() {
  return <MarkdownDoc raw={termsMd} />;
}
