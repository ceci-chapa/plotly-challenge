

function generatePlots(patientId) {
  d3.json(url).then(function (data) {
    var selectedPatientMD = data.metadata.filter(row => row.id == patientId)[0]
    var selectedPatientSamples = data.samples.filter(row => row.id == patientId)[0]
    var patientOTUs = data.samples.filter(row => row.otu_ids)[0]
    console.log('otus', patientOTUs)
  
    // Use sample_values as the x for the bar chart.

    // Use otu_ids as the y for the bar chart.
    
    // Use otu_labels as the hovertext for the chart.


    var trace1 = {
      x: ['Feature A', 'Feature B', 'Feature C', 'Feature D', 'Feature E'],
      y: [20, 14, 23, 25, 22],
      marker: {      },
      type: 'bar',
      orientation: 'h'
    };

    var data = [trace1];

    var layout = {
      title: 'Top 10 OTUs'
    };

    Plotly.newPlot('bar', data, layout);

    // Bubble Chart Begins Here

    // Use otu_ids for the x values.

    // Use sample_values for the y values.

    // Use sample_values for the marker size.

    // Use otu_ids for the marker colors.

    // Use otu_labels for the text values.



    var trace1 = {
      x: selectedPatientSamples.otu_ids,
      y: selectedPatientSamples.sample_values,
      mode: 'markers',
      marker: {
        size: selectedPatientSamples.sample_values
      }
    };

    var data = [trace1];

    var layout = {
      title: 'Marker Size',
      showlegend: false,
      height: 600,
      width: 600
    };

    Plotly.newPlot('bubble', data, layout);


    // Single gauge starts here

    var data = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: selectedPatientMD.wfreq,
        title: { text: "Belly Button Washing Frequency" },
        type: "indicator",
        mode: "gauge+number",
        delta: { reference: 400 },
        gauge: { axis: { range: [null, 10] } }
      }
    ];

    var layout = { width: 600, height: 400 };
    Plotly.newPlot('gauge', data, layout);

  })
}

function newPatientSelected(currentPatientId) {
  console.log(currentPatientId)
  generatePlots(currentPatientId)

}

// Linking the json file
const url = "static/js/samples.json";

// Promise Pending
// const dataPromise = d3.json(url);
// console.log("Data Promise: ", dataPromise);

// // Fetch the JSON data and console log it
d3.json(url).then(function (data) {
  console.log(data.names);

  var dropdown = d3.select('#selDataset')
  data.names.forEach(patientId => {
    dropdown.append('option').property('value', patientId).text(patientId)
  });

  var demoInfo = d3.select('.panel-body')
  data.metadata.forEach(patientInfo => {
    demoInfo.append('option', patientInfo).text(patientInfo)
    console.log('test', demoInfo)
  });

  // selectedPatientMD



  generatePlots(data.names[0])

});







