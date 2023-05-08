// SELECTING THE REQUIRED ELEMENT THOSE ARE NEEDED TO SELECT HERE
// ---------------------------------------------------------------------------

let theadTr = document.querySelector(".table-headCol");
let tBody = document.querySelector(".table-body");
let FocusedTdCell;
let cutValue;
// let copiedValue;
// buttons
let italic_btn = document.getElementById("italic-btn");
let underline_btn = document.getElementById("underline-btn");
let bold_btn = document.getElementById("bold-btn");

//color input Elements
let bg_color = document.getElementById("bg-color");
let text_color = document.getElementById("text-color");

//text alignment in a cell
let left_align = document.getElementById("left");
let right_align = document.getElementById("right");
let center_align = document.getElementById("center");
// choose font size from select element
let font_size = document.getElementById("font-size");
// choose element to select font family
let font_family = document.getElementById("font-family");

// select element to copy ,paste and  cut
let copy = document.getElementById("copy");
let cut = document.getElementById("cut");
let paste = document.getElementById("paste");
// ----------------------------------------------------------------------------------------------
let rows = 100;
let cols = 26;
// created a matrix to save data
let matrix = new Array(rows);
//created array to store data of All individual sheets data
let arrOfSheets = [matrix];
let nofSheets = 0;
let currSheetNum = 0;
for (let i = 0; i < rows; i++) {
  matrix[i] = new Array(cols);
  for (let j = 0; j < cols; j++) {
    matrix[i][j] = {};
  }
}

for (let i = 0; i < cols; i++) {
  //creating the th element and appending in thead element
  let th = document.createElement("th");
  th.innerText = String.fromCharCode(i + 65);
  theadTr.appendChild(th);
}

for (let i = 0; i < rows; i++) {
  //creating the tr and th element and appending in tbody
  let tr = document.createElement("tr");
  let th = document.createElement("th");
  th.innerText = i + 1;
  tr.appendChild(th);

  for (let j = 0; j < 26; j++) {
    //appending the tds(columns) in each row
    var td = document.createElement("td");
    td.setAttribute("contenteditable", "true");

    td.setAttribute("spellcheck", "false");
    // console.log(`${String.fromCharCode(j + 65)}${i + 1}`);
    td.setAttribute("id", `${String.fromCharCode(j + 65)}${i + 1}`);
    td.addEventListener("focus", (event) => onfocusToTd(event));
    // td.addEventListener("input", (event) => console.log(event));

    td.addEventListener("input", (event) => onInputToTd(event));

    tr.appendChild(td);
  }

  tBody.appendChild(tr);
}

const trs = document.querySelectorAll("tr");

function onInputToTd() {
  // console.log("hi");
  saveDataInMat(FocusedTdCell);
}

function onfocusToTd(event) {
  FocusedTdCell = event.target;
  document.getElementById("cellNo").innerText = event.target.id;
  console.log(document.getElementById("cellNo"));
  saveDataInMat(FocusedTdCell);
}

// ---------------------------------------------------------------------------------------------

//AddeventListner for italic,bold and other

bold_btn.addEventListener("click", () => {
  // console.log(FocusedTd);

  console.log(FocusedTdCell.style.fontWeight == "bold");
  if (FocusedTdCell.style.fontWeight == "bold") {
    FocusedTdCell.style.fontWeight = "normal";
    // console.log(FocusedTd);
  } else {
    FocusedTdCell.style.fontWeight = "bold";
  }
  // console.log(FocusedTd);
  saveDataInMat(FocusedTdCell);
});

underline_btn.addEventListener("click", () => {
  // console.log(FocusedTd);

  console.log(FocusedTdCell.style.textDecoration == "underline");
  if (FocusedTdCell.style.textDecoration == "underline") {
    FocusedTdCell.style.textDecoration = "none";
    // console.log(FocusedTd);
  } else {
    FocusedTdCell.style.textDecoration = "underline";
  }
  // console.log(FocusedTd);
  saveDataInMat(FocusedTdCell);
});

italic_btn.addEventListener("click", () => {
  // console.log(FocusedTd);

  console.log(FocusedTdCell.style.fontStyle == "italic");
  if (FocusedTdCell.style.fontStyle == "italic") {
    FocusedTdCell.style.fontStyle = "normal";
    // console.log(FocusedTd);
  } else {
    FocusedTdCell.style.fontStyle = "italic";
  }
  // console.log(FocusedTd);
  saveDataInMat(FocusedTdCell);
});

