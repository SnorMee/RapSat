





////////////////////////////////////////////////////////////////////// LOAD DATA //////////////////////////////////////////////////////////

var data = null;

$.ajax({
    url: "data/Threat_nest_List.json",
    contentType:"application/json; charset=utf-8",
    dataType: 'json',
    async: false,

    success: function(response){
        dataThreatTotal = response
    }
});

$.ajax({
    url: "data/Threat_Title_ALL_IUCN.json",
    contentType:"application/json; charset=utf-8",
    dataType: 'json',
    async: false,

    success: function(response){
        dataThreatType = response
    }
});



function createTreeData(data, type, word){
    let tList = [];
    let TH = {'1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0};
    treeDict = data
    threatType = type

            for (let key in treeDict) {
                if (key.includes(word)) {
                  let list = treeDict[key];
                  list.forEach(function(element) {
                    let typeCat = threatType[element];
                    let name = element.split('.')[0];
                    let entry = {'name':1};
                    if (name in TH) {
                        TH[name] += 1;}
                  });

                  }
                }
              
        //console.log(tList)
            
            
            
    
    
    
        let threatDict = TH
        return threatDict
};

const searchBar = document.getElementById('search-bar');
  const searchButton = document.getElementById('search-button');

  let searchText = '';

  searchBar.addEventListener('input', (event) => {
    searchText = event.target.value;
  });

  searchButton.addEventListener('click', () => {
    search(searchText);
  });

  searchBar.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      search(searchText);
    }
  });

  function search(text) {
    console.log(`Searching for "${text}"...`);
    // Add your search functionality here.
    let selectedWord = text; //Add Search Word
    document.getElementById("canvas").innerHTML = "";
    console.log(createTreeData(dataThreatTotal,dataThreatType,selectedWord));
    drawCanvas(createTreeData(dataThreatTotal,dataThreatType,selectedWord));
  };

///// REMOVE/////////
let selectedWord = 'Abarema'; //Add Search Word
console.log(createTreeData(dataThreatTotal,dataThreatType,selectedWord));
drawCanvas(createTreeData(dataThreatTotal,dataThreatType,selectedWord));

function drawCanvas(data){
// Sizing - independent
let tw = 1500/2
let th = 1000/2
let numX = 4
// Sizing - DEPENDENT
let numY = 12/numX
var paper = Raphael("canvas", tw , th);
let x = 10
let x0 = x
let y = 10
let h = th/numY
let w = tw/numX
//Text and color
let colorList = ['#ff6b6b', '#f06595', '#cc5de8', '#845ef7', '#5c7cfa', '#339af0', '#22b8cf', '#20c997', '#51cf66', '#94d82d', '#fcc419', '#ff922b'];
let headline = [
    '1. Residential & commercial development',
    '2. Agriculture & aquaculture',
    '3. Energy production & mining',
    '4. Transportation & service corridors',
    '5. Biological resource use',
    '6. Human intrusions & disturbance',
    '7. Natural system modifications',
    '8. Invasive & other problematic species, genes & diseases',
    '9. Pollution',
    '10. Geological events',
    '11. Climate change & severe weather',
    '12. Other options'
]
// Saturation

// Create 
for (let i = 0; i < 12; i++) {
    if (i % numX === 0 ) {
        if (i !== 0){
        y = y + h;
        x = x0;};
    } else {
      x = x + w;
    }
    // calculate lightness based on value in data
    //var saturation = data[String(i+1)] / (Math.max(...Object.values(data))) * 100; // Convert value to percentage of max value
    //var color = Raphael.hsl('#ff0', saturation, 50); // Use HSL color model to adjust lightness
    var myColor = d3.scaleLinear()
    .range(['#ffffff','#7f0000'])
    .domain([0,100]);
    var color = myColor(data[String(i+1)] / (Math.max(...Object.values(data)))*100)

    var rect = paper.rect(x, y, w, h);
    rect.attr({
        fill: color
      }); 
    var text = paper.text(x + w / 2, y + h / 2,  headline[i]);
    text.attr({
        "font-size": 12,
        "font-family": "Arial",
        "fill": "#000"
    });
    var extraText = paper.text(x+w/2,y+h/2+12+2, "Number of Threats: " + data[String(i+1)]);
    extraText.attr({
      "font-size": 12,
      "font-family": "Arial",
      "fill": "#000"
  });
  // Add tooltip
        rect.node.setAttribute('title', 'Threat ' + (i + 1)); // set the title attribute
        rect.node.addEventListener('mouseover', function() {
            var tooltip = document.createElement('div');
            tooltip.innerHTML = 'Threat ' + (i + 1);
            tooltip.style.position = 'absolute';
            tooltip.style.left = event.pageX})
};
}
