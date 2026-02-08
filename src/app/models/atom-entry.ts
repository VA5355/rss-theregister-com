export class AtomEntry {
  id: string | null = null;
  title: string | null = null;
  link: string | null = null;
  summary: string | null = null;
  author: { uri: string, name: string } | null = null;
  updated: number | null = null;
}
