// Business Logic
function Contact(first, last) {
  this.firstName = first;
  this.lastName = last;
  this.addresses = [];
}

function Address(street, city, state, addressType) {
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
  $("#new-street").val("");
  $("#new-city").val("");
  $("#new-state").val("");
  $("#new-type").val("");
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
                                   '<label for="new-type">Type of Address</label>' +
                                   '<input type="text" class="form-control new-type" placeholder="e.g. home, office">' +
                                 '</div>' +
                               '</div>');
  });

  $("#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("#new-first-name").val();
    var inputtedLastName = $("#new-last-name").val();
    var newContact = new Contact(inputtedFirstName, inputtedLastName);

    $("#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>")

    $(".new-address").each(function() {
      var inputtedStreet = $(this).find("#new-street").val();
      var inputtedCity = $(this).find("#new-city").val();
      var inputtedState = $(this).find("#new-state").val();
      var inputtedType = $(this).find("#new-type").val();
      var newAddress = new Address(inputtedStreet, inputtedCity, inputtedState, inputtedType);

      newContact.addresses.push(newAddress);
    });

    $(".contact").last().click(function() {
      $("#show-contact").toggle();
      $("#show-contact h2").text(newContact.fullName());
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $("#addresses").text("");
      newContact.addresses.forEach(function(address) {
        $("#addresses").append("<li>" + address.fullAddress() + "</li>");
      });
    });

    resetFields();
    $(".input").remove();

  });
});
