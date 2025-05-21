export type Materials =
  | 'Aetherium alloy'
  | 'Ancient vis'
  | 'Animal furs'
  | 'Armadylean yellow'
  | 'Blood of Orcus'
  | 'Cadmium red'
  | 'Carbon black'
  | 'Chaotic brimstone'
  | 'Cobalt blue'
  | 'Compass rose'
  | 'Demonhide'
  | 'Dragon metal'
  | 'Everlight silvthril'
  | 'Eye of Dagon'
  | 'Felt'
  | 'Fossilised bone'
  | 'Goldrune'
  | 'Hellfire metal'
  | 'Imperial steel'
  | 'Keramos'
  | 'Leather scraps'
  | 'Malachite green'
  | 'Mark of the Kyzaj'
  | 'Orgone'
  | 'Orthenglass'
  | 'Quintessence'
  | 'Samite silk'
  | 'Soapstone'
  | 'Star of Saradomin'
  | 'Stormguard steel'
  | 'Third-age iron'
  | 'Tyrian purple'
  | 'Vellum'
  | 'Vulcanised rubber'
  | 'Warforged bronze'
  | 'White marble'
  | 'White oak'
  | 'Wings of War'
  | "Yu'biusk clay"
  | 'Zarosian insignia';

export const MaterialsList: Materials[] = [
  'Aetherium alloy',
  'Ancient vis',
  'Animal furs',
  'Armadylean yellow',
  'Blood of Orcus',
  'Cadmium red',
  'Carbon black',
  'Chaotic brimstone',
  'Cobalt blue',
  'Compass rose',
  'Demonhide',
  'Dragon metal',
  'Everlight silvthril',
  'Eye of Dagon',
  'Felt',
  'Fossilised bone',
  'Goldrune',
  'Hellfire metal',
  'Imperial steel',
  'Keramos',
  'Leather scraps',
  'Malachite green',
  'Mark of the Kyzaj',
  'Orgone',
  'Orthenglass',
  'Quintessence',
  'Samite silk',
  'Soapstone',
  'Star of Saradomin',
  'Stormguard steel',
  'Third-age iron',
  'Tyrian purple',
  'Vellum',
  'Vulcanised rubber',
  'Warforged bronze',
  'White marble',
  'White oak',
  'Wings of War',
  "Yu'biusk clay",
  'Zarosian insignia',
];

export const MaterialsByType: { [key: string]: Materials[] } = {
  Agnostic: [
    'Third-age iron',
    'Samite silk',
    'White oak',
    'Goldrune',
    'Orthenglass',
    'Vellum',
    'Leather scraps',
    'Soapstone',
    'Animal furs',
    'Fossilised bone',
  ],
  Armadylean: [
    'Stormguard steel',
    'Wings of War',
    'Armadylean yellow',
    'Aetherium alloy',
    'Quintessence',
  ],
  Bandosian: [
    'Malachite green',
    'Mark of the Kyzaj',
    'Vulcanised rubber',
    'Warforged bronze',
    "Yu'biusk clay",
  ],
  Dragonkin: ['Dragon metal', 'Orgone', 'Compass rose', 'Carbon black', 'Felt'],
  Saradominist: [
    'Keramos',
    'White marble',
    'Cobalt blue',
    'Everlight silvthril',
    'Star of Saradomin',
  ],
  Zamorakian: [
    'Cadmium red',
    'Chaotic brimstone',
    'Demonhide',
    'Eye of Dagon',
    'Hellfire metal',
  ],
  Zarosian: [
    'Zarosian insignia',
    'Imperial steel',
    'Ancient vis',
    'Tyrian purple',
    'Blood of Orcus',
  ],
};
