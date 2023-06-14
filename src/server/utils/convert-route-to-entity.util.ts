const mapping: Record<string, string> = {
  articles: 'article',
  categories: 'category',
  'overview-pages': 'overview_page',
  publishers: 'publisher',
  translations: 'translation',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
