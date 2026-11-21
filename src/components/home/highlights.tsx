import { PHOTOS, type Photo } from "@/content/photos";

const ITEMS: { photo: Photo; title: string; text: string; closed?: boolean }[] = [
  { photo: PHOTOS.lions, title: "Court of the Lions", text: "The marble courtyard and its fountain of twelve lions, at the heart of the Nasrid Palaces." },
  { photo: PHOTOS.myrtles, title: "Court of the Myrtles", text: "A long reflecting pool framed by myrtle hedges and the Comares Tower." },
  { photo: PHOTOS.generalife, title: "Generalife gardens", text: "The sultans' summer palace, with water channels, fountains and terraced gardens." },
  { photo: PHOTOS.stucco, title: "Carved ceilings", text: "Thousands of hand-carved stucco cells. Look up in every room of the palaces." },
];

export function Highlights() {
  return (
    <section aria-labelledby="see-title" className="py-16 sm:py-20">
      <div className="wrap">
        <h2 id="see-title" className="section-title">What you&rsquo;ll see</h2>
        <p className="mt-2 max-w-[60ch] text-muted">A General ticket or a full guided tour covers all of these.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((i) => (
            <figure key={i.title} className="overflow-hidden rounded-2xl bg-soft">
              <img src={i.photo.src} width={i.photo.width} height={i.photo.height} srcSet={i.photo.srcSet} sizes="(min-width:1024px) 300px, 50vw" alt={i.photo.alt} loading="lazy" className="aspect-[4/5] w-full object-cover" />
              <figcaption className="p-5">
                <h3 className="text-lg font-bold">{i.title}</h3>
                <p className="mt-1 text-[0.95rem] text-muted">{i.text}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
