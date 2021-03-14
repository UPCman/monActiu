export enum Language {
  SPANISH = 'es-es',
  CATALAN = 'ca-es',
}

export namespace Language {
  export function keys () {
    return Object.keys(Language).filter ((key: string) => key !== 'keys');
  }
}

export function getLanguage (language: string) {
  switch (language) {
    case 'es-es':
      return Language.SPANISH;
    case 'ca-es':
      return Language.CATALAN;
  }
}

export enum MainRoute {
  HOME = '',
  ABOUT = 'about',
  TREATMENTS = 'treatments',
  FACILITIES = 'facilities',
  CONTACT = 'contact',
  PRICING = 'pricing'
}


