import { useEffect } from "react";

export const useSeo = ({ title, description, noindex = false }) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    let metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute("content");
    if (metaDesc && description) metaDesc.setAttribute("content", description);

    let metaRobots = document.querySelector('meta[name="robots"]');
    const prevRobots = metaRobots?.getAttribute("content");
    if (metaRobots) metaRobots.setAttribute("content", noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1");

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) metaDesc.setAttribute("content", prevDesc);
      if (metaRobots && prevRobots) metaRobots.setAttribute("content", prevRobots);
    };
  }, [title, description, noindex]);
};
