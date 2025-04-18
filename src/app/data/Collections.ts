import { Artefact } from './ArtefactProvider';

export type Collection = {
  name: string;
  collector: string;
  image: string;
  shortName?: string;
  artefacts?: Artefact[];
  levelToComplete?: number;
};

export const Collections = [
  {
    name: 'Anarchic Abstraction',
    collector: 'Art Critic Jacques',
    image: '/assets/collectors/Art_Critic_Jacques.png',
    shortName: 'Anarchic Abstr.',
  },
  {
    name: 'Radiant Renaissance',
    collector: 'Art Critic Jacques',
    image: '/assets/collectors/Art_Critic_Jacques.png',
    shortName: 'Radiant Ren.',
  },
  {
    name: 'Imperial Impressionism',
    collector: 'Art Critic Jacques',
    image: '/assets/collectors/Art_Critic_Jacques.png',
    shortName: 'Imperial Imp.',
  },
  {
    name: 'Blingy Fings',
    collector: 'Chief Tess',
    image: '/assets/collectors/Chief_Tess.png',
  },
  {
    name: 'Smoky Fings',
    collector: 'Chief Tess',
    image: '/assets/collectors/Chief_Tess.png',
  },
  {
    name: 'Hitty Fings',
    collector: 'Chief Tess',
    image: '/assets/collectors/Chief_Tess.png',
  },
  {
    name: 'Showy Fings',
    collector: 'Chief Tess',
    image: '/assets/collectors/Chief_Tess.png',
  },
  {
    name: 'Finery of the Inquisition',
    collector: 'Eblis',
    image: '/assets/collectors/Eblis.png',
    shortName: 'Finery',
  },
  {
    name: 'Religious Iconography',
    collector: 'Eblis',
    image: '/assets/collectors/Eblis.png',
    shortName: 'Iconography',
  },
  {
    name: 'Urns of the Empire',
    collector: 'Eblis',
    image: '/assets/collectors/Eblis.png',
    shortName: 'Urns',
  },
  {
    name: 'Entertaining the Masses',
    collector: 'Eblis',
    image: '/assets/collectors/Eblis.png',
    shortName: 'Entertaining',
  },
  {
    name: 'Imperial Sorcery',
    collector: 'Eblis',
    image: '/assets/collectors/Eblis.png',
  },
  {
    name: 'Red Rum Relics I',
    collector: 'General Bentnoze',
    image: '/assets/collectors/General_Bentnoze.png',
    shortName: 'Red Rum I',
  },
  {
    name: 'Red Rum Relics II',
    collector: 'General Bentnoze',
    image: '/assets/collectors/General_Bentnoze.png',
    shortName: 'Red Rum II',
  },
  {
    name: 'Red Rum Relics III',
    collector: 'General Bentnoze',
    image: '/assets/collectors/General_Bentnoze.png',
    shortName: 'Red Rum III',
  },
  {
    name: 'Green Gobbo Goodies I',
    collector: 'General Wartface',
    image: '/assets/collectors/General_Wartface.png',
    shortName: 'Green Gobbo I',
  },
  {
    name: 'Green Gobbo Goodies II',
    collector: 'General Wartface',
    image: '/assets/collectors/General_Wartface.png',
    shortName: 'Green Gobbo II',
  },
  {
    name: 'Green Gobbo Goodies III',
    collector: 'General Wartface',
    image: '/assets/collectors/General_Wartface.png',
    shortName: 'Green Gobbo III',
  },
  {
    name: 'Desperate for Artefacts',
    collector: 'Giles',
    image: '/assets/collectors/Giles.png',
  },
  {
    name: 'Zamorakian I',
    collector: 'Isaura',
    image: '/assets/collectors/Isaura.png',
  },
  {
    name: 'Zamorakian II',
    collector: 'Isaura',
    image: '/assets/collectors/Isaura.png',
  },
  {
    name: 'Zamorakian III',
    collector: 'Isaura',
    image: '/assets/collectors/Isaura.png',
  },
  {
    name: 'Zamorakian IV',
    collector: 'Isaura',
    image: '/assets/collectors/Isaura.png',
  },
  {
    name: 'Armadylean I',
    collector: 'Lowse',
    image: '/assets/collectors/Lowse.png',
  },
  {
    name: 'Armadylean II',
    collector: 'Lowse',
    image: '/assets/collectors/Lowse.png',
  },
  {
    name: 'Armadylean III',
    collector: 'Lowse',
    image: '/assets/collectors/Lowse.png',
  },
  {
    name: 'Dragonkin I',
    collector: 'Sharrigan',
    image: '/assets/collectors/Sharrigan.png',
  },
  {
    name: 'Dragonkin II',
    collector: 'Sharrigan',
    image: '/assets/collectors/Sharrigan.png',
  },
  {
    name: 'Dragonkin III',
    collector: 'Sharrigan',
    image: '/assets/collectors/Sharrigan.png',
  },
  {
    name: 'Dragonkin IV',
    collector: 'Sharrigan',
    image: '/assets/collectors/Sharrigan.png',
  },
  {
    name: 'Dragonkin V',
    collector: 'Sharrigan',
    image: '/assets/collectors/Sharrigan.png',
  },
  {
    name: 'Dragonkin VI',
    collector: 'Sharrigan',
    image: '/assets/collectors/Sharrigan.png',
  },
  {
    name: 'Dragonkin VII',
    collector: 'Sharrigan',
    image: '/assets/collectors/Sharrigan.png',
  },
  {
    name: 'Saradominist I',
    collector: 'Sir Atcha',
    image: '/assets/collectors/Sir_Atcha.png',
  },
  {
    name: 'Saradominist II',
    collector: 'Sir Atcha',
    image: '/assets/collectors/Sir_Atcha.png',
  },
  {
    name: 'Saradominist III',
    collector: 'Sir Atcha',
    image: '/assets/collectors/Sir_Atcha.png',
  },
  {
    name: 'Saradominist IV',
    collector: 'Sir Atcha',
    image: '/assets/collectors/Sir_Atcha.png',
  },
  {
    name: 'Zarosian I',
    collector: 'Soran',
    image: '/assets/collectors/Soran.png',
  },
  {
    name: 'Zarosian II',
    collector: 'Soran',
    image: '/assets/collectors/Soran.png',
  },
  {
    name: 'Zarosian III',
    collector: 'Soran',
    image: '/assets/collectors/Soran.png',
  },
  {
    name: 'Zarosian IV',
    collector: 'Soran',
    image: '/assets/collectors/Soran.png',
  },

  {
    name: 'Museum - Armadylean I',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Armadyl I',
  },
  {
    name: 'Museum - Armadylean II',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Armadyl II',
  },
  {
    name: 'Museum - Armadylean III',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Armadyl III',
  },

  {
    name: 'Museum - Bandosian I',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Bandos I',
  },
  {
    name: 'Museum - Bandosian II',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Bandos II',
  },
  {
    name: 'Museum - Bandosian III',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Bandos III',
  },

  {
    name: 'Museum - Dragonkin I',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Dragonkin I',
  },
  {
    name: 'Museum - Dragonkin II',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Dragonkin II',
  },
  {
    name: 'Museum - Dragonkin III',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Dragonkin III',
  },
  {
    name: 'Museum - Dragonkin IV',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Dragonkin IV',
  },
  {
    name: 'Museum - Dragonkin V',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Dragonkin V',
  },
  {
    name: 'Museum - Dragonkin VI',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Dragonkin VI',
  },
  {
    name: 'Museum - Dragonkin VII',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Dragonkin VII',
  },

  {
    name: 'Museum - Saradominist I',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Saradomin I',
  },
  {
    name: 'Museum - Saradominist II',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Saradomin II',
  },
  {
    name: 'Museum - Saradominist III',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Saradomin III',
  },
  {
    name: 'Museum - Saradominist IV',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Saradomin IV',
  },

  {
    name: 'Museum - Zamorakian I',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Zamorak I',
  },
  {
    name: 'Museum - Zamorakian II',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Zamorak II',
  },
  {
    name: 'Museum - Zamorakian III',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Zamorak III',
  },
  {
    name: 'Museum - Zamorakian IV',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Zamorak IV',
  },

  {
    name: 'Museum - Zarosian I',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Zaros I',
  },
  {
    name: 'Museum - Zarosian II',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Zaros II',
  },
  {
    name: 'Museum - Zarosian III',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Zaros III',
  },
  {
    name: 'Museum - Zarosian IV',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Zaros IV',
  },
  {
    name: 'Museum - Zarosian V',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Zaros V',
  },
  {
    name: 'Museum - Zarosian VI',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Zaros VI',
  },
  {
    name: 'Museum - Zarosian VII',
    collector: 'Velucia',
    image: '/assets/collectors/Velucia.png',
    shortName: 'M - Zaros VII',
  },
  {
    name: 'Wise Am the Music Man',
    collector: 'Wise Old Man',
    image: '/assets/collectors/Wise_Old_Man.png',
    shortName: 'Wise Am',
  },
  {
    name: 'Hat Problem',
    collector: 'Wise Old Man',
    image: '/assets/collectors/Wise_Old_Man.png',
  },
  {
    name: 'Hat Hoarder',
    collector: 'Wise Old Man',
    image: '/assets/collectors/Wise_Old_Man.png',
  },
  {
    name: 'Magic Man',
    collector: 'Wise Old Man',
    image: '/assets/collectors/Wise_Old_Man.png',
  },
  {
    name: 'Knowledge is Power',
    collector: 'Wise Old Man',
    image: '/assets/collectors/Wise_Old_Man.png',
    shortName: 'Knowledge',
  },
];

export type CollectionNames = (typeof Collections)[number]['name'];
