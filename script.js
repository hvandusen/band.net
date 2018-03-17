var speed = 120;
var repeats = 5;
function setup(){
  frameRate(speed/60);
}

var noteElement = "<div class='note'><span class='label'></span></div>";
var stepElement = "<span class='step'></span>";

$(document).ready(function(){
  jQuery.getJSON( "mario.bnt",configurationLoaded)
});

function configurationLoaded(config,status){
  var tr = new Track(config);
  //tr.allNotes = scanForAllNotes
  tr.listLengths = tr.noteLists.map(e => e.length);
  tr.trackLength = Math.max(...tr.listLengths);
  console.log(tr)
  // for each row make a new row
  for (var i = 0; i < tr.noteNames.length; i++) {
    $(noteElement).appendTo(".notes");
    var nextRow = $(".note:eq("+i+")");
    nextRow.find(".label").text(tr.noteNames[i]);
    //fill in steps for all the rows
    for (var j = 0; j < tr.trackLength; j++) {
      var theNote = $(stepElement);
      theNote.appendTo(".note:eq("+i+")");
    }
  }
  //loop through our note choices
  for (var i = 0; i < tr.noteLists.length; i++) {
    for (var j = 0; j < tr.noteLists[i].length; j++) {
      var noteValue = tr.noteLists[i][j];
      console.log(".note:eq("+noteValue+" .step:eq("+j+"))")
      var ourNote = $(".note:eq("+noteValue+") .step:eq("+j+")")
      .addClass("hit").css("background",tr.colors[i])
      .text(false? tr.noteNames[noteValue] : "");
    }
    tr.noteLists[i]
  }
  // $(".note:nth-child(1) .step:nth-child(2)").remove(); // remove first cloned step in each row
  // $(".step").css("transition",speed+"s"); // set feffect or omething
}

var Track = function(config){
  var that = {};
  Object.keys(config).forEach(function(e,i){
    that[e] = config[e];// = config[e]
  })
  return that;
}


function draw(){
  $(".step:nth-child(2)").remove();
  //$(".step:eq(0)",".note").remove();
}
