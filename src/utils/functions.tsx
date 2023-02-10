export const removeHtmlTags = (str: string): string =>
  str.replace(/<[^>]*>/g, "");

export const currentDateMinusOneMonth = (): string => {
  return new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 7);
};

export function getQueryParamString(params: any): string {
  if (!params || JSON.stringify(params) === "{}") return "";
  const array = [];
  for (const key in params) {
    const param = `${key}=${params[key]}`;
    array.push(param);
  }
  return array.join("&");
}
