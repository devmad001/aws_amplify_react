export const iconLayerOptions = {
  pickable: true,
  iconMapping: {
    marker: {
      x: 0, y: 0, width: 35, height: 35, mask: true,
    },
  },
  getIcon: () => 'marker',
  getColor: [ 255, 5, 5, 255 ],
  sizeScale: 1,
  getSize: () => 35,
  getPosition: d => d.coordinates,
};

export const textLayerOptions = {
  pickable: true,
  fontWeight: 'bold',
  getSize: 16,
  getColor: [ 255, 255, 255, 255 ],
  getAngle: 0,
  getTextAnchor: 'middle',
  getAlignmentBaseline: 'center',
  getPosition: d => d.coordinates,
  getText: d => d.value,
};
