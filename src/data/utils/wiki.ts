export const wiki = (query: string) => {
  window.open(`https://runescape.wiki/w/${query.replace(/ /g, '_')}`, '_blank');
};
