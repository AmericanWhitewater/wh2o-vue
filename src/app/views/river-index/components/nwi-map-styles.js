export default {
  sourceLayers: {
    projects: {
      projects: {
        type: 'symbol',
        minzoom: 11,
        layout: {
          'text-field': ['concat', 'AW Project: ', ['get', 'name']],
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Regular'],
          'text-size': ['interpolate', ['linear'], ['zoom'], 13, 15, 18, 20],
          'text-line-height': 1,
          'text-max-width': 17.5,
          'text-justify': 'left',
          'text-anchor': 'top',
          'text-offset': [0, -3],
          'symbol-sort-key': 100
        },
        paint: {
          'text-color': '#fff',
          'text-halo-color': '#333',
          'text-halo-width': 1,
          'text-halo-blur': 1
        }
      },
      projectIcons: {
        minzoom: 8,
        maxzoom: 11,
        type: 'symbol',
        layout: {
          'icon-image': 'information-15',
          'icon-offset': [-25, -5],
          'icon-ignore-placement': true
        },
        paint: {}
      }
    },
    'reaches-without-geom': {
      reachesWithoutGeom: {
        layout: {},
        type: 'circle',
        paint: {
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            8,
            2,
            11,
            6
          ],
          'circle-color': 'white',
          'circle-stroke-opacity': 1,
          'circle-opacity': 1,
          'circle-stroke-color': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            'white', 'green'],
          'circle-stroke-width': [
            'interpolate',
            ['linear'],
            ['zoom'],
            8,
            ['case',
              ['boolean', ['feature-state', 'hover'], false],
              3, 1],
            11,
            ['case',
              ['boolean', ['feature-state', 'hover'], false],
              4, 1]
          ]
        }
      },
      reachesWithoutGeomLabels: {
        type: 'symbol',
        minzoom: 11,
        layout: {
          'text-field': ['concat', ['get', 'river'], ':\n', ['get', 'section']],
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Regular'],
          'text-size': ['interpolate', ['linear'], ['zoom'], 13, 15, 18, 20],
          'text-line-height': 1,
          'text-max-width': 17.5,
          'text-justify': 'left',
          'text-anchor': 'top',
          'text-offset': [0, 0.5],
          'symbol-sort-key': 10
        },
        paint: {
          'text-color': '#fff',
          'text-halo-color': '#333',
          'text-halo-width': 1,
          'text-halo-blur': 1,
          'text-opacity': 1
        }
      }
    },
    'reach-segment-labels': {
      reachClass: {
        type: 'symbol',
        minzoom: 8,
        layout: {
          'text-field': ['to-string', ['get', 'class']],
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Regular'],
          'text-size': 10,
          'icon-ignore-placement': true,
          'icon-image': [
            'match',
            ['length', ['get', 'class']],
            1,
            'default-2',
            2,
            'default-2',
            3,
            'default-3',
            4,
            'default-4',
            5,
            'default-4',
            6,
            'default-5',
            7,
            'default-5',
            8,
            'default-5',
            'default-6'
          ],
          'icon-rotation-alignment': 'viewport',
          'text-offset': [0, -0.5],
          'text-rotation-alignment': 'viewport',
          'icon-offset': [0, -5]
        },
        paint: {
          'icon-opacity': ['interpolate', ['linear'], ['zoom'], 8, 0.8, 9, 1]
        }
      },
      reachSegmentLabels: {
        type: 'symbol',
        minzoom: 11,
        layout: {
          'text-field': ['concat', ['get', 'river'], ':\n', ['get', 'section']],
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Regular'],
          'text-size': ['interpolate', ['linear'], ['zoom'], 13, 15, 18, 20],
          'text-line-height': 1,
          'text-max-width': 17.5,
          'text-justify': 'left',
          'text-anchor': 'top',
          'text-offset': [0, 0.5],
          'symbol-sort-key': 10
        },
        paint: {
          'text-color': '#fff',
          'text-halo-color': '#333',
          'text-halo-width': 1,
          'text-halo-blur': 1
        }
      }
    },
    rapids: {
      rapids: {
        type: 'symbol',
        layout: {
          'text-field': [
            'case',
            [
              'all',
              ['has', 'difficulty'],
              ['!=', ['get', 'difficulty'], 'N/A']
            ],
            ['concat', ['get', 'name'], ' (', ['get', 'difficulty'], ')'],
            ['get', 'name']
          ],
          'text-font': ['DIN Offc Pro Regular', 'Arial Unicode MS Regular'],
          'text-size': 14,
          'icon-image': [
            'case',
            ['match', ['get', 'access'], [1], true, false],
            'slipway-11',
            ['match', ['get', 'hazard'], [1], true, false],
            'level-crossing',
            ['match', ['get', 'playspot'], [1], true, false],
            'secchi-16',
            ['match', ['get', 'portage'], [1], true, false],
            'pitch-11',
            ['match', ['get', 'putin'], [1], true, false],
            'rocket-11',
            ['match', ['get', 'takeout'], [1], true, false],
            'shoe-11',
            ['match', ['get', 'waterfall'], [1], true, false],
            'waterfall-11',
            'viewpoint-15'
          ],
          'text-justify': 'left',
          'text-anchor': 'left',
          'text-offset': [0.75, 0],
          'icon-offset': [-12, 0]
        },
        paint: {
          'text-halo-width': 1,
          'text-halo-blur': 0.5,
          'text-color': '#fff',
          'text-halo-color': '#333'
        }
      }
    },
    access: {
      access: {
        layout: {},
        type: 'circle',
        paint: {
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            8,
            ['match', ['get', 'type'], 'put-in', 3, 2.5],
            11,
            ['match', ['get', 'type'], 'put-in', 7, 5]
          ],
          'circle-color': [
            'match',
            ['get', 'type'],
            'take-out',
            'hsl(0, 83%, 57%)',
            'white'
          ],
          'circle-stroke-color': [
            'match',
            ['get', 'type'],
            'put-in',
            'green',
            'hsl(0, 0%, 100%)'
          ],
          'circle-stroke-width': [
            'interpolate',
            ['linear'],
            ['zoom'],
            8,
            ['match', ['get', 'type'], ['put-in'], 1, 0.75],
            11,
            ['match', ['get', 'type'], ['put-in'], 2, 1.5]
          ]
        }
      }
    },
    'reach-segments': {
      reachSegments: {
        type: 'line',
        layout: { 'line-join': 'round' },
        paint: {
          'line-color': 'hsl(209, 30%, 46%)',
          'line-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            13,
            1,
            13.5,
            0.75
          ],
          'line-width': [
            'interpolate',
            ['linear'],
            ['zoom'],
            8,
            1,
            13.75,
            5,
            14,
            1.5
          ]
        }
      },
      reachSegmentDashes: {
        type: 'line',
        minzoom: 13,
        layout: { 'line-join': 'round' },
        paint: {
          'line-color': '#53789a',
          'line-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            13,
            0,
            14,
            0.75
          ],
          'line-width': ['interpolate', ['linear'], ['zoom'], 13, 1.5, 18, 3],
          'line-dasharray': [5, 5]
        }
      },
      reachSegmentTapArea: {
        type: 'line',
        layout: { 'line-join': 'round' },
        paint: {
          'line-width': ['interpolate', ['linear'], ['zoom'], 8, 5, 13.75, 25],
          'line-color': 'hsl(63, 96%, 55%)',
          'line-opacity': 0
        }
      },
      activeReachSegmentCasing: {
        type: 'line',
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          'line-gap-width': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0,
            0.5,
            13.5,
            0.5
          ],
          'line-color': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0,
            'hsl(0, 0%, 100%)',
            10,
            '#fff',
            14,
            'hsl(220, 19%, 78%)'
          ],
          'line-width': ['interpolate', ['linear'], ['zoom'], 8, 1.25, 14, 6],
          'line-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            1, 0],
          'line-blur': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0,
            0,
            13.75,
            0,
            14,
            2
          ]
        }
      }
    }
  },
  colorSchemes: {
    difficulty: {
      'I-II+': 'green',
      'III-III+': 'blue',
      'IV-IV+': 'black',
      'V-V+': 'red'
    },
    currentFlow: {
      unknown: '#f5f5f5',
      low: '#ff8684',
      running: '#59e68d',
      'too high': '#5dace1'
    }
  }
}
