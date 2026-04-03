export const markDown = (str: string | undefined | null): string => {

  if (!str || typeof str !== 'string') return "";

  const containerStyle = "line-height: 1.8; color: #374151;";
  const listStyle = "margin: 0; padding-left: 1.2rem; list-style-type: disc;";
  const itemStyle = "margin-bottom: 0.75rem; padding-left: 0.25rem;";
  const paragraphStyle = "margin-bottom: 1rem; font-weight: 600; color: #212121;";

  const lines = str.split("\n").map(l => l.trim()).filter(l => l.length > 0);
  let hasList = false;

  const processedContent = lines.map((line) => {
    if (line.startsWith("*") || line.startsWith("-")) {
      hasList = true;
      const cleanText = line.replace(/^[*|-]\s*/, "");
      return `<li style="${itemStyle}">${cleanText}</li>`;
    }
    return `<p style="${paragraphStyle}">${line}</p>`;
  }).join("");

  if (hasList) {
    return `<div style="${containerStyle}"><ul style="${listStyle}">${processedContent}</ul></div>`;
  }
  return `<div style="${containerStyle}">${processedContent}</div>`;

};