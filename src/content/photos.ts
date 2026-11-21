// Public-domain / CC0 photos by Jebulon on Wikimedia Commons.
// Self-hosted as resized WebP copies in /public/images/photos (made 21 Nov 2026
// from the Commons originals) so the site doesn't hotlink or wait on redirects.
// Phase 2: replace with your own photos uploaded through the admin media library.

// width/height are the intrinsic size of the default (src) file; they go on
// every <img> so the browser reserves space before the image loads (no CLS).
export type Photo = { src: string; srcSet: string; alt: string; credit: string; page: string; width: number; height: number };

const WIDTHS = [640, 960, 1280, 1600, 2000];

function photo(key: string, file: string, alt: string, size: [number, number], widths = WIDTHS): Photo {
  const url = (w: number) => `/images/photos/${key}-${w}.webp`;
  return {
    src: url(widths[Math.min(2, widths.length - 1)]),
    srcSet: widths.map((w) => `${url(w)} ${w}w`).join(", "),
    alt,
    credit: "Jebulon, Wikimedia Commons (public domain)",
    page: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`,
    width: size[0],
    height: size[1],
  };
}

export const PHOTOS = {
  hero: photo("hero", "Alhambra_in_the_evening.jpg", "The Alhambra on its hill in Granada, lit by the evening sun", [1280, 714], [640, 960, 1280, 1920, 2560]),
  lions: photo("lions", "Pavillon_Cour_des_Lions_Alhambra_Granada_Spain.jpg", "A carved pavilion in the Court of the Lions, Nasrid Palaces", [1280, 1789]),
  myrtles: photo("myrtles", "Patio_de_los_Arrayanes_Alhambra_Granada_Spain.jpg", "The Court of the Myrtles with its long reflecting pool and the Comares Tower", [1280, 974]),
  generalife: photo("generalife", "Patio_Acequia_Generalife_2012.jpg", "Fountains and flowerbeds in the Patio de la Acequia, Generalife gardens", [1280, 1947]),
  abencerrages: photo("abencerrages", "Toit_salle_Abencerrages_Alhambra_Espagne.jpg", "The tiled roof of the Hall of the Abencerrages above the Nasrid Palaces", [1280, 852]),
  stucco: photo("stucco", "Stucco_ceiling,_Patio_de_los_Leones,_Alhambra,_Granada,_Spain,_crop.jpg", "Carved stucco ceiling in the Court of the Lions", [1280, 1286]),
  alcazaba: photo("alcazaba", "Alcazaba,_Alhambra,_Granada,_Spain.jpg", "The towers and ramparts of the Alcazaba, the oldest part of the Alhambra", [1280, 852]),
  partal: photo("partal", "Pavillon_Partal_Alhambra_Grenade_1.jpg", "The Partal pavilion and its long pool in the Alhambra gardens", [1280, 839]),
  charlesv: photo("charlesv", "Dawn_Charles_V_Palace_Alhambra_Granada_Andalusia_Spain.jpg", "The Renaissance Palace of Charles V inside the Alhambra at dawn", [1280, 852]),
  albaicinview: photo("albaicinview", "Albaizin,_part,_from_Alhambra,_Granada,_Andalusia,_Spain.jpg", "The white houses of the Albaicín seen from the Alhambra walls", [1280, 852]),
  gfountain: photo("gfountain", "Fountain_Generalife_gardens,_Granada,_Spain.jpg", "A fountain and clipped hedges in the Generalife gardens", [1280, 993]),
  ceiling: photo("ceiling", "Ceiling_Plus_Oultre_Alhambra_Granada.jpg", "A carved wooden ceiling in the Alhambra", [1280, 944]),
};
