export const replaceMDLink = (text?: string) => {
  if (!text) return "";

  let newText = text;
  const elements = text.match(/\[.*?\)/g);
  if (elements != null && elements.length > 0) {
    elements.forEach((el) => {
      const url = el.match(/\((.*?)\)/)?.[1];
      newText = newText.replace(
        el,
        '<a href="' +
          url +
          '" target="_blank" style="text-decoration:underline">' +
          "[ZOBACZ (LINK)]" +
          "</a>"
      );
    });
  }
  return newText;
};
