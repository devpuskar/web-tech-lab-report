var div = document.querySelector('#searching');
var input = document.querySelector('#input-search');
var list = document.querySelector('#list');
var listItems = document.querySelectorAll('#list li');
var containerSearch = document.querySelector('.container-input');
var body = document.querySelector('body');
var previousInputValue = '';
var delayMS = 1500;
var timer;
var minLength = parseInt(document.getElementById('minLength').value);
var cooldownMS = parseInt(document.getElementById('cooldownMS').value) * 1000;
var cooldown = false;


handleListItems();

// Collapse list when you click outside search field
body.addEventListener('click', function(e) {
  if (e.target == body)
    list.innerHTML = '';
});

// Expand list when you click the search field
input.addEventListener('focus', function() {
  if (input.value !== '' && list.innerHTML === '')
    getNewList(input.value);
});


// When you type in the search field
input.addEventListener('keyup', function(e) {
  onSearchChange(e);
});


// Set minLength from html settings
document.getElementById('minLength').addEventListener('keyup', function() {
  minLength = this.value;
});

// Set cooldownMS from html settings
document.getElementById('cooldownMS').addEventListener('keyup', function() {
  cooldownMS = this.value * 1000;
});



function clickListItem (li) {
  input.value = li.innerText;
  input.focus();
  list.innerHTML = '';
}


function getNewList(searchValue) {
  list.innerHTML = '';
  
  var newList = countries.filter(function(val) {
    return val.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
  });
  
  newList.forEach(function(val) {
    list.innerHTML += 
      '<li><span>' +
      val.name +
      '</span><div class="li-img" style="background-image: url(http://cristiroma.github.io/countries/data/flags/' +
      val.flag_32 +
      ')"></div></li>';
  });
  
  listItems = document.querySelectorAll('#list li');
  
  handleListItems();
  
}

function handleListItems () {
  listItems.forEach(function(li) {

    li.tabIndex = "0";


    li.addEventListener('click', function() {
      clickListItem(li);
    });
    li.addEventListener('keyup', function(e) {
      switch (e.keyCode) {

        case 38: // Key Up
          li.previousElementSibling.focus();
          return;

        case 40: // Key Down
          li.nextElementSibling.focus();
          return;

        case 13:
          clickListItem(li);
      }
    });
  });
}

function onSearchChange(e) {
  if (input.value === '')
    list.innerHTML = '';
  
  if (e.keyCode === 40 || e.keyCode === 9) {
    listItems[0].focus();
  }
  
  if (
    input.value.length >= minLength
    && !cooldown
    && input.value !== previousInputValue.slice(0, -1)
    && input.value !== previousInputValue
    && input.value !== previousInputValue + ' '
    ) {
    
    
    // Set cooldown before API can request again
    cooldown = true;
    setTimeout(function() {
      cooldown = false;
    }, cooldownMS);
    
    
    // Only request API if characters > minLength
    clearTimeout(timer); // Stop current request
    div.style.opacity = 1;
    timer = setTimeout(function() {
      div.style.opacity = 0;
      getNewList(input.value);
    }, delayMS);
    
  }
  
  previousInputValue = input.value;
}

var countries = [
{
    id: "115",
    enabled: "1",
    code3l: "NPL",
    code2l: "NP",
    name: "Nepal",
    name_official: "Federal Democratic Republic of Nepal",
    flag_32: "NP-32.png",
    flag_128: "NP-128.png",
    latitude: "28.28430770",
    longitude: "83.98119373",
    zoom: "7"
},
];