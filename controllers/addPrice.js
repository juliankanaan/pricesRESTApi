// post request to mongoDB server
const fetch = require('isomorphic-fetch');

exports.splitIntoLines = function (data) {
  // DB wants a [hospital, procedure, cost]
    var lines = [];

    for (line of data.split("\n")) {
      //console.log(line);
      lines.push(line.toString().replace(/\s+/g, ' '));
    }

    return lines;


};
exports.postData = function (url) {

    console.log(url);
    fetch(url).then(res => res.text()) // transform into text
    .then(text => {
      //return text; // all text
      var lines = splitIntoLines(text);
      console.log(lines[20]); // works 56215817 103-0605-200 X-PEDION 10 WIRE 1761.00 582.89
      return lines;
    });
    function splitIntoLines(data) {
      var lines = [];

      for (line of data.split("\n")) {
        //console.log(line);
        lines.push(line.toString().replace(/\s+/g, ' '));
      }

      return lines;
    }
};

exports.cleanData = function (lines, key) {
  function descCostArr(stri, schema){

    wholeArr = []; descArr = []; costArr =[];
    for (var i = 1; i < stri.length; i++) {
          if(!schema[i].ignore){
    		if(schema[i].type == "desc"){
              descArr.push(stri[i])
            } else if (schema[i].type == "cost"){
    		  costArr.push(stri[i])
            }
          }

       } // end loop

    wholeArr = descArr.join(" ") + ", " + (costArr);
    console.log(wholeArr.split(',')); // > Array ["CATH BILIARY 12F/35CM", " 1038.00"]

    return wholeArr.split(',');

  } // end method
  return descCostArr(lines[40], key);
}; // end method
