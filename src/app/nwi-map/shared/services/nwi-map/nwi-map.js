// import { httpClient } from "../../../../global/services";

// import { apiConstants } from "../../config";

const getUserLocation = () => {
  function showPosition(position) {
    const location = {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude
    };
    return location;
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);

    // console.log('Geo Location request triggered')
    alert(navigator.geolocation.getCurrentPosition(showPosition));
    return navigator.geolocation.getCurrentPosition(showPosition);
  }
};

export { getUserLocation };