// --------------------------------------------------------------------------
//AddEventListner for the color of text and bg
text_color.addEventListener("input", () => {
  FocusedTdCell.style.color = text_color.value;
  saveDataInMat(FocusedTdCell);
  console.log(matrix);
});

bg_color.addEventListener("input", () => {
  FocusedTdCell.style.backgroundColor = bg_color.value;
  saveDataInMat(FocusedTdCell);
  console.log(matrix);
});
//-----------------------------------------------------------------------------

// addEvent listner for the text alignment in a cell

left_align.addEventListener("click", () => {
  FocusedTdCell.style.textAlign = "left";
  saveDataInMat(FocusedTdCell);
  console.log(matrix);
});

right_align.addEventListener("click", () => {
  FocusedTdCell.style.textAlign = "right";
  saveDataInMat(FocusedTdCell);
  console.log(matrix);
});

center_align.addEventListener("click", () => {
  FocusedTdCell.style.textAlign = "center";
  saveDataInMat(FocusedTdCell);
  console.log(matrix);
});

//-----------------------------------------------------------------------------------
//addEventListener for  selecting the font size of cell
font_size.addEventListener("change", (event) => {
  // console.log(event.target.value);
  // FocusedTdCell.style.fontSize = event.target.value;
  FocusedTdCell.style.fontSize = font_size.value;
  saveDataInMat(FocusedTdCell);
  console.log(matrix);
});

// --------------------------------------------------------------------------------------
// addevent listner for selecting the font family
font_family.addEventListener("change", () => {
  FocusedTdCell.style.fontFamily = font_family.value;
  saveDataInMat(FocusedTdCell);
  console.log(matrix);
});

// ----------------------------------------------------------------------------------------
// addEventlisner for  copy ,paste and cut

cut.addEventListener("click", () => {
  cutValue = {
    //accessing the all CSS properties
    style: FocusedTdCell.style.cssText,
    text: FocusedTdCell.innerText,
  };
  saveDataInMat(FocusedTdCell);
  FocusedTdCell.style.cssText = null;
  FocusedTdCell.innerText = null;
  //  console.log(cutValue)
});

paste.addEventListener("click", () => {
  //applying the all CSS properties which has been hold already

  FocusedTdCell.innerText = cutValue.text;
  FocusedTdCell.style.cssText = cutValue.style;
  saveDataInMat(FocusedTdCell);
});

copy.addEventListener("click", () => {
  cutValue = {
    style: FocusedTdCell.style.cssText,
    text: FocusedTdCell.innerText,
  };
  saveDataInMat(FocusedTdCell);
  console.log(cutValue);
});
// --------------------------------------------------------------------------------
// Save Data in array of arrays's of objects(matrix of objects)
function saveDataInMat(currCell) {
  var obj = {
    style: currCell.style.cssText,
    text: currCell.innerText,
    id: currCell.id,
  };

  let idArr = obj.id.split("");
  // console.log(idArr);
  //Cell position co-ordinates
  let i = idArr[1] - 1;
  let j = idArr[0].charCodeAt(0) - 65;
  matrix[i][j] = obj;
  console.log("saved arr", matrix);
}
// --------------------------------------------------------------------------------------------------
// downloading json file
function downloadJson() {
  // Define your JSON data

  // Convert objects to JSON format to a string
  const jsonString = JSON.stringify(matrix);
  // console.log(typeof jsonString);

  // Create a Blob with the JSON data string in array and set its MIME type to application/json
  const blob = new Blob([jsonString], { type: "application/json" });
  console.log(blob);

  // Create an anchor element and set its href attribute to the Blob URL
  const link = document.createElement("a");
  console.log(link);
  link.href = URL.createObjectURL(blob);
  // console.log(link.href);
  link.download = "data.json"; // Set the desired file name

  // Append the link to the document, click it to start the download, and remove it afterward
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// --------------------------------------------------------------------------------

// document.getElementById("choosefile1").style.display = "none";

function chooseFile() {
  // console.log("working");
  document
    .getElementById("choosefile1")
    .addEventListener("input", readJsonFile);
}
// ------------------------------------------------------------------------------------
// uploading of file

function readJsonFile(event) {
  // console.log("working now")
  const file = event.target.files[0];
  console.log(file);
  //returning the files list object but accessing the

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const fileContent = e.target.result;
      // {id,style,text}
      // Parse the JSON file content and process the data

      try {
        const jsonData = JSON.parse(fileContent);
        // console.log(typeof jsonData);
        console.log("matrix2", jsonData);
        matrix = jsonData;
        jsonData.forEach((row) => {
          // console.log(row);
          row.forEach((cell) => {
            if (cell.id) {
              var myCell = document.getElementById(cell.id);

              console.log(cell);
              myCell.innerText = cell.text;
              myCell.style.cssText = cell.style;
            }
          });
        });
        // Process the JSON data as needed
      } catch (error) {
        console.error("Error parsing JSON file:", error);
      }
    };

    reader.readAsText(file);
  }
}

