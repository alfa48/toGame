export const truncate = (text: string, maxLength: number): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// Gera nome curto baseado no displayName original
export function generateUsername(fullName: string): string {
  if (!fullName) return "user";

  const parts = fullName.trim().split(/\s+/); // divide por espaços múltiplos

  const first = parts[0];                           // primeiro nome
  const last = parts[parts.length - 1];             // último sobrenome

  const username = `${first[0].toLowerCase()}_${last.toLowerCase()}`;

  return username;
}

export function generateAvatar(username: string): string {
  return `https://api.dicebear.com/8.x/pixel-art/svg?seed=${encodeURIComponent(username)}`;
}