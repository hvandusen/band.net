var fs = require('fs');

function repeatMeasure(notes,timeSig){
  var outnotes = notes.concat(notes.slice(notes.length-timeSig*2));
  return outnotes;
}

var theSong = {
  "title": "i shall be rtelased",
  "bpm": 100,
  "subdivisions": 8,
  "noteNames" : ["1","1.5","2","2.5","3","4","4.5","5","5.5","6","7","7.5","8"],
  "noteLists" : [
    [0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,4,4,4,4,5,5,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,4,4,4,4,5,5,5,5,0,0,0,0,0,0,0,0]
  ],
  "colors": ["red","orange","yellow","green","blue","indigo","violet","green","blue","indigo","violet"],
  "readme" : "trying to test this thing out and will maybe make the mario song. red is chords blue is bass idk"
}

theSong.noteLists[0] = compose(100);
fs.writeFile('output.bnt', JSON.stringify(theSong, null, "\t"), 'utf8', function(){
  ////console.log("yah we did it")
});



function compose(len){
  const waits = {
    "0": 5,
    "4": 3,
    "5": 3,
    "7": 3,
    "rest": 1
  }
  var out = [];
  var notes = [0,5,7,"rest"];
  for (var i = 0; i < len; i++) {
    var choice = notes[Math.floor(Math.random()*notes.length)];
    //console.log(waits)
    var amt = 1+Math.floor(Math.random()*waits[choice]);
    for (var j = 0; j < amt; j++) {
      out.push(choice);
    }
    if(Math.random()<.5 && i % theSong.subdivisions === 0){
      out = repeatMeasure(out,theSong.subdivisions)
      console.log("repeated")
    }
  }
  return out
}
