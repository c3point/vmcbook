function exportCSV(e) {
  var fig = e.parentElement.parentElement; /* e is an <a> inside a <div> inside a <figure> */
  var rows = fig.querySelectorAll("table tr");
  var csv = [];
  for (var i = 0; i < rows.length; i++) {
    var row = [], cols = rows[i].querySelectorAll("td, th");
    for (var j = 0; j < cols.length; j++){ 
      var txt = cols[j].textContent;
      txt.replace(/"/g, '""'); // escape quotes
      txt.replace(/\n/g, ' '); // replace newlines with a space
      row.push('"' + txt.trim() + '"'); // double quote the value
    }
    csv.push(row.join(","));        
  }
  csvFile = new Blob([csv.join("\n")], {type: "text/csv"});
  // we create a temporary <a> for the download, click it, then delete it
  var downloadLink = document.createElement("a");
  downloadLink.download = "table.csv";
  downloadLink.href = window.URL.createObjectURL(csvFile);
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  downloadLink.parentElement.removeChild(downloadLink);
}

function leftNavClick(e){
  var parent = e.parentElement;
  var classList = parent.classList;
  if(classList.contains("open")) {
    classList.remove('open');
    var opensubs = parent.querySelectorAll(':scope .open');
    for(var i = 0; i < opensubs.length; i++){
      opensubs[i].classList.remove('open');
    }
  } else {
    classList.add('open');
  }
}

function mdEditorTabsToggle(e, target){
  if (!e.classList.contains("md-editor-inactive")){
    return;
  }
  if (target == "md-preview"){
    var src = document.getElementById("md-textarea");
    var dst = document.getElementById("md-preview");
    dst.innerHTML = md.render(src.value);
  }
  var parent = e.parentElement;
  var spans = parent.querySelectorAll("span");
  for (var i = 0; i < spans.length; i++) {
    var span = spans[i];
    if (e === span){
      span.classList.remove("md-editor-inactive");
    } else{
      span.classList.add("md-editor-inactive");
    }
  }
  
  var editor = document.getElementById("md-editor");
  for (var i = 0; i < editor.children.length; i++) {
    var child = editor.children[i];
    if (child.id == target){
      child.classList.remove("md-editor-inactive");
    } else{
      child.classList.add("md-editor-inactive");
    }
  }
}
