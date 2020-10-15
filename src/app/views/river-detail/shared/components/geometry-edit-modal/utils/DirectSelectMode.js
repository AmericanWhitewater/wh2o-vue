import MapboxDraw from '@mapbox/mapbox-gl-draw'
import Constants from '@mapbox/mapbox-gl-draw/src/constants'
import { isOfMetaType } from '@mapbox/mapbox-gl-draw/src/lib/common_selectors'

const isVertex = isOfMetaType(Constants.meta.VERTEX)

export default {
  ...MapboxDraw.modes.direct_select,
  dragFeature (state, e, delta) {},
  onMouseMove (state, e) {
    // On mousemove that is not a drag, stop vertex movement.
    const onVertex = isVertex(e)
    const noCoords = state.selectedCoordPaths.length === 0
    // if (isFeature && noCoords) this.updateUIClasses({ mouse: Constants.cursors.MOVE });
    if (onVertex && !noCoords) this.updateUIClasses({ mouse: Constants.cursors.MOVE })
    else this.updateUIClasses({ mouse: Constants.cursors.NONE })
    this.stopDragging(state)

    // Skip render
    return true
  },
  // prevent it from leaving direct_select mode
  clickNoTarget () {},
  clickInactive () {}
}
