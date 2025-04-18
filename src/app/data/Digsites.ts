export enum DigsiteNames {
  Daemonheim = 'Daemonheim',
  Everlight = 'Everlight',
  KharidEt = 'Kharid-et',
  InfernalSource = 'Infernal Source',
  Orthen = 'Orthen',
  Senntisten = 'Senntisten',
  Stormguard = 'Stormguard Citadel',
  Warforge = 'Warforge',
}

export const Digsites: DigsiteInfo = {
  [DigsiteNames.Daemonheim]: {
    icon: '/assets/digsites/Daemonheim.png',
    backgroundColor: '#A3A3A377',
    url: 'https://runescape.wiki/w/Daemonheim_Dig_Site',
  },
  [DigsiteNames.Everlight]: {
    icon: '/assets/digsites/Everlight.png',
    backgroundColor: '#08659699',
    url: 'https://runescape.wiki/w/Everlight_Dig_Site',
  },
  [DigsiteNames.KharidEt]: {
    icon: '/assets/digsites/Kharid-et.png',
    backgroundColor: '#5F3986CC',
    url: 'https://runescape.wiki/w/Kharid-et_Dig_Site',
  },
  [DigsiteNames.InfernalSource]: {
    icon: '/assets/digsites/Infernal_Source.png',
    backgroundColor: '#980100AA',
    url: 'https://runescape.wiki/w/Infernal_Source_Dig_Site',
  },
  [DigsiteNames.Warforge]: {
    icon: '/assets/digsites/Warforge.png',
    backgroundColor: '#407d0aAA',
    url: 'https://runescape.wiki/w/Warforge_Dig_Site',
  },
  [DigsiteNames.Senntisten]: {
    icon: '/assets/digsites/Senntisten.png',
    backgroundColor: '#3a09b5AA',
    url: 'https://runescape.wiki/w/Senntisten_Dig_Site',
  },
  [DigsiteNames.Stormguard]: {
    icon: '/assets/digsites/Stormguard_Citadel.png',
    backgroundColor: '#cfa71777',
    url: 'https://runescape.wiki/w/Stormguard_Dig_Site',
  },
  [DigsiteNames.Orthen]: {
    icon: '/assets/digsites/Orthen.png',
    backgroundColor: '#85380177',
    url: 'https://runescape.wiki/w/Orthen_Dig_Site',
  },
};

type DigsiteInfo = {
  [P in DigsiteNames]: {
    icon: string;
    backgroundColor: string;
    url: string;
  };
};
