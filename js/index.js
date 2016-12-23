$(document).ready(function() {
  $.ajaxSetup({
    async: false
  });

  var mydata = [];
  var featureddata = [];
  var html = '';
  // twitch tv api calls.
  $.ajax({
    url: 'https://api.twitch.tv/kraken/streams/freecodecamp',
    async: false,
    dataType: 'json',
    success: function(json) {
      if (json.stream == null) {
        mydata = 'offline';
      } else {
        mydata = '<a href="' + json.stream.channel.url + '" target="_blank">' + json.stream.channel.status + '</a>';
      }

    }
  });
  $.ajax({
    url: 'https://api.twitch.tv/kraken/streams/featured?',
    limit: 10,
    async: false,
    dataType: 'json',
    success: function(json) {
      featureddata = json;

    }
  });
  var names = ["FreeCodeCamp"];
  var logo = 'https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-profile_image-d9514f2df0962329-300x300.png';

  html = ('<tr><td><img src="' + logo + '" height=40px></td><td>' +'<td width= 180px>' + "FreeCodeCamp" + '</td><td>' +
    '<td class="test">' + mydata + '</td></tr>');

  var data = featureddata.featured;

  for (var i = 0; i <= 8; i++) {
    html += ('<tr><td><img src="' 
             + data[i].stream.channel.logo 
             + '" height=40px></td><td>' +'<td>'
             + data[i].stream.channel.display_name 
             + '</td><td>' +'<td class="test"><a href="'                       +data[i].stream.channel.url + '" target="_blank">'                 +data[i].stream.channel.status + '</a></td></tr>');

  }
  for (var n = 0; n <= 8; n++) {
    names.push(data[n].stream.channel.display_name);
  }

  $("#table").append(html);//populating the table.
// menu click events.
  $("#online").click(function() {
    var tableRow = $("tr:contains('offline')");
    $("tr").show();
    tableRow.hide();

  });

  $("#all").click(function() {
    $("tr").show();

  });

  $("#offline").click(function() {
    var tableRow = $("tr:contains('offline')");
    $("tr").hide();
    tableRow.show();

  });

  $("input").autocomplete({
    source: names

  }); //End auto compelete

  $('input').keydown(function(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
      var search = $('input').val();
      $("tr").hide();
      $('#table tr:contains("' + search + '")').show();
      $('input').val('');
    }

  });//end of search keypress.

  /*
  var userNames = ["freecodecamp","OgamingSC2","terakilobyte","habathcx","notmichaelmcdonald","RobotCaleb",'thomasballinger","mdwasp","beohoff","xenocomagain"];



                              
   */

});