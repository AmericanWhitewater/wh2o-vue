import styles from '@mapbox/mapbox-gl-draw/src/lib/theme'

export default [
  // include default mapbox draw styleset
  ...styles,
  {
    id: 'basic-reach-line',
    type: 'line',
    filter: ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'LineString']
    ],
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-color': 'HSL(192, 61%, 35%)',
      'line-width': ['interpolate',
        ['linear'],
        ['zoom'],
        11, 3,
        15, 5
      ],
      'line-opacity': ['interpolate',
        ['linear'],
        ['zoom'],
        11, 1,
        15, 0.6
      ]
    }
  },
  {
    id: 'reach-start-style',
    type: 'circle',
    filter: ['all',
      ['==', '$type', 'Point'],
      ['==', 'meta', 'feature'],
      ['==', 'active', 'false'],
      ['==', 'id', 'reachStart']],
    paint: {
      'circle-radius': 7,
      'circle-color': 'hsl(120, 100%, 25%)',
      'circle-stroke-color': 'white',
      'circle-stroke-width': 0.75
    }
  },
  {
    id: 'reach-end-style',
    type: 'circle',
    filter: ['all',
      ['==', '$type', 'Point'],
      ['==', 'meta', 'feature'],
      ['==', 'active', 'false'],
      ['==', 'id', 'reachEnd']],
    paint: {
      'circle-radius': 7,
      'circle-color': 'hsl(0, 83%, 57%)',
      'circle-stroke-color': 'hsl(0, 0%, 100%)',
      'circle-stroke-width': 0.75
    }
  },
  {
    id: 'active-reach-start-style',
    type: 'circle',
    filter: ['all',
      ['==', '$type', 'Point'],
      ['==', 'meta', 'feature'],
      ['==', 'active', 'true'],
      ['==', 'id', 'reachStart']],
    paint: {
      'circle-radius': 5,
      'circle-color': 'hsl(120, 100%, 30%)',
      'circle-stroke-color': '#fbb03b',
      'circle-stroke-width': 2.5
    }
  },
  {
    id: 'active-reach-end-style',
    type: 'circle',
    filter: ['all',
      ['==', '$type', 'Point'],
      ['==', 'meta', 'feature'],
      ['==', 'active', 'true'],
      ['==', 'id', 'reachEnd']],
    paint: {
      'circle-radius': 5,
      'circle-color': 'hsl(0, 83%, 67%)',
      'circle-stroke-color': '#fbb03b',
      'circle-stroke-width': 2.5
    }
  }
]
