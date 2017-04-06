// Business Logic
function Contact(first, last, phone) {
  this.firstName = first;
  this.lastName = last;
  this.phone = phone;
  this.addresses = [];
}

function Address(street, city, state, addressType ) {
  this.street = street;
  this.city = city;
  this.state = state;
  this.addressType = addressType;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

Address.prototype.fullAddress = function() {
  return this.street + ", " + this.city + ", " + this.state + "<br>" + "Type: " + this.addressType;
}

function resetFields() {
  $("#new-first-name").val("");
  $("#new-last-name").val("");
  $("#new-phone").val("");
  $(".new-street").val("");
  $(".new-city").val("");
  $(".new-state").val("");
  $(".new-type").val("");
}


// User Interface Logic
$(document).ready(function() {
  $("#add-address").click(function() {
    $("#new-addresses").append('<div class="new-address input">' +
                                 '<div class="form-group">' +
                                   '<label for="new-street">Street</label>' +
                                   '<input type="text" class="form-control new-street">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-city">City</label>' +
                                   '<input type="text" class="form-control new-city">' +
                                 '</div>' +

                                 '<div class="form-group">' +
                                   '<label for="new-state">State</label>' +
                                   '<input type="text" class="form-control new-state">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<p><b>Address Type</b></p>' +
                                   '<select class="form-control new-type">' +
                                     '<option>Home</option>' +
                                     '<option>Work</option>' +
                                     '<option>Temporary</option>' +
                                 '</div>' +
                               '</div>');
  });

  $("#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("#new-first-name").val();
    var inputtedLastName = $("#new-last-name").val();
    var inputtedPhone = $("#new-phone").val();
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhone);

    $("#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

    $(".new-address").each(function() {
      var inputtedStreet = $(this).find(".new-street").val();
      var inputtedCity = $(this).find(".new-city").val();
      var inputtedState = $(this).find(".new-state").val();
      var inputtedType = $(this).find(".new-type").val();
      var newAddress = new Address(inputtedStreet, inputtedCity, inputtedState, inputtedType);

      newContact.addresses.push(newAddress);
    });

    $(".contact").last().click(function() {
      $("#show-contact").toggle();
      $("#show-contact h2").text(newContact.fullName());
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $(".phone").text(newContact.phone);
      $("#addresses").empty();
      newContact.addresses.forEach(function(address) {
        if (address.street !== "" || address.city !== "" || address.state !== ""){
          $("#addresses").append("<li>" + address.fullAddress() + "</li>");
        }
      });
    });

    resetFields();
    $(".input").remove();

  });
});
