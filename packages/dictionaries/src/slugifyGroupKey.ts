/**
 * Canonical market-group slug
 */
const slugifyGroupKey = (name: string): string => (
  String(name)
    .toLowerCase()
    .replace(/['.]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
)

export default slugifyGroupKey
