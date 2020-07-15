const itemOperations = {
    
    itemList:[],
    id:1,
    
    addItem(ques,option1,option2,option3,option4,ans){
        var itemObject = new item(this.id,ques,option1,option2,option3,option4,ans);
        this.itemList.push(itemObject);
        this.id++;
    },
    
    deleteItem(){
        return this.itemList=
            this.itemList.filter(function (itemObject){
                console.log("item is ",itemObject);
            return itemObject.markForDelete == false;
        });
    },
    
    searchById(id){
	var index = this.itemList.findIndex(function(itemObject){
		return itemObject.id ==id;
	});
	return index;
    },
    countMark(){
	return this.itemList.filter(function(itemObject){
		return itemObject.markForDelete ;
	}).length;
    },    
    
    markRecordDelete(id){
	var index = this.searchById(id);
    var itemObject = this.itemList[index];
    console.log("item is ",itemObject);
    itemObject.markForDelete =!itemObject.markForDelete;
    console.log(itemObject.toggleDelete,itemObject.markForDelete);
    }
}
