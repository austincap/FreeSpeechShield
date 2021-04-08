var inputTitle = document.querySelector('.new-note input');
var inputBody = document.querySelector('.new-note textarea');
var noteContainer = document.querySelector('.note-container');
// var socket = io();
var clearBtn = document.querySelector('.clear');
var addBtn = document.querySelector('.add');
var submiturlBtn = document.querySelector('.submiturl');
/*  add event listeners to buttons */
addBtn.addEventListener('click', addNote);
clearBtn.addEventListener('click', clearAll);
submiturlBtn.addEventListener('click', emailurl);
/* generic error handler */
function onError(error) {
  console.log(error);
}

/* display previously-saved stored notes on startup */
initialize();
function initialize() {
  var gettingAllStorageItems = browser.storage.local.get(null);
  gettingAllStorageItems.then((results) => {
    var noteKeys = Object.keys(results);
    for (let noteKey of noteKeys) {
      var curValue = results[noteKey];
      displayNote(noteKey,curValue);
    }
  }, onError);
}

/* Add a note to the display, and storage */
function onGot(tabInfo) {
  console.log(tabInfo);
}
function addNote() {
  $("#intext").val('tet');
  browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var tab = tabs[0];
    var url = new URL(tab.url);
    var domain = url.hostname;
    socket.emit("getwindowlocation", {"url":url, "domain":domain});
  });
  var noteTitle = inputTitle.value;
  var noteBody = inputBody.value;
  var gettingItem = browser.storage.local.get(noteTitle);
  gettingItem.then((result) => {
    var objTest = Object.keys(result);
    if(objTest.length < 1 && noteTitle !== '' && noteBody !== '') {
      inputTitle.value = '';
      inputBody.value = '';
      storeNote(noteTitle,noteBody);
    }
  }, onError);
}


function storeNote(title, body) {
  var storingNote = browser.storage.local.set({ [title] : body });
  storingNote.then(() => { displayNote(title,body); }, onError);
}
function displayNote(title, body) {

  /* create note display box */
  var note = document.createElement('div');
  var noteDisplay = document.createElement('div');
  var noteH = document.createElement('h2');
  var notePara = document.createElement('p');
  var deleteBtn = document.createElement('button');
  var clearFix = document.createElement('div');

  note.setAttribute('class','note');

  noteH.textContent = title;
  notePara.textContent = body;
  deleteBtn.setAttribute('class','delete');
  deleteBtn.textContent = 'Delete note';
  clearFix.setAttribute('class','clearfix');

  noteDisplay.appendChild(noteH);
  noteDisplay.appendChild(notePara);
  noteDisplay.appendChild(deleteBtn);
  noteDisplay.appendChild(clearFix);

  note.appendChild(noteDisplay);

  /* set up listener for the delete functionality */

  deleteBtn.addEventListener('click',(e) => {
    const evtTgt = e.target;
    evtTgt.parentNode.parentNode.parentNode.removeChild(evtTgt.parentNode.parentNode);
    browser.storage.local.remove(title);
  })

  /* create note edit box */
  var noteEdit = document.createElement('div');
  var noteTitleEdit = document.createElement('input');
  var noteBodyEdit = document.createElement('textarea');
  var clearFix2 = document.createElement('div');

  var updateBtn = document.createElement('button');
  var cancelBtn = document.createElement('button');

  updateBtn.setAttribute('class','update');
  updateBtn.textContent = 'Update note';
  cancelBtn.setAttribute('class','cancel');
  cancelBtn.textContent = 'Cancel update';

  noteEdit.appendChild(noteTitleEdit);
  noteTitleEdit.value = title;
  noteEdit.appendChild(noteBodyEdit);
  noteBodyEdit.textContent = body;
  noteEdit.appendChild(updateBtn);
  noteEdit.appendChild(cancelBtn);

  noteEdit.appendChild(clearFix2);
  clearFix2.setAttribute('class','clearfix');

  note.appendChild(noteEdit);

  noteContainer.appendChild(note);
  noteEdit.style.display = 'none';

  /* set up listeners for the update functionality */

  noteH.addEventListener('click',() => {
    noteDisplay.style.display = 'none';
    noteEdit.style.display = 'block';
  })

  notePara.addEventListener('click',() => {
    noteDisplay.style.display = 'none';
    noteEdit.style.display = 'block';
  }) 

  cancelBtn.addEventListener('click',() => {
    noteDisplay.style.display = 'block';
    noteEdit.style.display = 'none';
    noteTitleEdit.value = title;
    noteBodyEdit.value = body;
  })

  updateBtn.addEventListener('click',() => {
    if(noteTitleEdit.value !== title || noteBodyEdit.value !== body) {
      updateNote(title,noteTitleEdit.value,noteBodyEdit.value);
      note.parentNode.removeChild(note);
    } 
  });
}
function updateNote(delNote,newTitle,newBody) {
  var storingNote = browser.storage.local.set({ [newTitle] : newBody });
  storingNote.then(() => {
    if(delNote !== newTitle) {
      var removingNote = browser.storage.local.remove(delNote);
      removingNote.then(() => {
        displayNote(newTitle, newBody);
      }, onError);
    } else {
      displayNote(newTitle, newBody);
    }
  }, onError);
}
function clearAll() {
  console.log("TEST");
  $("#intext").val('erase');
  while (noteContainer.firstChild) {
      noteContainer.removeChild(noteContainer.firstChild);
  }
  browser.storage.local.clear();
}


