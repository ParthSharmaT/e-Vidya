window.addEventListener("load",bindEvents);

function bindEvents(){
    printTotalRecords();
    printId();
    document.getElementById('add').addEventListener("click",addQues);
    document.getElementById('delete').addEventListener("click",deleteQues);
    document.getElementById("update").addEventListener("click",updateItem);
    document.getElementById("clear").addEventListener("click",clearTable);
    document.getElementById("savelocal").addEventListener("click",saveLocal);
    document.getElementById("fetchlocal").addEventListener("click",fetchLocal);

}

function clearTable(){
 document.getElementById("itemtable").innerHTML=""; 
    itemOperations.id=1;
}

function saveLocal(){
	if(window.localStorage){
		localStorage.myitemslist=JSON.stringify(itemOperations.itemList);
		alert("Data Store...");
	}
	else{
		alert("Ur Browser Doesn't Support LocalStorage...");
	}
}

function fetchLocal(){
	if(window.localStorage){
		if(localStorage.myitemslist){
			itemOperations.itemList = JSON.parse(localStorage.myitemslist);
			printTable();
		}
		else{
			alert("Nothing to Load...");
		}
	}
	else{
		alert("Ur Browser Doesn't Support LocalStorage...");
	}
	
}

function deleteQues(){
itemOperations.deleteItem();
	printTable();
}

function updateItem(){
	 itemObjectEdit.id= document.getElementById("quesid").innerHTML ;
	 itemObjectEdit.ques= document.getElementById("ques").value  ;
	itemObjectEdit.option1= document.getElementById("option1").value  ;
	   itemObjectEdit.option2 = document.getElementById("option2").value;
	 itemObjectEdit.option3 = document.getElementById("option3").value ;
	 itemObjectEdit.option4=document.getElementById("option4").value;
	 itemObjectEdit.ans=document.getElementById("ans").value;
    
	printTable();
}

function deleteItem(){
itemOperations.deleteItem();
	printTable();
}

const printId= () =>{
    document.getElementById("quesid").innerHTML=itemOperations.id;
}

function printTotalRecords(){
document.getElementById("total").innerHTML=itemOperations.itemList.length;    
document.getElementById("marktotal").innerHTML = itemOperations.countMark();    
}

function addQues(){
    var ques=
    document.getElementById("ques").value;
    var option1=document.getElementById("option1").value;
    var option2=document.getElementById("option2").value;
    var option3=document.getElementById("option3").value;
    var option4=document.getElementById("option4").value;
    var ans=document.getElementById("ans").value;
    itemOperations.addItem(ques,option1,option2,option3,option4,ans);
    var lastObject = itemOperations.itemList[itemOperations.itemList.length-1];
    printRecord(lastObject);
    
}


function printIcon(path,cls,fun,id)
{
    var image=document.createElement("img");
    image.src=path;
    image.className=cls;
    image.setAttribute("ques-id",id);
    image.addEventListener("click",fun);
    return image;
}

function markForDelete(event){
    var tr=event.srcElement.parentNode.parentNode;
    tr.classList.toggle("redrow");
    var id=event.srcElement.getAttribute("ques-id");
    itemOperations.markRecordDelete(id);
    printTotalRecords();
}

var itemObjectEdit ;

function editRecord(event){
	var id = event.srcElement.getAttribute("ques-id");
	var index= itemOperations.searchById(id);
	 itemObjectEdit = itemOperations.itemList[index];
	document.getElementById("quesid").innerHTML = itemObjectEdit.id;
	 document.getElementById("ques").value = itemObjectEdit.ques;
	 document.getElementById("option1").value = itemObjectEdit.option1;
	 document.getElementById("option2").value = itemObjectEdit.option2;
	 document.getElementById("option3").value = itemObjectEdit.option3;
	 document.getElementById("option4").value= itemObjectEdit.option4;
	//alert("Edit Record....");
}
function printTable(){
    document.getElementById("itemtable").innerHTML="";
    itemOperations.itemList.forEach((itemObject)=>printRecord(itemObject));
}


function printRecord(itemObject){
    printTotalRecords();
    printId();
    
    var tbody=document.getElementById("itemtable");
    var tr = tbody.insertRow();
    var index = 0;
    for(let key in itemObject){
        if (key=='markForDelete'){
            continue;
        }
        tr.insertCell(index).innerHTML=itemObject[key];
        index++;
    }
    var deleteIcon = printIcon('images/delete.png','imagestyle',markForDelete,itemObject.id);
    var td = tr.insertCell(index);
    td.appendChild(deleteIcon);
    var editIcon = printIcon('images/edit.png','imagestyle',editRecord,itemObject.id);
    td.appendChild(editIcon);
}
