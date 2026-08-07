export enum DigsiteNames {
  Daemonheim = 'Daemonheim',
  Everlight = 'Everlight',
  KharidEt = 'Kharid-et',
  InfernalSource = 'Infernal Source',
  Orthen = 'Orthen',
  Senntisten = 'Senntisten',
  Stormguard = 'Stormguard Citadel',
  Warforge = 'Warforge',
  Moonrise = 'Moonrise',
}

export const Digsites: DigsiteInfo = {
  [DigsiteNames.Daemonheim]: {
    icon: '/assets/digsites/Daemonheim_digsite.png',
    backgroundColor: '#01706733',
    borderColor: '#017067',
    textColor: '#00e6c6',
    url: 'https://runescape.wiki/w/Daemonheim_Dig_Site',
  },
  [DigsiteNames.Everlight]: {
    icon: '/assets/digsites/Everlight_digsite.png',
    backgroundColor: '#0845A633',
    borderColor: '#0845A6',
    textColor: '#339cff',
    url: 'https://runescape.wiki/w/Everlight_Dig_Site',
  },
  [DigsiteNames.KharidEt]: {
    icon: '/assets/digsites/Kharid-et_digsite.png',
    backgroundColor: '#5F398633',
    borderColor: '#5F3986',
    textColor: '#a07cff',
    url: 'https://runescape.wiki/w/Kharid-et_Dig_Site',
  },
  [DigsiteNames.InfernalSource]: {
    icon: '/assets/digsites/Infernal_Source_digsite.png',
    backgroundColor: '#98010033',
    borderColor: '#980100',
    textColor: '#ff3c2e',
    url: 'https://runescape.wiki/w/Infernal_Source_Dig_Site',
  },
  [DigsiteNames.Warforge]: {
    icon: '/assets/digsites/Warforge_digsite.png',
    backgroundColor: '#cc580033',
    borderColor: '#cc5800',
    textColor: '#8cff1a',
    url: 'https://runescape.wiki/w/Warforge_Dig_Site',
  },
  [DigsiteNames.Senntisten]: {
    icon: '/assets/digsites/Senntisten_digsite.png',
    backgroundColor: '#3a09b533',
    borderColor: '#3a09b5',
    textColor: '#a86cff',
    url: 'https://runescape.wiki/w/Senntisten_Dig_Site',
  },
  [DigsiteNames.Stormguard]: {
    icon: '/assets/digsites/Stormguard_Citadel_digsite.png',
    backgroundColor: '#cfa71733',
    borderColor: '#cfa717',
    textColor: '#ffe066',
    url: 'https://runescape.wiki/w/Stormguard_Dig_Site',
  },
  [DigsiteNames.Orthen]: {
    icon: '/assets/digsites/Orthen_digsite.png',
    backgroundColor: '#85380133',
    borderColor: '#853801',
    textColor: '#ff8c1a',
    url: 'https://runescape.wiki/w/Orthen_Dig_Site',
  },
  [DigsiteNames.Moonrise]: {
    icon: '/assets/digsites/Moonrise_digsite.png',
    backgroundColor: '#58A33033',
    borderColor: '#58A330',
    textColor: '#95ff5c',
    url: 'https://runescape.wiki/w/Moonrise_Dig_Site',
  },
};

type DigsiteInfo = {
  [P in DigsiteNames]: {
    icon: string;
    backgroundColor: string;
    borderColor: string;
    textColor: string;
    url: string;
  };
};
