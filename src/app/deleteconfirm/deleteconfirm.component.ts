import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-deleteconfirm',
  templateUrl: './deleteconfirm.component.html',
  styleUrls: ['./deleteconfirm.component.css']
})
export class DeleteconfirmComponent {
  @Input() item:string|undefined

  // Event Creation
  // EventEmitter

  @Output() onCancel=new EventEmitter()


  @Output() onDelete=new EventEmitter()

  constructor(){}

  cancel(){

    this.onCancel.emit()
  }
  delete(){
    this.onDelete.emit(this.item)

  }

}
