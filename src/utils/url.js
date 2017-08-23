export function ensureScheme(value, defaultScheme = 'http') {
  if (!value || value.length === 0)
    return value;

  if (value.indexOf('://') < 0)
    return `${defaultScheme}://${value}`;

  return value;
}
