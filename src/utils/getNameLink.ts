export default function getNameLink(name: string): string {
  return name.replaceAll(' ', '-').toLowerCase();
}
