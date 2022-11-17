// Assign the specification to a local variable vlSpec.
var vlSpec = {
  params: [
    {
      name: "season",
      value: "1",
      bind: {
        input: "select",
        options: ["1", "2", "3", "4"]
      }
    }
  ],
  title: {
    text: "Count of Stage Direction Appearance",
    subtitle: "Stranger Things Characters"
  },
  data: {
    url: "https://raw.githubusercontent.com/picoral/csc-444-data/main/stranger_things_stage_characters.csv",
    format: { type: "csv" }
  },
  transform: [
    { filter: "datum.season == season" }
  ],
  mark: "bar",
  encoding: {
    y: {
      field: "word", 
      type: "nominal",
      sort:  "-x",
      title: "character"
    },
    x: {
      aggregate: "sum", 
      field: "n",
      type: "quantitative",
      title: "total times in stage direction"
    }
  }
};

  // optional argument passed to Vega-Embed to specify Vega-Lite spec. More info at https://github.com/vega/vega-embed
  var opt = {
    "mode": "vega-lite"
  };

  // Embed the visualization in the container with id `vis`
  vegaEmbed("#characters_per_season", vlSpec, opt).then(function(result) {
    // Callback receiving the View instance and parsed Vega spec
    // result.view is the View, which resides under the '#vis' element
  }).catch(console.warn);