function emailurl() {
  console.log(window.location);
  socket.emit("suggesturl", window.location);
}

/**
 * Sends a request to the specified url
 * 
 * @param type The request type "GET", "POST", etc.
 * @param address The address to add to the SponsorBlock server address
 * @param callback 
 */
// async function sendRequestToCustomServer(type: string, url: string, data = {}) {
//     // If GET, convert JSON to parameters
//     if (type.toLowerCase() === "get") {
//         for (const key in data) {
//             const seperator = url.includes("?") ? "&" : "?";
//             const value = (typeof(data[key]) === "string") ? data[key]: JSON.stringify(data[key]);
//             url += seperator + key + "=" + value;
//         }
//         data = null;
//     }
//     const response = await fetch(url, {
//         method: type,
//         headers: {'Content-Type': 'application/json'},
//         redirect: 'follow',
//         body: data ? JSON.stringify(data) : null
//     });
//     return response;
// }

// async function submitVote(type: number, UUID: string, category: string) {
//     let userID = Config.config.userID;

//     if (userID == undefined || userID === "undefined") {
//         //generate one
//         userID = utils.generateUserID();
//         Config.config.userID = userID;
//     }

//     const typeSection = (type !== undefined) ? "&type=" + type : "&category=" + category;

//     //publish this vote
//     const response = await asyncRequestToServer("POST", "/api/voteOnSponsorTime?UUID=" + UUID + "&userID=" + userID + typeSection);

//     if (response.ok) {
//         return {
//             successType: 1,
//             responseText: await response.text()
//         };
//     } else if (response.status == 405) {
//         //duplicate vote
//         return {
//             successType: 0,
//             statusCode: response.status,
//             responseText: await response.text()
//         };
//     } else {
//         //error while connect
//         return {
//             successType: -1,
//             statusCode: response.status,
//             responseText: await response.text()
//         };
//     }
// }

// async function asyncRequestToServer(type: string, address: string, data = {}) {
//   const serverAddress = Config.config.testingServer ? CompileConfig.testingServerAddress : Config.config.serverAddress;
//   return await (sendRequestToCustomServer(type, serverAddress + address, data));
// }

