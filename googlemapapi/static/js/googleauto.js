var placeSearch, autocomplete, autocomplete2;

var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};

//Dropoff fields
var componentForm2 = {
  street_number2: 'short_name',
  route2: 'long_name',
  locality2: 'long_name',
  administrative_area_level_12: 'short_name',
  country2: 'long_name',
  postal_code2: 'short_name'
};



function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */
    (document.getElementById('autocomplete')), {
      types: ['geocode'],  componentRestrictions: {country: 'ca'}
    });

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener('place_changed', function() {
    fillInAddress(autocomplete, "");
  });

$('#autocomplete').keydown(function (e) {
  if (e.which == 13 && $('.pac-container:visible').length) return false;
});



  autocomplete2 = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */
    (document.getElementById('autocomplete2')), {
      types: ['geocode'] , componentRestrictions: {country: 'ca'}
    });
  autocomplete2.addListener('place_changed', function() {
    fillInAddress(autocomplete2, "2");
  });

  $('#autocomplete2').keydown(function (e) {
  if (e.which == 13 && $('.pac-container:visible').length) return false;
});

}

function fillInAddress(autocomplete, unique) {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();
  var place2 = autocomplete2.getPlace();

  for (var component in componentForm) {
    if (!!document.getElementById(component + unique)) {
      document.getElementById(component + unique).value = '';
      document.getElementById(component + unique).disabled = false;
    }
  }

  // Get each component of the address from the place details
  // and fill the corresponding field on the form.
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType] && document.getElementById(addressType + unique)) {
      var val = place.address_components[i][componentForm[addressType]];
      document.getElementById(addressType + unique).value = val;

    }
  }

    //dropoff fields fullfillment
    for (var component2 in componentForm2) {
    if (!!document.getElementById(component2 + unique)) {
      document.getElementById(component2 + unique).value = '';
      document.getElementById(component2 + unique).disabled = false;
    }
  }

  // Get each component of the address from the place2 details
  // and fill the corresponding field on the form.
  for (var i = 0; i < place2.address_components.length; i++) {
    var addressType = place2.address_components[i].types[0];
    if (componentForm2[addressType] && document.getElementById(addressType + unique)) {
      var val = place2.address_components[i][componentForm2[addressType]];
      document.getElementById(addressType + unique).value = val;

    }
  }
}
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}

function geolocate2() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete2.setBounds(circle.getBounds());
    });
  }
}


