import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent implements OnInit, AfterViewInit{
  
  public colorControl !: FormControl;

  @Input() color !: string;
  @Output() changeCardColorEvent : EventEmitter<string> = new EventEmitter<string>()

  ngOnInit(): void{
    this.colorControl = new FormControl('');
  }

  ngAfterViewInit(): void {
    this.colorControl.valueChanges.subscribe(result=>{
      this.changeColor(result);
    })
  }


  changeColor(color : string){
      this.changeCardColorEvent.emit(color);
  }

}
