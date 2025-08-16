export const hexToArgbInt = (hex: string, alpha = 255) => {
  // Remove leading '#' if present
  hex = hex.replace(/^#/, '');

  // Expand shorthand (#rgb → #rrggbb)
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((c) => c + c)
      .join('');
  }

  if (hex.length !== 6) {
    throw new Error('Invalid hex color: ' + hex);
  }

  // Parse R, G, B
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return (b << 0) + (g << 8) + (r << 16) + (alpha << 24);
};
