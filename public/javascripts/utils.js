var cc = 0;

function addElement(list_str, button_id, textarea) {
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
    option.innerHTML = "Atributo...";
    select.appendChild(option);
    for (var elem of list_str) {
        var option = document.createElement("option");
        option.value = elem;
        option.innerHTML = elem;
        select.appendChild(option);
    }
    newElement.appendChild(select);
    if (textarea == 'true') {
        var value = document.createElement("textarea");
        value.rows=1
    }
    else {
      var value = document.createElement("input");
      value.type = "text";
    }
    value.name=button_id+cc+".value"
    value.className = "form-control w-65";
    value.placeholder = "Valor"
    value.ariaDescribedBy = "button-addon2";
    newElement.appendChild(value);
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
