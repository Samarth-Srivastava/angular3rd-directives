import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[currency-directive]'
})
export class CurrencyTextBox {
  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInput(event: KeyboardEvent){
    var trgt = event.target as HTMLInputElement;
    var inptValue = trgt.value.replace(/,/g, '').replace(/\$/g, '');
    var decimalIndex = inptValue.indexOf('.');
    var afterdecimal = inptValue.substr(decimalIndex, 3);
    var beforeDecimal = inptValue.substr(0,decimalIndex);
    console.log(decimalIndex, afterdecimal, beforeDecimal);
    //console.log(inptValue);
    var numbers: string[] = [];
    for(let i=0; i<beforeDecimal.length; i+=3){
      numbers.push(beforeDecimal.substr(i, 3));
    }
    trgt.value = '$' + numbers.join(',') + afterdecimal;
  }

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    let e = <KeyboardEvent> event;
      if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+C
        (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+V
        (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+X
        (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
          // let it happen, don't do anything
          return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        
      }
  }
}