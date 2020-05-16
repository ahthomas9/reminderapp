/* VARIABLES */
var input;
var list;
var id;

/**********************************************************************
****************************** LOCAL **********************************
***********************************************************************/
//set  data
const reminderList = localStorage.getItem("reminder");

/* CHECKING */
if (!reminderList) {
    list = [];
    id = 0;
} else {
    list = JSON.parse(reminderList);
    id = list.length;
    loadList(list); //function to load data
}

/* LOAD DATA */
function loadList(reminders){
    reminders.forEach(function(item){
        showReminder(item.name, item.id);
    });
};

/* EMPTY ALL */
document.getElementById("clearAll").addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

/**********************************************************************
***************************** FUNCTIONS *******************************
***********************************************************************/

/************************ PUSH TO ARRAY ************************/ 
function showReminder(input, id) {
    let content = `<li> ${input} <span id=${id} class="delete"><i class="fa fa-trash-o de" id="trash"></i></span> </li>`;
    
    //add to displayList div
    document.getElementById("displayList").insertAdjacentHTML("beforeend", content);
};

    //click function
function addonClick() {
    input = document.getElementById('input').value;
    let content = `<li> ${input} <span id=${id} class="delete"><i class="fa fa-trash-o de" id="trash"></i></span> </li>`

    if (input === "") {
        alert("We can't remind you of nothing! Please try again.");
    } else {

    //add to array
    list.push({
        id: id,
        name: input
    });
    
    //add to local data
    localStorage.setItem("reminder", JSON.stringify(list));

    id++;

    //set displayList
    document.getElementById("displayList").insertAdjacentHTML("beforeend", content);
    }

    //reset input box
    document.getElementById('input').value="";
};
    //click trigger
    document.getElementById("setReminder").addEventListener("click", addonClick);
    
    //keycode for ENTER to trigger
    $("#input").keypress(function(e) {
        if (e.keyCode === 13) {
            addonClick();
        };
});

/************************ TOGGLE ARRAY ************************/
function toggleList() {
    $("#toggleList").fadeToggle("hide show", "linear");
};
    //up/down chevron
document.getElementById("reminderList").addEventListener("click", function() {
    $("#dropdown").toggleClass("fa-angle-double-down fa-angle-double-up");
});

/************************ TRASH ************************/
// button

$(document).on("click", ".delete", function(e){
    id = e.target.parentNode.id; //id of reminder clicked
    let idLi = e.target.parentNode.parentNode; //<li> tags
    let ul = document.getElementById("displayList");

    //loop through array to get item
    for (i = 0; i < list.length; i++) {
        if (list[i].id == id) {
            list.splice(i, 1);
            break;
        }
    }

    //update list
    localStorage.setItem("reminder", JSON.stringify(list));

    //remove it
    ul.removeChild(idLi);

    //remove localStorage if empty
    if (localStorage.getItem("reminder") == "[]") {
        localStorage.removeItem("reminder");
    };
})