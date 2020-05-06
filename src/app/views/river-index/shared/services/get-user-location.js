
export function getUserLocation () {
  function showPosition (position) {
    const location = {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude
    }
    return location
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition)
    alert(navigator.geolocation.getCurrentPosition(showPosition))
    return navigator.geolocation.getCurrentPosition(showPosition)
  }
}
