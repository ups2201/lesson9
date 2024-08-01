/**
 * Получение координат с сайта geojs
 * @returns {Promise<any|{cod: number, message: string}>}
 */
export async function showGeo() {
  try {
    const response = await fetch(`https://get.geojs.io/v1/ip/geo.json`);

    return response.json();
  } catch {
    return { cod: 500, message: `couldn't get geo info` };
  }
}
