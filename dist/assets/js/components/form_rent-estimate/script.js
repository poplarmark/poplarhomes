if (localStorage.getItem("userLocation") === null) {
    fetch("https://ipinfo.io/json?token=e448bdea9cc1f3")
      .then((response) => response.json())
      .then((jsonResponse) =>
        localStorage.setItem("userLocation", JSON.stringify(jsonResponse))
      );
  }
  
  function initMap() {
    window.googleMapsPlacesLoaded = true;
  }

  (function ($) {
    var MOBILE_WIDTH = 980;
  
    if ($("#filtertag").length > 0) {
      $("#filtertag").on("change", function () {
        console.log(this.value);
        window.location.href = this.value;
      });
    }
  
    var loggedData;
    if (localStorage.getItem("ORAuthToken") !== null) {
      var user = jwt_decode(localStorage.getItem("ORAuthToken"));
  
      if (user.type !== null) {
        $customLink = $(".logged-custom-link a");
        console.log(user.type);
        if (user.type.toUpperCase() == "RENTER" && !user.isProspect) {
          $customLink.attr("href", "/myrental");
          $customLink.text("My Rental");
          $(".homeowners-nav").hide();
          $(".manage-property").hide();
        } else if (user.type.toUpperCase() == "RENTER" && user.isProspect) {
          $customLink.attr("href", "/profile");
          $customLink.text("Renter Dashboard");
          $(".homeowners-nav").hide();
          $(".manage-property").hide();
        } else if (user.type.toUpperCase() == "OWNER") {
          $customLink.attr("href", "/owner/account/profile");
          $customLink.text("Account Settings");
          $(".renters-nav").hide();
        } else {
          $(".manage-property").show();
        }
      }
  
      $.ajax({
        method: "POST",
        url: onerent_settings.ajaxurl,
        data: {
          token: localStorage.getItem("ORAuthToken"),
          action: "is_user_logged",
        },
        dataType: "json",
      }).done(function (result) {
        loggedDataChanges(result);
      });
    }
  
    function loggedDataChanges(loggedData) {
      if (
        loggedData !== null &&
        loggedData.errors == null &&
        loggedData.data !== null &&
        loggedData.data.me !== null
      ) {
        $(".login a").text("Logout");
        $(".login a").attr("href", "/logout");
  
        $(".login").css("display", "none");
        $("#top-menu li.account .sub-menu").attr(
          "style",
          "display: block !important"
        );
        $(".account").addClass("round");
        $(".account > a").text(
          loggedData.data.me.firstName[0].toUpperCase() +
            loggedData.data.me.lastName[0].toUpperCase()
        );
        $(".account > a").attr("href", "#");
        $("#mobile_menu .account a").text("Account");
        if ($(document).width() <= MOBILE_WIDTH) {
          $("#mobile_menu li.account .sub-menu").attr(
            "style",
            "display: block !important"
          );
          $("#mobile_menu li.account .sub-menu li:first a").text(
            "Renter Dashboard"
          );
          $("#mobile_menu li.account .sub-menu li:last a").text("Logout");
        }
  
        window.intercomSettings = {
          app_id: "upyb5acp",
          name: loggedData.data.me.firstName + " " + loggedData.data.me.lastName, // Full name
          email: loggedData.data.me.email, // Email address
          user_hash: loggedData.data.me.user_hash, // Email address
        };
  
        return;
      }
      localStorage.removeItem("ORAuthToken");
    }
    $(".account .logout a").click(function (event) {
      event.preventDefault();
      localStorage.removeItem("ORAuthToken");
      window.location.href = "/login";
    });
  
    function queryForm(settings) {
      const reset = settings && settings.reset ? settings.reset : false;
      const self = window.location.toString();
      const querystring = self.split("?");
      if (querystring.length > 1) {
        const pairs = querystring[1].split("&");
        for (i in pairs) {
          const keyval = pairs[i].split("=");
          if (reset || sessionStorage.getItem(keyval[0]) === null) {
            sessionStorage.setItem(keyval[0], decodeURIComponent(keyval[1]));
          }
        }
      }
      const hiddenFields = document.querySelectorAll(
        "input[type=hidden], input[type=text]"
      );
      for (let i = 0; i < hiddenFields.length; i++) {
        const param = sessionStorage.getItem(hiddenFields[i].id);
        if (param) document.querySelector("#" + hiddenFields[i].id).value = param;
      }
    }
  
    queryForm();
  })(jQuery);