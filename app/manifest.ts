import type { MetadataRoute } from "next";
import { SITE_NAME } from "./site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Nicolas Aguirre",
    description: "Frontend freelance enfocado en paneles y flujos B2B.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf7f1",
    theme_color: "#faf7f1",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
