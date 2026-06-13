import { useEffect, useState } from "react";
import { Toaster as Sonner } from "sonner";

/**
 * App-wide toast surface. Mounted once in the root document. Styled to match
 * the SLICE brand (rounded cards, soft shadow, orange/navy palette) and tuned
 * for UX: on desktop toasts land bottom-right, on mobile they land top-center
 * where the thumb isn't covering them, with rich colors + a close button so
 * errors are dismissible.
 */
export function Toaster() {
  // `md` breakpoint (768px) — bottom-right on desktop, top on mobile.
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return (
    <Sonner
      position={isDesktop ? "bottom-right" : "top-center"}
      richColors
      closeButton
      expand
      gap={10}
      offset={16}
      toastOptions={{
        classNames: {
          toast:
            "!rounded-2xl !border !shadow-soft !font-sans !text-[0.9375rem] !p-4 !gap-3",
          title: "!font-bold !tracking-tight",
          description: "!text-[0.8125rem] !opacity-90",
          actionButton: "!rounded-full !font-bold",
          closeButton: "!rounded-full",
        },
      }}
      style={
        {
          "--font-sans":
            '"Inter", ui-sans-serif, system-ui, -apple-system, sans-serif',
          // Success → brand-friendly green; error → warm red that fits the palette.
          "--success-bg": "#f0fdf4",
          "--success-border": "#bbf7d0",
          "--success-text": "#166534",
          "--error-bg": "#fff1f2",
          "--error-border": "#fecdd3",
          "--error-text": "#be123c",
        } as React.CSSProperties
      }
    />
  );
}