function requestServerData(){
  AJAXSubmit("ete");
  console.log('requestServerData');
  $("#intext").val('requestServerData');
  // var Request = new XMLHttpRequest();
  // function requestHandler(data){
  //   var url = window.location.hostname;
  //   Request.open('POST', url, true);
  //   console.log('url');
  //   inputBody.value('tet');
  //   Request.onreadystatechange = sendData;
  //   Request.send(data);
  // } 
  // function sendData(){
  //   if (Request.readyState == 4 && Request.status == 200) {
  //     alert('Data sent ...');
  //   } else {
  //     alert('Connection FAIL,\nCheck connection and Retry !!!');
  //     console.log(Request);
  //   }
  // }
  // requestHandler('data');
}


function ajaxSuccess () {
  console.log('ajax success');
  console.log(this.responseText);
}
function AJAXSubmit (oFormElement) {
  if (!oFormElement.action) { return; }
  var oReq = new XMLHttpRequest();
  oReq.onload = ajaxSuccess;
  if (oFormElement.method.toLowerCase() === "post") {
    oReq.open("post", oFormElement.action);
    oReq.send(new FormData(oFormElement));
  } else {
    var oField, sFieldType, nFile, sSearch = "";
    for (var nItem = 0; nItem < oFormElement.elements.length; nItem++) {
      oField = oFormElement.elements[nItem];
      if (!oField.hasAttribute("name")) { continue; }
      sFieldType = oField.nodeName.toUpperCase() === "INPUT" ?
          oField.getAttribute("type").toUpperCase() : "TEXT";
      if (sFieldType === "FILE") {
        for (nFile = 0; nFile < oField.files.length;
            sSearch += "&" + escape(oField.name) + "=" + escape(oField.files[nFile++].name));
      } else if ((sFieldType !== "RADIO" && sFieldType !== "CHECKBOX") || oField.checked) {
        sSearch += "&" + escape(oField.name) + "=" + escape(oField.value);
      }
    }
    oReq.open("get", oFormElement.action.replace(/(?:\?.*)?$/, sSearch.replace(/^&/, "?")), true);
    oReq.send(null);
  }
}
window.onload = function () {
  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    title:{
      text:"Fortune 500 Companies by Country"
    },
    axisX:{
      interval: 1
    },
    axisY2:{
      interlacedColor: "rgba(1,77,101,.2)",
      gridColor: "rgba(1,77,101,.1)",
      title: "Number of Companies"
    },
    data: [{
      type: "bar",
      name: "companies",
      axisYType: "secondary",
      color: "#014D65",
      dataPoints: [
        { y: 3, label: "Sweden" },
        { y: 7, label: "Taiwan" },
        { y: 5, label: "Russia" },
        { y: 9, label: "Spain" },
        { y: 7, label: "Brazil" },
        { y: 7, label: "India" },
        { y: 9, label: "Italy" },
        { y: 8, label: "Australia" },
        { y: 11, label: "Canada" },
        { y: 15, label: "South Korea" },
        { y: 12, label: "Netherlands" },
        { y: 15, label: "Switzerland" },
        { y: 25, label: "Britain" },
        { y: 28, label: "Germany" },
        { y: 29, label: "France" },
        { y: 52, label: "Japan" },
        { y: 103, label: "China" },
        { y: 134, label: "US" }
      ]
    }]
  });
  chart.render();
  browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var tab = tabs[0];
    var url = new URL(tab.url);
    var domain = url.hostname;
    socket.emit("getwindowlocation", {"url":url, "domain":domain});
  });
}

const socket = io("ws://localhost:4567");

socket.on("connect", () => {
  socket.emit("salutations", "Hello!", { "mr": "john" }, Uint8Array.from([1, 2, 3, 4]));
});

socket.on("sendclientdata", data => {
  console.log("client received data");
  console.log(data);
  let dur = JSON.stringify(data);
  $("#intext").val(dur);
  updateInfoBox(data);
});

