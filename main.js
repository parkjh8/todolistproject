//유저가 값 입력
//+ 버튼 클릭시 할일 추가
//delete버튼 클릭하면 할일 삭제
//check 버튼 누르면 할일이 끝나면서 밑줄이 간다.
//1.check 버튼을 클릭하는 순간 true false
//2.true 될시 끝난걸로 간주하고 밑줄 보여주기
//3.false 될시 
//진행중 끝남 탭을 누르면, 언더바가 이동한다.
//끝나탭은 끝난 아이템만, 진행중인 아이템은 진행중인탭만...
//전체탭을 누르면 다시 전체 아이템으로 돌아옴


let textInput = document.getElementById("text-input");
let addButton = document.getElementById("add_button");
let taskList=[];
let tabs=document.querySelectorAll(".task-tabs div");
let mode="all";
let filterList=[];
addButton.addEventListener("click",addTask)



for(let i=1;i<tabs.length;i++){
    tabs[i].addEventListener("click",function(event){filter(event)})
}


function addTask(){
    let task = {
        id:RandomIdGenerate(),
        taskContent: textInput.value,
        isComplete:false
    }
    taskList.push(task);
    console.log(taskList);
    render()
}

function render(){
    let list=[];
    if(mode=="all"){
        list=taskList;
    }else if(mode =="ongoing" || mode=="done"){
        list=filterList;
    }
    let resultHTML = ``;
    for(let i=0;i<list.length;i++){
        if(list[i].isComplete==true){
            resultHTML+=`<div class="task">
            <div class="task-done">
               ${list[i].taskContent}
            </div>
            <div>
                <button onclick="toggleComplete(${list[i].id})">Check</button>
                <button onclick="DeleteComplete(${list[i].id})">Delete</button>
            </div>
        </div>`
        }else{
        resultHTML += `<div class="task">
        <div>
           ${list[i].taskContent}
        </div>
        <div>
            <button onclick="toggleComplete(${list[i].id})">Check</button>
            <button onclick="DeleteComplete(${list[i].id})">Delete</button>
        </div>
    </div>`
    }
}

    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
    console.log("id값은",id);
    for(let i=0;i<taskList.length;i++)
        if(taskList[i].id == id){
            taskList[i].isComplete=!taskList[i].isComplete;
            break;
        }
        render();
}


function RandomIdGenerate(){
    return Date.now();
}

function DeleteComplete(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break;
        }
    }
    render();
}

function filter(event){
    mode=event.target.id;
    filterList=[];
    if(mode == "all"){
        render()
    }else if(mode =="ongoing"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete==false){
                filterList.push(taskList[i])
            }
        render()
        }
    }else if(mode =="done"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete==true){
                filterList.push(taskList[i])
            }
        }
        render()
    }
    console.log(filterList)
}