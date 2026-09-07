import { useEffect } from "react";
import { company } from "../data/site";

interface SeoProps {
  title: string;
  description?: string;
  path?: string;
  image?: string;
}

const DEFAULT_DESC =
  "Sakshionmi Group provides professional assistance for home loans, property loans, business loans, OD/CC limits, industrial loans and property sale & purchase.";

export default function Seo({ title, description = DEFAULT_DESC, path = "/", image = "/og-image.svg" }: SeoProps) {
  useEffect(() => {
    document.title = title;
    setMeta("description", description);
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:type", "website", true);
    setMeta("og:url", `${company.websiteUrl}${path}`, true);
    setMeta("og:image", image, true);
    setMeta("twitter:card", "summary_large_image", true);
    setMeta("twitter:title", title, true);
    setMeta("twitter:description", description, true);
    setMeta("twitter:image", image, true);
    setLink("canonical", `${company.websiteUrl}${path}`);
  }, [title, description, path, image]);

  return null;
}

function setMeta(name: string, content: string, property = false) {
  const attr = property ? "property" : "name";
  let el = document.head.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}
