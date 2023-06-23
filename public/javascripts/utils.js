var cc = 0;

function addElement(list_str, button_id) {
    const new_button_id = button_id + cc;
    var newElement = document.createElement("div");
    newElement.className = "input-group mb-3";
    newElement.id = new_button_id;
    var select = document.createElement("select");
    select.name=button_id+cc+".key"
    select.className = "form-select";
    select.id = "inputGroupSelect02";
    var option = document.createElement("option");
    option.selected = "";
    option.value = "";
    option.innerHTML = "Choose...";
    select.appendChild(option);
    for (var elem of list_str) {
        var option = document.createElement("option");
        option.value = elem;
        option.innerHTML = elem;
        select.appendChild(option);
    }
    newElement.appendChild(select);
    var input = document.createElement("input");
    input.name=button_id+cc+".value"
    input.className = "form-control";
    input.type = "text";
    input.placeholder = "Recipient's username";
    input.ariaLabel = "Recipient's username";
    input.ariaDescribedBy = "button-addon2";
    newElement.appendChild(input);
    var button = document.createElement("button");
    button.className = "btn btn-outline-danger";
    button.id = "button-addon2";
    button.type = "button";
    button.addEventListener('click', removeElement.bind({element_id:new_button_id}));
    var i = document.createElement("i");
    i.className = "bi bi-dash-lg";
    button.appendChild(i);
    newElement.appendChild(button);
    

    var origin_button = document.getElementById(button_id);
    origin_button.parentNode.insertBefore(newElement, origin_button);
    cc++;
  }

  function removeElement() {
    var element = document.getElementById(this.element_id);
    element.parentNode.removeChild(element);
  }

  function removeElementById(element_id) {
    var element = document.getElementById(element_id);
    element.parentNode.removeChild(element);
  }
