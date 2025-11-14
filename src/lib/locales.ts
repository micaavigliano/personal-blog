export type RouteLocale = "en" | "es" | "it"
export const ROUTE_TO_CF: Record<RouteLocale, string> = {
  en: "en-US",
  es: "es",
  it: "it",
}

export const CF_TO_ROUTE: Record<string, RouteLocale> = {
  "en-US": "en",
  "es": "es",
  "it": "it",
}

export const toCfLocale = (routeLocale: string): string => {
  return ROUTE_TO_CF[routeLocale as RouteLocale] ?? routeLocale
}

export const toRouteLocale = (cfLocale: string): RouteLocale | string => {
  return CF_TO_ROUTE[cfLocale] ?? cfLocale.split("-")[0]
}