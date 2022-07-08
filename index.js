$(document).on("input", "#Tempo", function () {
  GetResults();
});

$(document).on("input", "#releseRange", function () {
  GetResults();
});

$(document).on("input", "#releseRange", function () {
  GetResults();
});

$(document).on("input", "#trajectory", function () {
  GetResults();
});

$(document).on("input", "#spin", function () {
  GetResults();
});

$(document).on("input", "#distanceControl", function () {
  GetResults();
});

$(document).on("input", "#weight", function () {
  GetResults();
});

$(document).on("input", "#swing_speed", function () {
  GetResults();
});

$('input[type="radio"]').on("click change", function (e) {
  GetResults();
});

let shafts = AvailableShafts;

let TempoConverted = "Smooth";
let ReleaseConverted = "EARLY";
let trajectoryConverted = "LOW";
let SpinConverted = "LOW";
let distanceConverted = "Control";
let WeightConverted = "LITE";

function GetResults() {
  //getAllValues
  let Tempo = $("#Tempo").val();
  let releseRange = $("#releseRange").val();
  let trajectory = $("#trajectory").val();
  let spin = $("#spin").val();
  let distanceControl = $("#distanceControl").val();
  let weight = $("#weight").val();

  ResetCount();

  CalcTemp(Tempo);
  CalcreleseRange(releseRange);
  CalcTrajectory(trajectory);
  CalcSpin(spin);
  CalDistanceControl(distanceControl);
  Calcweight(weight);
  // console.log($("input[name=GraphiteBTN]:checked").val());

  ShowResults($("input[name=GraphiteBTN]:checked").val());
}

function ResetCount() {
  $(".myResults").html("");
  shafts.forEach(function (arrayItem) {
    arrayItem.count = 0;
  });
  // console.log("count reset", shafts);
}

function ShowResults(value) {
  var Material = value;
  sortByKey(shafts, "count");
  shafts = shafts.reverse();
  let filteredshafts = shafts.filter((shafts) => shafts.material == value);

  // filteredshafts = filteredshafts.slice(0, 4);
  // console.log("Results", filteredshafts);

  filteredshafts = filterSwingSpeed(filteredshafts);
  // console.log("Results", filteredshafts);

  if (filteredshafts.length > 0) {
    let html = "";
    filteredshafts.forEach(function (arrayItem) {
      html += `
    <div class="col-md-4">
    <div class="items ">

    <h4 class="resultTitle">
    ${arrayItem.shaft_name} 
    </h4>
    <h5>  Swing Speed: ${arrayItem.swing_speed}</h5>

    <div class="categroy ${TempoConverted == arrayItem.tempo ? "green" : ""}">
       <p class="catName">TEMPO : ${arrayItem.tempo} </p> 
    </div>

     <div class="categroy ${
       ReleaseConverted == arrayItem.relese ? "green" : ""
     }">
       <p class="catName">Release : ${arrayItem.relese} </p> 
    </div>


   <div class="categroy ${
     trajectoryConverted == arrayItem.trajectory ? "green" : ""
   }">
      <p class="catName"> TRAJECTORY : ${arrayItem.trajectory} </p> 
    </div>

   <div class="categroy ${SpinConverted == arrayItem.spin ? "green" : ""}">
       <p class="catName">SPIN :  ${arrayItem.spin}</p> 
   </div>

    <div class="categroy ${
      distanceConverted == arrayItem.distance_control ? "green" : ""
    }">
       <p class="catName">Disrtance or Control :  ${
         arrayItem.distance_control
       }</p> 
    </div>

     <div class="categroy  ${
       WeightConverted == arrayItem.weight ? "green" : ""
     }">
      <p class="catName"> Weight : ${arrayItem.weight}</p> 
    </div>

    <p class="p-total">(Point Total: ${arrayItem.count})</p>
    
    </div> </div>`;
    });

    $(".myResults").append(html);
  } else {
    let html = `<div class="no-results parent"> <div class="child"> <h3> Looks like This configuration has no results!</h3> <h5> Try changing your configuration material.. </h5>  </div> </div> `;
    $(".myResults").append(html);
  }
}

