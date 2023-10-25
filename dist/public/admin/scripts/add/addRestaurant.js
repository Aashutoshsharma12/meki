//list of explore
function exploreList() {
  $.ajax({
    url: host + '/api/v1/admin/explore/list',
    type: 'Get',
    contentType: 'application/json',
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', localStorage.token);
    },
    dataType: 'json',
    success: function (data, status) {
      if (data.code == 200) {
        var select = document.getElementById("exploreId");
        let exploreId = document.getElementById("exploreId1").value
        for (var i = 0; i < data.data.data.length; i++) {
          var option = document.createElement("option"),
            txt = document.createTextNode(data.data.data[i].name);
          option.appendChild(txt);
          option.setAttribute("value", data.data.data[i]._id);
          option.selected = data.data.data[i]._id === exploreId ? true : false
          select.insertBefore(option, select.lastChild);
        }
      } else {
        document.getElementById('table').innerHTML = ''
      }
    }
  });
}
//list of categories
function categoryList() {
  $.ajax({
    url: host + '/api/v1/admin/category/list',
    type: 'Get',
    contentType: 'application/json',
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', localStorage.token);
    },
    dataType: 'json',
    success: function (data, status) {
      if (data.code == 200) {
        var select = document.getElementById("catId");
        let catId = document.getElementById("catId1").value
        console.log(select, "lll")

        for (var i = 0; i < data.data.data.length; i++) {
          var option = document.createElement("option"),
            txt = document.createTextNode(data.data.data[i].name);
          option.appendChild(txt);
          option.setAttribute("value", data.data.data[i]._id);
          option.selected = data.data.data[i]._id === catId ? true : false
          select.insertBefore(option, select.lastChild);
        }
      } else {
        document.getElementById('table').innerHTML = ''
      }
    }
  });
}
//   function addRestaurant(){
//     window.location.replace('/admin/addRestaurant')
// }

//Google Api for Address
async function autocomplete() {
  address1Field = document.querySelector("#fullAddress1");
  autocomplete = await new google.maps.places.Autocomplete(address1Field, {
    fields: ["place_id", "address_components", "geometry", "icon", "name"],
    strictBounds: false,
    // types: ["establishment"],
  });
  address1Field.focus();
  autocomplete.addListener("place_changed", fillInAddress);
}
function fillInAddress() {
  const place = autocomplete.getPlace();
  document.getElementById('lat').value = place.geometry.location.lat();
  document.getElementById('long').value = place.geometry.location.lng();
  document.getElementById('googlePlaceId').value = place.place_id;
  initMap(place.geometry.location.lat(),place.geometry.location.lng());
  console.log(place,"place")
  let address1 = "";
  let postcode = "";
  for (const component of place.address_components) {
    console.log(document.getElementById('fullAddress1').value,"s;s;s;")
    document.getElementById('fullAddress').value = document.getElementById('fullAddress1').value
    const componentType = component.types[0];
    switch (componentType) {
      case "postal_code":
        {
          postcode = `${component.long_name}${postcode}`;
          break;
        }
      case "locality":
        for (let i = 0; i < place.address_components.length; i++) {
          for (let i1 = 0; i1 < place.address_components[i].types.length; i1++) {
            if (place.address_components[i].types[i1] == "country") {
              var countryCodes = place.address_components[i].short_name
              var country = place.address_components[i].long_name
            }
            if (place.address_components[i].types[i1] == "administrative_area_level_1") {
              var state = place.address_components[i].long_name
            }
            if (place.address_components[i].types[i1] == "sublocality_level_1") {
              var addressLine1 = place.address_components[i].long_name
            }

            if (place.address_components[i].types[i1] == "postal_code") {
              var zipCode = place.address_components[i].long_name
            }
            if (place.address_components[i].types[i1] == "locality") {
              var city = place.address_components[i].long_name
            }
          }
        }
        if (countryCodes == null) {
          // document.getElementById('address_countryCode').value = "";
          document.getElementById('country').value = ""
        } else {
          console.log(countryCodes, "slsl")
          // document.getElementById('address_countryCode').value = countryCodes
          document.getElementById('country').value = country
          console.log(document.getElementById('country').value, ";;", country)
        }
        if (state == null) {
          document.getElementById('state').value = "";

        } else {
          document.getElementById('state').value = state;
          console.log()
        }
        if (city == null) {
          document.getElementById('city').value = "";

        } else {
          document.getElementById('city').value = city;
        }
        // if (addressLine1 == null) {
        //     document.getElementById('addressLine1').value = "";

        // } else {
        //     document.getElementById('addressLine1').value = addressLine1;

        // }

        if (zipCode == null) {
          document.getElementById('zipCode').value = "";

        } else {
          document.getElementById('zipCode').value = zipCode;

        }

        break;
    }
  }
}

 // map
        // Initialize and add the map
        let map;
        async function initMap(lat, lng) {
            // The location of Uluru
            const position = { lat: lat ? lat : 28.535517, lng: lng ? lng : 77.391029 };
            // Request needed libraries.
            //@ts-ignore
            const { Map } = await google.maps.importLibrary("maps");
            const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

            // The map, centered at Uluru
            map = new Map(document.getElementById("map"), {
                zoom: 4,
                center: position,
                mapId: "DEMO_MAP_ID",
            });

            // The marker, positioned at Uluru
            const marker = new AdvancedMarkerElement({
                map: map,
                position: position,
                title: "Uluru",
            });
        }
        initMap();


//24 hours time dropdown open time
function timeDropdown() {
  var hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
  var minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55']
  for (let i = 0; i < hours.length; i++) {
    for (let j = 0; j < minutes.length; j++) {
      var select = document.getElementById("openingTime");
      let catId = document.getElementById("openingTime1").value
      var option = document.createElement("option"),
        txt = document.createTextNode(hours[i] + ":" + minutes[j]);
      option.appendChild(txt);
      option.setAttribute("value", hours[i] + ":" + minutes[j]);
      option.selected = hours[i] + ':' + minutes[j] === catId ? true : false
      select.insertBefore(option, select.lastChild);
    }
  }
}
//24 hours time dropdown close time
function timeDropdown1() {
  var hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
  var minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55']
  for (let i = 0; i < hours.length; i++) {
    for (let j = 0; j < minutes.length; j++) {
      var select = document.getElementById("closingTime");
      let catId = document.getElementById("closingTime1").value
      var option = document.createElement("option"),
        txt = document.createTextNode(hours[i] + ":" + minutes[j]);
      option.appendChild(txt);
      option.setAttribute("value", hours[i] + ":" + minutes[j]);
      option.selected = hours[i] + ':' + minutes[j] === catId ? true : false
      select.insertBefore(option, select.lastChild);
    }
  }
}

