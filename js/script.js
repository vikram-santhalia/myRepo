var data1 = [
[1354586000000, 153], [1364587000000, 258], [1374588000000, 198],
[1384589000000, 263], [1394590000000, 201], [1404591000000, 148],
[1414592000000, 153], [1424593000000, 249], [1434594000000, 223],
[1444595000000, 258], [1454596000000, 188], [1464597000000, 164],
[1479597000000, 248], [1484997000000, 208], [1499597000000, 214]
];

var data2 = [
{ label: "Sent",  data: 3500, color: '#eec14e'},
{ label: "Opened",  data: 2500, color: '#99d25d'},
{ label: "Saved",  data: 1000, color: '#c4a5e0'},
{ label: "Clicked",  data: 3800, color: '#f08da9'}
];

var data3 = [
{label: 'Delivered',color: '#3baeed', data: [[1,726], [2,890], [3,752], [4,900], [5,865],[6,720], [7,859]]},
{label: 'Career',color: '#847cc5', data: [[1,110], [2,90], [3,87], [4,101], [5,121],[6,99],[7,105]]},
{label: 'Bounced',color: '#abe3bc', data: [[1,151], [2,202], [3,173], [4,159], [5,162],[6,170],[7,153]]},
];


function drawAreaChart() { 
  setStyle(890,220);   
  var options = {
    series:{
      lines: {                         
        fill: true, show:true,
        fillColor: { colors: [{ opacity: 0.2 }, { opacity: 0.8}] }
      },
      clickable: true,
      hoverable: true,
      shadowSize: 4,
      highlightColor: "#27b5eb",
      color: '#27b5eb',
      points: { show: true, fill: true}
    },
    xaxis: {
      mode: "time",
      show: true,
      position: "bottom",
      tickColor: "#fafafa"
    },
    yaxis: {
      show: true,
      position: "left",
      tickColor: "#fafafa",
      position: "left",
      color: "black"
    },
    grid: {
      hoverable: true,
      borderColor: "#d1d1d1",
      backgroundColor: { colors: ["#ffffff", "#ffffff"] },
      borderWidth: 1,
      aboveData: false,
      markings: [ { xaxis: { from: 0, to: 10 }, yaxis: { from: 0, to: 0 }, color: "#000000" },
      { xaxis: { from: 0, to: 0 }, yaxis: { from: 0, to: 15 }, color: "#000000" }]

    }

  };

  var plot = $.plot($("#flotcontainer"), [data1], options);  
}

function drawPieChart() {
  setStyle(890,220);   
  $.plot($("#flotcontainer"), data2, 
  {
    series: {
      pie: { 
        show: true,
        innerRadius: 0.5,
        gradient: {
          radial: true,
          colors: [
          {opacity: 0.5},
          {opacity: 1.0}
          ]
        },
        radius: 1,
        hoverable: true,
        label: {
          show: true,
          radius: 3/4,
          formatter: function(label, series){
            return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'+series.data[0][1]+'</div>';
          },
          background: { opacity: 0.5 }
        }
      }
    },
    legend: { show: true, container: $("#chartLegendPie") }
  });
}

function drawStackChart() {
    setStyle(400,220);   
    var options = {
        series: {stack: 0,
                 lines: {show: false, steps: false },
                 bars: {show: true, barWidth: 0.5, align: 'center',fill:1},},
        xaxis: {ticks: [[1,'Mon'], [2,'Tue'], [3,'Wed'], [4,'Thu'], [5,'Fri'],[6,'Sat'],[7,'Sun']]},
        xaxis: {
                tickLength: 0
            },
        grid: {
          hoverable: true,
          borderColor: "#dfdfdf",
          backgroundColor: { colors: ["#ffffff", "#ffffff"] },
          borderWidth: 1,
          aboveData: false,
          },
        legend: { show: true, container: $("#chartLegend") }
    };

    $.plot($("#flotcontainer"), data3, options);
}

function setStyle(x,y){
  var xx = x;
  var yy = y;
  $("#flotcontainer").height(yy).width(xx);
  $("#flotcontainer").css( {
    height:  yy+"px",
    width: xx+"px", 
    marginLeft : (-xx/2)+"px", 
    marginTop : (-yy/2)+"px"
    
  });
}


$( document ).ready(function() {
      setStyle(890,220);
});

$(document).on("click","#areachart", function() {
  animationClick("#flotcontainer", "animated fadeIn");
  $("#chartLegend").css( { display: 'none' });
  $("#chartLegendPie").css( { display: 'none' });
  $("#padHeightArea").css( { display: 'block' });
  $("#padWidthArea").css( { display: 'block' });
  $("#padHeightStack").css( { display: 'none' });
  $("#padWidthStack").css( { display: 'none' });
  drawAreaChart();
});

$(document).on("click","#piechart", function() {
  animationClick("#flotcontainer", "animated fadeIn");
  $("#chartLegendPie").css( { display: 'block' });
  $("#chartLegend").css( { display: 'none' });
  $("#padHeightArea").css( { display: 'none' });
  $("#padWidthArea").css( { display: 'none' });
  $("#padHeightStack").css( { display: 'none' });
  $("#padWidthStack").css( { display: 'none' });
  drawPieChart();
});

$(document).on("click","#stackchart", function() {
  animationClick("#flotcontainer", "animated fadeIn");
  $("#chartLegend").css( { display: 'block' });
  $("#chartLegendPie").css( { display: 'none' });
  $("#padHeightArea").css( { display: 'none' });
  $("#padWidthArea").css( { display: 'none' });
  $("#padHeightStack").css( { display: 'block' });
  $("#padWidthStack").css( { display: 'block' });
  drawStackChart();
});


  setTimeout( function(){
      setStyle(890,220);
      $("#chartLegend").css( { display: 'none' });
      $("#chartLegendPie").css( { display: 'none' });
      $("#padHeightArea").css( { display: 'block' });
      $("#padWidthArea").css( { display: 'block' });
      $("#padHeightStack").css( { display: 'none' });
      $("#padWidthStack").css( { display: 'none' });
      drawAreaChart();

  }, 500 );




function animationHover(element, animation){
  element = $(element);
  element.hover(
    function() {
      element.addClass('animated ' + animation);
    },
    function(){
      window.setTimeout( function(){
        element.removeClass('animated ' + animation);
      }, 2000);
    }
  );
};


function animationClick(element, animation){
  element = $(element);
      element.addClass('animated ' + animation);
      window.setTimeout( function(){
          element.removeClass('animated ' + animation);
      }, 2000);
};