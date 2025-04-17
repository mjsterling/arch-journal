export enum DigsiteNames {
  Daemonheim = 'Daemonheim',
  Everlight = 'Everlight',
  KharidEt = 'Kharid-et',
  InfernalSource = 'Infernal Source',
  Orthen = 'Orthen',
  Senntisten = 'Senntisten',
  Stormguard = 'Stormguard',
  Warforge = 'Warforge',
}

export const Digsites: DigsiteInfo = {
  [DigsiteNames.Daemonheim]: {
    icon: '/assets/digsites/daemonheim.png',
    backgroundColor: '#A3A3A333',
    url: 'https://runescape.wiki/w/Daemonheim_Dig_Site',
  },
  [DigsiteNames.Everlight]: {
    icon: '/assets/digsites/everlight.png',
    backgroundColor: '#121fcc33',
    url: 'https://runescape.wiki/w/Everlight_Dig_Site',
  },
  [DigsiteNames.KharidEt]: {
    icon: '/assets/digsites/kharid-et.png',
    backgroundColor: '#5F398644',
    url: 'https://runescape.wiki/w/Kharid-et_Dig_Site',
  },
  [DigsiteNames.InfernalSource]: {
    icon: '/assets/digsites/infernal-source.png',
    backgroundColor: '#98010033',
    url: 'https://runescape.wiki/w/Infernal_Source_Dig_Site',
  },
  [DigsiteNames.Warforge]: {
    icon: '/assets/digsites/warforge.png',
    backgroundColor: '#4B4B4B33',
    url: 'https://runescape.wiki/w/Warforge_Dig_Site',
  },
  [DigsiteNames.Senntisten]: {
    icon: '/assets/digsites/stormguard.png',
    backgroundColor: '#A3A3A333',
    url: 'https://runescape.wiki/w/Senntisten_Dig_Site',
  },
  [DigsiteNames.Stormguard]: {
    icon: '/assets/digsites/stormguard.png',
    backgroundColor: '#A3A3A333',
    url: 'https://runescape.wiki/w/Stormguard_Dig_Site',
  },
  [DigsiteNames.Orthen]: {
    icon: '/assets/digsites/orthen.png',
    backgroundColor: '#A3A3A333',
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
