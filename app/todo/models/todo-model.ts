export class TodoModel{
  constructor(
     public title:string = "",
     public status:string = "started"
  ){}

  toggle():void{
     this.status = this.status == 
       'completed'? 'started': 'completed';
  }
}