// ---------------------------------------------------------------------------
// Adding the new sheet task here//

let addSheetBtn = document.getElementById("addSheet");
console.log(addSheetBtn);

let sheetsAll = document.querySelector(".sheets");
// // console.log(matrix);

addSheetBtn.addEventListener("click", () => {
  console.log("working");
  if (nofSheets == 0) {
    arrOfSheets = [matrix];
    localStorage.setItem("arrOfSheets", JSON.stringify(arrOfSheets));
  } else {
    let holdArrOfSheets = JSON.parse(localStorage.getItem("arrOfSheets"));

    console.log(Array.isArray(holdArrOfSheets));
    arrOfSheets = [...holdArrOfSheets, matrix];
    localStorage.setItem("arrOfSheets", JSON.stringify(arrOfSheets));
  }

  currSheetNum = nofSheets;
  nofSheets++;
  console.log("ss");

  let spanElement = document.createElement("span");
  spanElement.classList.add("class", "material-icons");
  spanElement.setAttribute("id", `${currSheetNum}`);
  spanElement.setAttribute("onclick", "showCurrSheetData(this)");
  // console.log("working");
  spanElement.textContent = "file_present";
  sheetsAll.appendChild(spanElement);

  // Creating a new matrix for current sheet with empty objects
  for (let i = 0; i < rows; i++) {
    matrix[i] = new Array(cols);
    for (let j = 0; j < cols; j++) {
      matrix[i][j] = {};
    }
  }
  //   // console.log(matrix);

  //   //emptying the tbody again render all tbody content

  tBody.innerHTML = ``;
  for (let i = 0; i < rows; i++) {
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    th.innerText = i + 1;
    tr.appendChild(th);
    // console.log(tr);
    for (let j = 0; j < cols; j++) {
      let td = document.createElement("td");
      td.setAttribute("contenteditable", true);
      td.setAttribute("spellcheck", "false");
      // console.log(`${String.fromCharCode(j + 65)}${i + 1}`);
      td.setAttribute("id", `${String.fromCharCode(j + 65)}${i + 1}`);
      td.addEventListener("click", (event) => onfocusToTd(event));
      // td.addEventListener("input", (event) => console.log(event));

      td.addEventListener("input", (event) => onInputToTd(event));

      tr.appendChild(td);
    }

    tBody.appendChild(tr);
  }
});

function showCurrSheetData(event) {
  //deleting the previous data from sheet

  let allTr = document.getElementsByTagName("tr");
  for (let i = 1; i < allTr.length; i++) {
    let Alltds = allTr[i].getElementsByTagName("td");
    console.log(Alltds);
    for (let j = 0; j < Alltds.length; j++) {
      Alltds[j].textContent = null;
      Alltds[j].style.cssText = null;
    }
  }

  //showing the current data
  console.log(event.id);
  var holdArrSheet = JSON.parse(localStorage.getItem("arrOfSheets"));

  let tableData = holdArrSheet[event.id];
  // console.log(holdArrSheet[0]);
  matrix = tableData;

  tableData.forEach((row) => {
    row.forEach((cell) => {
      if (cell.id) {
        var myCell = document.getElementById(cell.id);
        myCell.innerText = cell.text;
        myCell.style.cssText = cell.style;
      }
    });
  });
}

//Removing one by one file  sheet which has been created from UI and localstorage
document.getElementById("removeFile").addEventListener("click", (event) => {
  arrOfSheets = JSON.parse(localStorage.getItem("arrOfSheets"));
  console.log(arrOfSheets);
  if (arrOfSheets.length > 0) {
    arrOfSheets.splice(arrOfSheets.length - 1, 1);
    localStorage.setItem("arrOfSheets", JSON.stringify(arrOfSheets));
    sheetsAll.removeChild(sheetsAll.lastChild);
  }
});
