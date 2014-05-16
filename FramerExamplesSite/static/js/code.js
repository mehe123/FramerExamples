(function() {
  var getParameterByName, loadCS, loadJS, _current;

  getParameterByName = function(name) {
    var regex, results;
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    results = regex.exec(location.search);
    if (results == null) {
      return "";
    } else {
      return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
  };

  _current = null;

  loadCS = function(exampleName) {
    _current = "cs";
    $(".learn").show();
    $(".toggle").html("CoffeeScript");
    $("#dropdown a").html("JavaScript");
    return $.ajax({
      url: "/static/examples/" + exampleName + "/app.coffee",
      dataType: "text",
      success: function(data) {
        return Rainbow.color(data, "coffeescript", function(result) {
          return $("code").html(result.replace(/\t/g, "  "));
        });
      }
    });
  };

  loadJS = function(exampleName) {
    _current = "js";
    $(".learn").hide();
    $(".toggle").html("JavaScript");
    $("#dropdown a").html("CoffeeScript");
    return $.ajax({
      url: "/static/examples/" + exampleName + "/app.js",
      dataType: "text",
      success: function(data) {
        return Rainbow.color(data, "javascript", function(result) {
          return $("code").html(result);
        });
      }
    });
  };

  $(document).ready(function() {
    var exampleName;
    exampleName = getParameterByName("name");
    loadCS(exampleName);
    $(".toggle").click(function() {
      $(this).toggleClass("active-toggle");
      return $("#dropdown").toggleClass("active");
    });
    return $("#dropdown").click(function() {
      if (_current === "cs") {
        loadJS(exampleName);
      } else {
        loadCS(exampleName);
      }
      $(".toggle").toggleClass("active-toggle");
      return $("#dropdown").toggleClass("active");
    });
  });

}).call(this);
