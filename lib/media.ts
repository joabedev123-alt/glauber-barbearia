/**
 * Manifesto de mídia.
 *
 * Os arquivos em `public/media/` são as fotos foto01–foto09 e os vídeos
 * video01–video03 enviados para o projeto. O arquivo original da sétima
 * foto está salvo como `fot07.jpeg` na raiz; a cópia pública usa `foto07.jpeg`.
 *
 * Não rotular dois ângulos do mesmo corte como antes e depois.
 * Não identificar um cliente como Glauber.
 *
 * Open Graph: `public/media/og.jpg` é um recorte real de foto02, sem distorção.
 */

export type LocaleText = { en: string; pt: string };

export type MediaImage = {
  src: string;
  width: number;
  height: number;
  alt: LocaleText;
  /** cover recorta sem distorcer; contain mostra o arquivo inteiro. */
  fit?: "cover" | "contain";
  /** Posição do recorte quando fit é cover. Ex.: "center top". */
  position?: string;
};

export type GalleryItem = MediaImage & {
  category?: "haircut" | "fade" | "beard" | "freestyle" | "kids";
};

export type MediaVideo = {
  src: string;
  width: number;
  height: number;
  poster?: string;
  type?: string;
  alt: LocaleText;
};

const portrait = { width: 768, height: 1024 };

export const media: {
  logo: MediaImage | null;
  hero: MediaImage | null;
  about: MediaImage | null;
  gallery: GalleryItem[];
  videos: MediaVideo[];
} = {
  logo: {
    src: "/media/logo.png",
    width: 1125,
    height: 328,
    alt: {
      en: "Glauber Barber",
      pt: "Glauber Barber",
    },
  },
  hero: {
    src: "/media/foto02.jpeg",
    ...portrait,
    fit: "contain",
    position: "center center",
    alt: {
      en: "A high fade with a full beard, seen in profile.",
      pt: "Fade alto com barba cheia, visto de perfil.",
    },
  },
  about: null,
  gallery: [
    {
      src: "/media/foto09.jpeg",
      ...portrait,
      category: "freestyle",
      alt: {
        en: "A fade with a curved shaved line on the side.",
        pt: "Fade com um risco curvo raspado na lateral.",
      },
    },
    {
      src: "/media/foto05.jpeg",
      ...portrait,
      category: "kids",
      alt: {
        en: "A child's haircut with a short fade and longer hair on top.",
        pt: "Corte infantil com fade curto e cabelo mais comprido no topo.",
      },
    },
    {
      src: "/media/foto01.jpeg",
      ...portrait,
      category: "beard",
      alt: {
        en: "A trimmed beard and goatee, photographed from the side in the barber chair.",
        pt: "Barba e cavanhaque aparados, fotografados de lado na cadeira.",
      },
    },
    {
      src: "/media/foto07.jpeg",
      ...portrait,
      category: "haircut",
      alt: {
        en: "A short men's haircut with a gradual taper and textured hair on top.",
        pt: "Corte masculino curto, com degradê gradual e textura no topo.",
      },
    },
    {
      src: "/media/foto03.jpeg",
      ...portrait,
      category: "fade",
      alt: {
        en: "A curly crop with a skin fade and a shaved part line.",
        pt: "Corte cacheado com fade na pele e risco no partido.",
      },
    },
    {
      src: "/media/foto06.jpeg",
      ...portrait,
      category: "kids",
      alt: {
        en: "Another angle of a child's haircut, with a short fade and longer hair on top.",
        pt: "Outro ângulo do corte infantil, com fade curto e cabelo mais comprido no topo.",
      },
    },
    {
      src: "/media/foto02.jpeg",
      ...portrait,
      category: "fade",
      alt: {
        en: "A high fade with a full beard, seen in profile.",
        pt: "Fade alto com barba cheia, visto de perfil.",
      },
    },
    {
      src: "/media/foto04.jpeg",
      ...portrait,
      category: "fade",
      alt: {
        en: "Another angle of a curly crop with a skin fade and a shaved part line.",
        pt: "Outro ângulo do corte cacheado, com fade na pele e risco no partido.",
      },
    },
    {
      src: "/media/foto08.jpeg",
      ...portrait,
      category: "haircut",
      alt: {
        en: "Another angle of a short men's haircut with a gradual taper.",
        pt: "Outro ângulo do corte masculino curto, com degradê gradual.",
      },
    },
  ],
  videos: [
    {
      src: "/media/video01.mp4",
      poster: "/media/video01-poster.jpg",
      width: 464,
      height: 832,
      type: "video/mp4",
      alt: {
        en: "A fade seen up close, from the blend above the ear to the back of the head.",
        pt: "Um fade visto de perto, da transição acima da orelha até a nuca.",
      },
    },
    {
      src: "/media/video02.mp4",
      poster: "/media/video02-poster.jpg",
      width: 464,
      height: 832,
      type: "video/mp4",
      alt: {
        en: "A finished fade in profile, including a close look at the blend.",
        pt: "Um fade pronto de perfil, com um detalhe da transição.",
      },
    },
    {
      src: "/media/video03.mp4",
      poster: "/media/video03-poster.jpg",
      width: 464,
      height: 832,
      type: "video/mp4",
      alt: {
        en: "A fade with a shaved design on the side, shown up close.",
        pt: "Um fade com desenho raspado na lateral, visto de perto.",
      },
    },
  ],
};
