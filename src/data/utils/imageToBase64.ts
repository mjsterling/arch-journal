export async function imageToBase64BGRA(url: string) {
  // Fetch the image
  const res = await fetch(url);
  if (!res) {
    return { base64: null };
  }
  const blob = await res.blob();

  // Create an ImageBitmap (faster than <img>)
  const bitmap = await createImageBitmap(blob);

  // Draw onto an offscreen canvas
  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }
  ctx.drawImage(bitmap, 0, 0);

  // Get raw RGBA pixel data
  const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);

  // Convert RGBA → BGRA
  const bgra = new Uint8Array(data.length);
  for (let i = 0; i < data.length; i += 4) {
    bgra[i + 0] = data[i + 2]; // B <- R
    bgra[i + 1] = data[i + 1]; // G <- G
    bgra[i + 2] = data[i + 0]; // R <- B
    bgra[i + 3] = data[i + 3]; // A <- A
  }

  // Turn into base64
  let binary = '';
  for (let i = 0; i < bgra.length; i++) {
    binary += String.fromCharCode(bgra[i]);
  }
  const base64 = btoa(binary);

  // Return base64 string + dimensions if useful
  return { base64, width, height };
}
