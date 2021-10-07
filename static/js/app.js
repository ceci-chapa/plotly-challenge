// Linking the json file
const url = "static/js/samples.json";

function generatePlots(patientId) {
  d3.json(url).then(function (data) {
    var selectedPatientMD = data.metadata.filter(row => row.id == patientId)[0]
    var selectedPatientSamples = data.samples.filter(row => row.id == patientId)[0]
    // var patientOTUs = data.samples.filter(row => row.otu_ids)[0]
    console.log('otus', selectedPatientSamples.otu_ids.slice(0, 10))

    /// var config is to add responsiveness to the charts
    var config = { responsive: true }

    // Use sample_values as the x for the bar chart.
    // Use otu_ids as the y for the bar chart.
    // Use otu_labels as the hovertext for the chart.

    var trace1 = {
      x: selectedPatientSamples.sample_values.slice(0, 10).reverse(),
      y: selectedPatientSamples.otu_ids.slice(0, 10).map(otu_id => `OTU #${otu_id}`).reverse(),
      text: selectedPatientSamples.otu_labels.slice(0, 10).reverse(),
      marker: {
        color: 'rgb(194, 83, 83)'
      },
      type: 'bar',
      orientation: 'h'
    };

    var data = [trace1];

    var layout = {
      title: 'Top 10 OTUs'
    };

    Plotly.newPlot('bar', data, layout, config);


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
        size: selectedPatientSamples.sample_values,
        color: selectedPatientSamples.otu_ids
      }
    };

    var data = [trace1];

    var layout = {
      // title: 'Marker Size',
      xaxis: {
        title: {
          text: 'OTU ID'
        }
      },
      showlegend: false,
      // height: 600,
      // width: 800
    };

    Plotly.newPlot('bubble', data, layout, config);


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


    Plotly.newPlot('gauge', data, config);


    //Start of demographic section

    var demoInfo = d3.select('.panel-body')
    demoInfo.html("")
    Object.entries(selectedPatientMD).forEach(([key, value]) => {
      demoInfo.append('h5').text(`${key} : ${value}`)
    });

  })
}

//This code runs on startup
d3.json(url).then(function (data) {

  var dropdown = d3.select('#selDataset')
  data.names.forEach(patientId => {
    dropdown.append('option').property('value', patientId).text(patientId)
  });

  generatePlots(data.names[0])

});