function filterSwingSpeed(value) {
  let unfiltered = value;
  let filtered = unfiltered.filter(
    (unfiltered) => $("#swing_speed").val() >= unfiltered.swing_speed_min
  );

  let filteredByMax = filtered.filter(
    (filtered) => $("#swing_speed").val() <= filtered.swing_speed_max
  );

  console.log("first filter", filtered);
  console.log("secound filter", filteredByMax);

  return filteredByMax;
}
function sortByKey(array, key) {
  return array.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
}

function CalcTemp(value) {
  console.log(value);
  let Tempo = "SMOOTH";
  if (value == 0) {
    Tempo = "SMOOTH";
  }
  if (value == 2.5) {
    Tempo = "MODERATE";
  }
  if (value == 5) {
    Tempo = "QUICK";
  }

  TempoConverted = Tempo;
  shafts.forEach(function (arrayItem) {
    if (arrayItem.tempo === Tempo) {
      arrayItem.count += 10;
    }
  });
  // console.log("tempo Shafts", shafts);
}

function CalcreleseRange(value) {
  let Release = "EARLY";
  if (value == 0) {
    Release = "EARLY";
  }
  if (value == 2.5) {
    Release = "MID";
  }
  if (value == 5) {
    Release = "LATE";
  }

  ReleaseConverted = Release;

  shafts.forEach(function (arrayItem) {
    if (arrayItem.relese === Release) {
      arrayItem.count += 10;
    }
  });
  // console.log("Relese Shafts", shafts);
}

function CalcTrajectory(value) {
  let Trajectory = "LOW";
  if (value == 0) {
    Trajectory = "LOW";
  }
  if (value == 2.5) {
    Trajectory = "MID";
  }
  if (value == 5) {
    Trajectory = "HIGH";
  }

  trajectoryConverted = Trajectory;
  shafts.forEach(function (arrayItem) {
    if (arrayItem.trajectory === Trajectory) {
      arrayItem.count += 10;
    }
  });
  // console.log("Trajectory Shafts", shafts);
}

function CalcSpin(value) {
  let spin = "LOW";
  if (value == 0) {
    spin = "LOW";
  }
  if (value == 2.5) {
    spin = "MID";
  }
  if (value == 5) {
    spin = "HIGH";
  }

  SpinConverted = spin;
  shafts.forEach(function (arrayItem) {
    if (arrayItem.spin === spin) {
      arrayItem.count += 10;
    }
  });
  // console.log("Spin Shafts", shafts);
}

function CalDistanceControl(value) {
  let DorC = "CONTROL";
  if (value == 0) {
    DorC = "CONTROL";
  }
  if (value == 2.5) {
    DorC = "DISTANCE/CONTROL";
  }
  if (value == 5) {
    DorC = "DISTANCE";
  }

  distanceConverted = DorC;

  shafts.forEach(function (arrayItem) {
    if (arrayItem.distance_control === DorC) {
      arrayItem.count += 10;
    }
  });
  // console.log("DISTANCE/CONTROL Shafts", shafts);
}

function Calcweight(value) {
  let Weight = "ULTRA LITE";
  if (value == 0) {
    Weight = "ULTRA LITE";
  }
  if (value == 2.5) {
    Weight = "LITE";
  }
  if (value == 5) {
    Weight = "MID";
  }
  if (value == 7.5) {
    Weight = "HEAVY";
  }
  if (value == 10) {
    Weight = "TOUR";
  }

  WeightConverted = Weight;

  shafts.forEach(function (arrayItem) {
    if (arrayItem.weight === Weight) {
      arrayItem.count += 10;
    }
  });
  // console.log("Results", shafts);
}

GetResults();