function updateInfoBox(data){
  console.log(data);
  if(data!=null){
    $("#intext").val(data.country);
    $("#url").text(data.url);
    $("#domain").text(data.domain);
    $("#country").text(data.country);
    $("#overallscore").text(data.overallscore);
    $("#nonowords").text(data.nonowords);
    $("#violations").text(data.violations);
    $("#aggressiveness").text(data.aggressiveness);
    data.ideology.forEach((elem)=>$("#ideology").append(" <span>"+elem+"</span>"));
    if(data.anonposting){$("#anonposting").text("");}
    if(data.barriertopost){$("#barriertopost").text("");}
    if(data.shadowban){$("#shadowban").text("");}
    if(data.permaban){$("#permaban").text("");}
    if(data.vagueguidelines){$("#vagueguidelines").text("");}
    if(data.noreasongiven){$("#noreasongiven").text("");}
    if(data.appealsprocess){$("#appealsprocess").text("");}
    if(data.censorcriminal){$("#censorcriminal").text("");}
    if(data.censorquasicriminal){$("#censorquasicriminal").text("");}

    var data = {
        labels: ["Political", "Pornographic", "Science", "Criminal", "Quasicriminal", "Heretical", "Historical"],
        datasets: [
            {
                label: "Censorship likelihoods",
                backgroundColor: "rgba(179,181,198,0.2)",
                borderColor: "rgba(179,181,198,1)",
                pointBackgroundColor: "rgba(179,181,198,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(179,181,198,1)",
                data: data.censorshiplikelihoods
            }
        ]
    };
    var ctx = document.getElementById("myChart");
    var options = {
            tooltips: {
              mode: 'label'
            }
        };
    var myRadarChart = new Chart(ctx, {
        type: 'radar',
        data: data,
        options: options
    });
    Chart.helpers.bindEvents(myRadarChart, ['mousedown'], function(evt) {
      var lastMousePosition = [evt.x, evt.y];
      console.log('mousedown');
      var lastActive = myRadarChart.lastActive;
      if (Array.isArray(lastActive) && lastActive.length) {
        lastActive = lastActive[0];
        console.log(lastActive);
        var moveHandler = function (evt) {
            var index = lastActive._index;
            var dataset = lastActive._datasetIndex;
            console.log('mouse move');
            if (evt.y < lastMousePosition[1]) {
              myRadarChart.data.datasets[dataset].data[index] = myRadarChart.data.datasets[dataset].data[index] + 1;
              myRadarChart.update(1, false);
            } else if (evt.y > lastMousePosition[1]) {
              myRadarChart.data.datasets[dataset].data[index] = myRadarChart.data.datasets[dataset].data[index] - 1;
              myRadarChart.update(1, false);
            }
          lastMousePosition = [evt.x, evt.y];
        };
        var outHandler = function () {
          console.log('unbinding');
          Chart.helpers.unbindEvents(myRadarChart, {'mousemove': moveHandler});
          Chart.helpers.unbindEvents(myRadarChart, {'mouseup': outHandler});
          Chart.helpers.unbindEvents(myRadarChart, {'mouseout': outHandler});
        }
        Chart.helpers.bindEvents(myRadarChart, ['mousemove'], moveHandler);
        Chart.helpers.bindEvents(myRadarChart, ['mouseup'], outHandler);
        Chart.helpers.bindEvents(myRadarChart, ['mouseout'], outHandler);
      }
    });
  }else{
    $("#intext").val("it looks like this online community has not been audited yet. click the button below to request a free speech audit");
    $(".submiturl").css("display", "block");
  }
}


// ,
//           {
//               label: "My Second dataset",
//               backgroundColor: "rgba(255,99,132,0.2)",
//               borderColor: "rgba(255,99,132,1)",
//               pointBackgroundColor: "rgba(255,99,132,1)",
//               pointBorderColor: "#fff",
//               pointHoverBackgroundColor: "#fff",
//               pointHoverBorderColor: "rgba(255,99,132,1)",
//               data: [28, 48, 40, 19, 96, 27, 100]
//           }