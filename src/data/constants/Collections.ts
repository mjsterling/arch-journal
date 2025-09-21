import { Artefact } from '../providers/ArtefactProvider';

export type Collection = {
  name: string;
  collector: string;
  image: string;
  shortName?: string;
  artefacts?: Artefact[];
  levelToComplete: number;
  isComplete?: boolean;
  reward?: {
    [key: string]: number | undefined;
  };
  recurringReward: {
    [key: string]: number | undefined;
  };
};

export const Collections = [
  {
    name: 'Anarchic Abstraction',
    collector: 'Art Critic Jacques',
    image: '/assets/collectors/Art_Critic_Jacques.png',
    shortName: 'Anarchic Abstr.',
    reward: {
      'Painting frame': 1,
      Chronotes: 1574,
    },
    recurringReward: {
      Chronotes: 1574,
    },
  },
  {
    name: 'Radiant Renaissance',
    collector: 'Art Critic Jacques',
    image: '/assets/collectors/Art_Critic_Jacques.png',
    shortName: 'Radiant Ren.',
    reward: {
      'Painting frame': 1,
      Chronotes: 2730,
    },
    recurringReward: {
      Chronotes: 2730,
    },
  },
  {
    name: 'Imperial Impressionism',
    collector: 'Art Critic Jacques',
    image: '/assets/collectors/Art_Critic_Jacques.png',
    shortName: 'Imperial Imp.',
    reward: {
      'Painting frame': 1,
      Chronotes: 2086,
    },
    recurringReward: {
      Chronotes: 2086,
    },
  },
  {
    name: 'Blingy Fings',
    collector: 'Chief Tess',
    image: '/assets/collectors/Chief_Tess.png',

    recurringReward: {
      'Robust glass': 20,
      Chronotes: 2484,
    },
  },
  {
    name: 'Smoky Fings',
    collector: 'Chief Tess',
    image: '/assets/collectors/Chief_Tess.png',
    recurringReward: {
      'Robust glass': 40,
      Chronotes: 2204,
    },
  },
  {
    name: 'Hitty Fings',
    collector: 'Chief Tess',
    image: '/assets/collectors/Chief_Tess.png',
    recurringReward: {
      'Robust glass': 40,
      Chronotes: 5136,
    },
  },
  {
    name: 'Showy Fings',
    collector: 'Chief Tess',
    image: '/assets/collectors/Chief_Tess.png',
    recurringReward: {
      'Robust glass': 40,
      Chronotes: 3158,
    },
  },
  {
    name: 'Finery of the Inquisition',
    collector: 'Eblis',
    image: '/assets/collectors/Eblis.png',
    shortName: 'Finery',
    reward: {
      'Elder Trove': 1,
      Chronotes: 1686,
    },
    recurringReward: {
      Chronotes: 1686,
    },
  },
  {
    name: 'Religious Iconography',
    collector: 'Eblis',
    image: '/assets/collectors/Eblis.png',
    shortName: 'Iconography',
    reward: {
      'Elder Trove': 1,
      Chronotes: 1686,
    },
    recurringReward: {
      Chronotes: 1686,
    },
  },
  {
    name: 'Urns of the Empire',
    collector: 'Eblis',
    image: '/assets/collectors/Eblis.png',
    shortName: 'Urns',

    recurringReward: {
      'Tetracompass piece': 1,
      Chronotes: 2820,
    },
  },
  {
    name: 'Entertaining the Masses',
    collector: 'Eblis',
    image: '/assets/collectors/Eblis.png',
    shortName: 'Entertaining',
    reward: {
      'Elder Trove': 1,
      Chronotes: 2302,
    },
    recurringReward: {
      Chronotes: 2302,
    },
  },
  {
    name: 'Imperial Sorcery',
    collector: 'Eblis',
    image: '/assets/collectors/Eblis.png',
    reward: {
      'Elder Trove': 1,
      Chronotes: 5742,
    },
    recurringReward: {
      Chronotes: 5742,
    },
  },
  {
    name: 'Red Rum Relics I',
    collector: 'General Bentnoze',
    image: '/assets/collectors/General_Bentnoze.png',
    shortName: 'Red Rum I',
    recurringReward: {
      'Tetracompass piece': 1,
      Chronotes: 2884,
    },
  },
  {
    name: 'Red Rum Relics II',
    collector: 'General Bentnoze',
    image: '/assets/collectors/General_Bentnoze.png',
    shortName: 'Red Rum II',
    recurringReward: {
      'Tetracompass piece': 1,
      Chronotes: 3468,
    },
  },
  {
    name: 'Red Rum Relics III',
    collector: 'General Bentnoze',
    image: '/assets/collectors/General_Bentnoze.png',
    shortName: 'Red Rum III',
    reward: {
      'Helm of Terror (inside)': 1,
      Chronotes: 4540,
    },
    recurringReward: {
      'Tetracompass piece': 1,
      Chronotes: 4540,
    },
  },
  {
    name: 'Green Gobbo Goodies I',
    collector: 'General Wartface',
    image: '/assets/collectors/General_Wartface.png',
    shortName: 'Green Gobbo I',
    recurringReward: {
      'Tetracompass piece': 1,
      Chronotes: 3252,
    },
  },
  {
    name: 'Green Gobbo Goodies II',
    collector: 'General Wartface',
    image: '/assets/collectors/General_Wartface.png',
    shortName: 'Green Gobbo II',
    recurringReward: {
      'Tetracompass piece': 1,
      Chronotes: 3758,
    },
  },
  {
    name: 'Green Gobbo Goodies III',
    collector: 'General Wartface',
    image: '/assets/collectors/General_Wartface.png',
    shortName: 'Green Gobbo III',
    reward: {
      'Helm of Terror (outside)': 1,
      Chronotes: 6044,
    },
    recurringReward: {
      'Tetracompass piece': 1,
      Chronotes: 6044,
    },
  },
  {
    name: 'Desperate for Artefacts',
    collector: 'Giles',
    image: '/assets/collectors/Giles.png',
    reward: {
      'Cosmic pyramid': 1,
      Chronotes: 1335,
    },
    recurringReward: {},
  },
  {
    name: 'Zamorakian I',
    collector: 'Isaura',
    image: '/assets/collectors/Isaura.png',
    reward: {
      'Abyssal thread': 1,
      Chronotes: 2594,
    },
    recurringReward: {
      Chronotes: 2594,
    },
  },
  {
    name: 'Zamorakian II',
    collector: 'Isaura',
    image: '/assets/collectors/Isaura.png',
    recurringReward: {
      'Tetracompass piece': 1,
      Chronotes: 5146,
    },
  },
  {
    name: 'Zamorakian III',
    collector: 'Isaura',
    image: '/assets/collectors/Isaura.png',
    recurringReward: {
      'Tetracompass piece': 1,
      Chronotes: 6608,
    },
  },
  {
    name: 'Zamorakian IV',
    collector: 'Isaura',
    image: '/assets/collectors/Isaura.png',
    reward: {
      "Ariadne's Diadem": 1,
      Chronotes: 5434,
    },
    recurringReward: {
      'Tetracompass piece': 1,
      Chronotes: 5434,
    },
  },
  {
    name: 'Armadylean I',
    collector: 'Lowse',
    image: '/assets/collectors/Lowse.png',
    reward: {
      "King Oberon's moonshroom spores": 1,
      Chronotes: 5688,
    },
    recurringReward: {
      "Torn blueprint fragments (Howl's workshop)": 50,
      Chronotes: 5688,
    },
  },
  {
    name: 'Armadylean II',
    collector: 'Lowse',
    image: '/assets/collectors/Lowse.png',
    recurringReward: {
      "Torn blueprint fragments (Howl's workshop)": 75,
      Chronotes: 6068,
    },
  },
  {
    name: 'Armadylean III',
    collector: 'Lowse',
    image: '/assets/collectors/Lowse.png',
    recurringReward: {
      "Torn blueprint fragments (Howl's workshop)": 150,
      Chronotes: 10468,
    },
  },
  {
    name: 'Dragonkin I',
    collector: 'Sharrigan',
    image: '/assets/collectors/Sharrigan.png',
    recurringReward: {
      'Anachronia resource pack': 6,
      Chronotes: 5524,
    },
  },
  {
    name: 'Dragonkin II',
    collector: 'Sharrigan',
    image: '/assets/collectors/Sharrigan.png',
    recurringReward: {
      'Rex skeleton fragments': 75,
      Chronotes: 3444,
    },
  },
  {
    name: 'Dragonkin III',
    collector: 'Sharrigan',
    image: '/assets/collectors/Sharrigan.png',
    reward: {
      Kaladanda: 1,
      Chronotes: 4652,
    },
    recurringReward: {
      Chronotes: 4652,
    },
  },
  {
    name: 'Dragonkin IV',
    collector: 'Sharrigan',
    image: '/assets/collectors/Sharrigan.png',
    recurringReward: {
      'Rex skeleton fragments': 150,
      Chronotes: 6980,
    },
  },
  {
    name: 'Dragonkin V',
    collector: 'Sharrigan',
    image: '/assets/collectors/Sharrigan.png',
    recurringReward: {
      'Large dungeoneering token box': 2,
      Chronotes: 2532,
    },
  },
  {
    name: 'Dragonkin VI',
    collector: 'Sharrigan',
    image: '/assets/collectors/Sharrigan.png',
    recurringReward: {
      'Large dungeoneering token box': 2,
      'Dungeoneering Wildcard': 1,
      Chronotes: 4056,
    },
  },
  {
    name: 'Dragonkin VII',
    collector: 'Sharrigan',
    image: '/assets/collectors/Sharrigan.png',
    recurringReward: {
      'Tetracompass piece': 1,
      Chronotes: 5772,
    },
  },
  {
    name: 'Saradominist I',
    collector: 'Sir Atcha',
    image: '/assets/collectors/Sir_Atcha.png',
    reward: {
      'Lock of hair': 1,
      Chronotes: 3998,
    },
    recurringReward: {
      Chronotes: 3998,
    },
  },
  {
    name: 'Saradominist II',
    collector: 'Sir Atcha',
    image: '/assets/collectors/Sir_Atcha.png',
    recurringReward: {
      'Tetracompass piece': 1,
      Chronotes: 5202,
    },
  },
  {
    name: 'Saradominist III',
    collector: 'Sir Atcha',
    image: '/assets/collectors/Sir_Atcha.png',
    recurringReward: {
      'Tetracompass piece': 1,
      Chronotes: 4548,
    },
  },
  {
    name: 'Saradominist IV',
    collector: 'Sir Atcha',
    image: '/assets/collectors/Sir_Atcha.png',
    reward: {
      Petasos: 1,
      Chronotes: 7022,
    },
    recurringReward: {
      'Tetracompass piece': 1,
      Chronotes: 7022,
    },
  },
  {
    name: 'Zarosian I',
    collector: 'Soran',
    image: '/assets/collectors/Soran.png',
    reward: {
      'Seal of the Praefectus Praetorio': 1,
      Chronotes: 2108,
    },
    recurringReward: {
      'Pylon battery': 20,
      Chronotes: 2108,
    },
  },
  {
    name: 'Zarosian II',
    collector: 'Soran',
    image: '/assets/collectors/Soran.png',
    recurringReward: {
      'Pylon battery': 50,
      Chronotes: 5732,
    },
  },
  {
    name: 'Zarosian III',
    collector: 'Soran',
    image: '/assets/collectors/Soran.png',
    recurringReward: {
      'Pylon battery': 100,
      Chronotes: 7442,
    },
  },
  {
    name: 'Zarosian IV',
    collector: 'Soran',
    image: '/assets/collectors/Soran.png',
    recurringReward: {
      'Pylon battery': 100,
      Chronotes: 6810,
    },
  },

  {
    name: 'Museum - Armadylean I',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Armadyl I',
    recurringReward: {
      Chronotes: 7110,
    },
  },
  {
    name: 'Museum - Armadylean II',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Armadyl II',
    recurringReward: {
      Chronotes: 7585,
    },
  },
  {
    name: 'Museum - Armadylean III',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Armadyl III',
    recurringReward: {
      Chronotes: 13085,
    },
  },

  {
    name: 'Museum - Bandosian I',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Bandos I',
    recurringReward: {
      Chronotes: 8445,
    },
  },
  {
    name: 'Museum - Bandosian II',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Bandos II',
    recurringReward: {
      Chronotes: 8057,
    },
  },
  {
    name: 'Museum - Bandosian III',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Bandos III',
    recurringReward: {
      Chronotes: 11925,
    },
  },

  {
    name: 'Museum - Dragonkin I',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Dragonkin I',
    recurringReward: {
      Chronotes: 6905,
    },
  },
  {
    name: 'Museum - Dragonkin II',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Dragonkin II',
    recurringReward: {
      Chronotes: 4305,
    },
  },
  {
    name: 'Museum - Dragonkin III',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Dragonkin III',
    recurringReward: {
      Chronotes: 5815,
    },
  },
  {
    name: 'Museum - Dragonkin IV',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Dragonkin IV',
    recurringReward: {
      Chronotes: 8725,
    },
  },
  {
    name: 'Museum - Dragonkin V',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Dragonkin V',
    recurringReward: {
      Chronotes: 3165,
    },
  },
  {
    name: 'Museum - Dragonkin VI',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Dragonkin VI',
    recurringReward: {
      Chronotes: 5070,
    },
  },
  {
    name: 'Museum - Dragonkin VII',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Dragonkin VII',
    recurringReward: {
      Chronotes: 7215,
    },
  },

  {
    name: 'Museum - Saradominist I',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Saradomin I',
    recurringReward: {
      Chronotes: 4997,
    },
  },
  {
    name: 'Museum - Saradominist II',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Saradomin II',
    recurringReward: {
      Chronotes: 6502,
    },
  },
  {
    name: 'Museum - Saradominist III',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Saradomin III',
    recurringReward: {
      Chronotes: 5685,
    },
  },
  {
    name: 'Museum - Saradominist IV',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Saradomin IV',
    recurringReward: {
      Chronotes: 8777,
    },
  },

  {
    name: 'Museum - Zamorakian I',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Zamorak I',
    recurringReward: {
      Chronotes: 3242,
    },
  },
  {
    name: 'Museum - Zamorakian II',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Zamorak II',
    recurringReward: {
      Chronotes: 6432,
    },
  },
  {
    name: 'Museum - Zamorakian III',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Zamorak III',
    recurringReward: {
      Chronotes: 8260,
    },
  },
  {
    name: 'Museum - Zamorakian IV',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Zamorak IV',
    recurringReward: {
      Chronotes: 6792,
    },
  },

  {
    name: 'Museum - Zarosian I',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Zaros I',
    recurringReward: {
      Chronotes: 2635,
    },
  },
  {
    name: 'Museum - Zarosian II',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Zaros II',
    recurringReward: {
      Chronotes: 7165,
    },
  },
  {
    name: 'Museum - Zarosian III',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Zaros III',
    recurringReward: {
      Chronotes: 9302,
    },
  },
  {
    name: 'Museum - Zarosian IV',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Zaros IV',
    recurringReward: {
      Chronotes: 8512,
    },
  },
  {
    name: 'Museum - Zarosian V',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Zaros V',
    recurringReward: {
      Chronotes: 4117,
    },
  },
  {
    name: 'Museum - Zarosian VI',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Zaros VI',
    recurringReward: {
      Chronotes: 4207,
    },
  },
  {
    name: 'Museum - Zarosian VII',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Zaros VII',
    recurringReward: {
      Chronotes: 4357,
    },
  },
  {
    name: 'Wise Am the Music Man',
    collector: 'Wise Old Man',
    image: '/assets/collectors/Wise_Old_Man.png',
    shortName: 'Wise Am',
    reward: {
      "Koschei's needle": 1,
      Chronotes: 4024,
    },
    recurringReward: {
      Chronotes: 4024,
    },
  },
  {
    name: 'Hat Problem',
    collector: 'Wise Old Man',
    image: '/assets/collectors/Wise_Old_Man.png',
    recurringReward: {
      Chronotes: 6775,
    },
  },
  {
    name: 'Hat Hoarder',
    collector: 'Wise Old Man',
    image: '/assets/collectors/Wise_Old_Man.png',
    recurringReward: {
      Chronotes: 5995,
    },
  },
  {
    name: 'Magic Man',
    collector: 'Wise Old Man',
    image: '/assets/collectors/Wise_Old_Man.png',
    recurringReward: {
      Chronotes: 8600,
    },
  },
  {
    name: 'Knowledge is Power',
    collector: 'Wise Old Man',
    image: '/assets/collectors/Wise_Old_Man.png',
    shortName: 'Knowledge',
    reward: {
      "Amascut's Enchanted Gem": 1,
      Chronotes: 5584,
    },
    recurringReward: {
      Chronotes: 5584,
    },
  },
];

export type CollectionNames = (typeof Collections)[number]['name'];
