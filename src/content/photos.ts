// Public-domain / CC0 photos by Jebulon on Wikimedia Commons.
// Served through Special:FilePath (redirects to a resized copy).
// Phase 2: replace with your own photos uploaded through the admin media library.

const fp = (file: string, width: number) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;

export type Photo = { src: string; srcSet: string; alt: string; credit: string; page: string };

function photo(file: string, alt: string): Photo {
  return {
    src: fp(file, 1600),
    srcSet: [800, 1200, 1600, 2400].map((w) => `${fp(file, w)} ${w}w`).join(", "),
    alt,
    credit: "Jebulon, Wikimedia Commons (public domain)",
    page: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`,
  };
}

export const PHOTOS = {
  hero: photo("Alhambra_in_the_evening.jpg", "The Alhambra on its hill in Granada, lit by the evening sun"),
  lions: photo("Pavillon_Cour_des_Lions_Alhambra_Granada_Spain.jpg", "A carved pavilion in the Court of the Lions, Nasrid Palaces"),
  myrtles: photo("Patio_de_los_Arrayanes_Alhambra_Granada_Spain.jpg", "The Court of the Myrtles with its long reflecting pool and the Comares Tower"),
  generalife: photo("Patio_Acequia_Generalife_2012.jpg", "Fountains and flowerbeds in the Patio de la Acequia, Generalife gardens"),
  abencerrages: photo("Toit_salle_Abencerrages_Alhambra_Espagne.jpg", "The star-shaped muqarnas dome of the Hall of the Abencerrages, Nasrid Palaces"),
  stucco: photo("Stucco_ceiling,_Patio_de_los_Leones,_Alhambra,_Granada,_Spain,_crop.jpg", "Carved stucco ceiling in the Court of the Lions"),
};
