class item{
    
    constructor(id,ques,option1,option2,option3,option4,ans)
    {
        this.id=id;
        this.ques=ques;
        this.option1=option1;
        this.option2=option2;
        this.option3=option3;
        this.option4=option4;
        this.ans=ans;
        this.markForDelete=false;
        
    }
    toggleDelete(){
        this.markForDelete =! this.markForDelete;
    }
}