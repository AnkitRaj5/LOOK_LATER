const save_Btn = document.querySelector("#input_btn");
var data = [];
const input_Btn = document.querySelector("#input_el");
const ul_El = document.querySelector("#ul_el");
const dataLocalStorage = JSON.parse(localStorage.getItem("bookmark"));
const delBtn = document.querySelector("#del_btn");
const tabBtn = document.querySelector("#tab_btn");
input_Btn.addEventListener("click",function(){
    input_Btn.value="";
})
if(dataLocalStorage){
    data=dataLocalStorage;
    render(data);
}
tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        data.push(tabs[0].url)
        localStorage.setItem("bookmark", JSON.stringify(data));
        render(data)
    })
})
delBtn.addEventListener("click",function(){
    localStorage.clear();
    data.length=0;
    render(data);
});
save_Btn.addEventListener("click",function(){
    input_Btn.value = '';
    data.push(input_Btn.value);
    localStorage.setItem("bookmark",JSON.stringify(data));
    render(data);
    input_Btn.value = '';
});
function render(lists){
    let listItems = "";
    for (let i = 0; i < lists.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${lists[i]}'>
                    ${lists[i]}
                </a>
            </li>
        `
    }
    ul_El.innerHTML = listItems  
}