export const truncate = (text: string, maxLength: number): string => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

// Gera nome curto baseado no displayName original
export function generateUsername(fullName: string): string {
  if (!fullName) return "user";

  const parts = fullName.trim().split(/\s+/); // divide por espaços múltiplos

  const first = parts[0]; // primeiro nome
  const last = parts[parts.length - 1]; // último sobrenome

  const username = `${first[0].toLowerCase()}_${last.toLowerCase()}`;

  return username;
}

export function generateAvatar(username: string): string {
  return `https://api.dicebear.com/8.x/pixel-art/svg?seed=${encodeURIComponent(
    username
  )}`;
}

export function isGoogleDefaultAvatar(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = url;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve(false);

      ctx.drawImage(img, 0, 0);
      const data = ctx.getImageData(0, 0, img.width, img.height).data;

      // Conta quantas cores diferentes existem no avatar
      const colors = new Set();

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        colors.add(`${r},${g},${b}`);
        if (colors.size > 50) {
          // Muitas cores = provavelmente foto real
          return resolve(false);
        }
      }

      // Poucas cores = avatar automático do Google
      resolve(true);
    };

    img.onerror = () => resolve(true); // falhou ao carregar → assume avatar
  });
}
