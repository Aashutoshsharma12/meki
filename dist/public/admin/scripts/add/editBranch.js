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
        console.log(select, "lll")

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
var currentLocation = window.location.href;
var url = new URL(currentLocation);
var branchId = url.searchParams.get("id");


function branch_details() {
  $.ajax({
    type: "get",
    dataType: 'json',
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', token);
    },
    url: `${host}/api/v1/admin/restaurant/details?vendorId=${branchId}`,
  }).done(function (data) {
    // If successful
    document.getElementById('restaurantName').value = localStorage.getItem('restaurantName') ? localStorage.getItem('restaurantName') : "N/A",
      document.getElementById('mobileNo').value = data.data.branchDetails.mobileNo ? data.data.branchDetails.mobileNo : "N/A",
      document.getElementById('blah1').src = data.data.branchDetails.restaurantImage ? data.data.branchDetails.restaurantImage : "../../admin/assets/img/emptyphoto.png";
    document.getElementById('mobile_countryCode').value = data.data.branchDetails.countryCode ? data.data.branchDetails.countryCode : ''
    document.getElementById('max_deliveryTime').value = data.data.branchDetails.max_deliveryTime ? data.data.branchDetails.max_deliveryTime : "N/A"
    document.getElementById('openingTime').value = data.data.branchDetails.openingTime
    document.getElementById('closingTime').value = data.data.branchDetails.closingTime
    document.getElementById('fullAddress').value = data.data.branchDetails.addressDetails.fullAddress
    document.getElementById('minimum_orderAmount').value = data.data.branchDetails.minimum_orderAmount
    document.getElementById('delivery_charges').value = data.data.branchDetails.delivery_charges
    document.getElementById('blah1').src = data.data.branchDetails.branchImage
    document.getElementById('lat').value = data.data.lat
    document.getElementById('long').value = data.data.long
    initMap(Number(data.data.lat), Number(data.data.long))

    if (data.data.branchDetails.paymentMehod[0] === 'Cash On Delivery' || data.data.branchDetails.paymentMehod[1] == 'Cash On Delivery') {
      document.getElementById('c1').checked = true
    } else {
      document.getElementById('c1').checked = false
    }
    if (data.data.branchDetails.paymentMehod[0] == 'Accept Card' || data.data.branchDetails.paymentMehod[1] == 'Accept Card') {
      document.getElementById('c2').checked = true
    } else {
      document.getElementById('c2').checked = false
    }

    if (data.data.branchType == 'Main') {
      document.getElementById('vendorId1').value = data.data._id
    } else {
      document.getElementById('vendorId1').value = data.data.vendorId
    }
  }).fail(function (jqXHR, textStatus, errorThrown) {
    // If fail
    // alert(jqXHR.responseJSON.error)
    alert("Data Not Found")

  });
}
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
  console.log(place, "splace", place.geometry.location.lat(), "ln", place.geometry.location.lng())
  document.getElementById('lat').value = place.geometry.location.lat();
  document.getElementById('long').value = place.geometry.location.lng();
  document.getElementById('googlePlaceId').value = place.place_id;
  initMap(place.geometry.location.lat(), place.geometry.location.lng())
  let address1 = "";
  let postcode = "";
  for (const component of place.address_components) {
    console.log(document.getElementById('fullAddress1').value, "llsssdocument.getElementById('fullAddress1').value")
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
  const position = { lat: lat, lng: lng };
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
console.log(position,"slslslslslsls")
  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Uluru",
  });
}



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