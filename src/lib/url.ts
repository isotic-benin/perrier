export function construireURL(
  chemin: string,
  params: Record<string, string | undefined>,
  surcharges: Record<string, string | undefined>,
): string {
  const usp = new URLSearchParams();
  Object.entries({ ...params, ...surcharges }).forEach(([cle, valeur]) => {
    if (valeur !== undefined && valeur !== "") {
      usp.set(cle, valeur);
    }
  });
  const chaine = usp.toString();
  return chaine ? `${chemin}?${chaine}` : chemin;
}