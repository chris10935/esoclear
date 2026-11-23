import { renderSocialImage } from "@/lib/socialImage";

export const alt = "EsoClear: advancing prevention of caustic esophageal stricture";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderSocialImage();
}
