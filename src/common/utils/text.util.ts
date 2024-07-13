export async function getLinksFromText(
  content: string,
): Promise<string[] | null> {
  const regex =
    // eslint-disable-next-line no-useless-escape
    /([\w+]+\:\/\/)?([\w\d-]+\.)*[\w-]+[\.\:]\w+([\/\?\=\&\#\.]?[\w-]+)*\/?/gm;
  return content.match(regex);
}

export async function getTextWordCount(
  str: string | undefined,
): Promise<number> {
  if (!str) {
    return 0;
  }
  const text = await getTextFromHtml(str);
  const finalText = text.match(
    /[آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئa-zA-Z0-9!@#$&()-`.+,/*$]{2,}/g,
  );

  if (finalText) {
    return finalText.length;
  } else {
    return 0;
  }
}

export async function getTextFromHtml(html: string): Promise<string> {
  const text = html.replace(/<[^>]+>/g, '');
  return text.trim();
}
