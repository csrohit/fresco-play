import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { InvoiceComponent } from './invoice.component';

import { FormsModule } from '@angular/forms';

describe('InvoiceComponent', () => {
  let component: InvoiceComponent;
  let fixture: ComponentFixture<InvoiceComponent>;
  let privileged;
  let addItem = HTMLElement;

  let billitemArray = [
    {
      item: "Microsoft Office",
      task: "Microsoft Office suite installation",
      hours: 2,
      rate: 120
    },
    {
      item: "Oracle SQL developer",
      task: "SQL developer installation",
      hours: 1,
      rate: 140
    },
    {
      item: "three",
      task: "task3",
      hours: 5,
      rate: 1250
    },
    {
      item: "four",
      task: "task4",
      hours: 8,
      rate: 1600
    }
  ];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceComponent],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('privChange method have been called when clicking on privileged checkbox', fakeAsync(() => {

    spyOn(component, 'privChange').and.callThrough();
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.nativeElement.querySelector('#privileged').click();
      fixture.detectChanges();
      expect(component.privChange).toHaveBeenCalled();
    });
  }));

  it('privChange method have been called when clicking on privileged checkbox(Unchecked)', fakeAsync(() => {

    spyOn(component, 'privChange').and.callThrough();
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.nativeElement.querySelector('#privileged').click();
      fixture.detectChanges();
      expect(component.privChange).toHaveBeenCalled();
      expect(component.taxes).toBe(18);
      expect(component.deposit).toBe(400);
      expect(component.discount).toBe(2);
      expect(component.total).toBe(380);
      expect(component.calculatedTotal).toBe(40.799999999999955);
      expect(fixture.nativeElement.querySelector('#subtotal').textContent.trim()).toBe('380');
      expect(fixture.nativeElement.querySelector('#total').textContent.trim()).toBe('41');
    });
  }));

  it('privChange method have been called when clicking on privileged checkbox(checked)', fakeAsync(() => {

    spyOn(component, 'privChange').and.callThrough();
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.nativeElement.querySelector('#privileged').click();
      fixture.detectChanges();
      fixture.nativeElement.querySelector('#privileged').click();
      fixture.detectChanges();
      expect(component.privChange).toHaveBeenCalled();
      expect(component.taxes).toBe(18);
      expect(component.deposit).toBe(400);
      expect(component.discount).toBe(7);
      expect(component.total).toBe(380);
      expect(component.calculatedTotal).toBe(21.799999999999955);
      expect(fixture.nativeElement.querySelector('#subtotal').textContent.trim()).toBe('380');
      expect(fixture.nativeElement.querySelector('#total').textContent.trim()).toBe('22');
    });
  }));

  it('should call onSelect method when delete an item from list', fakeAsync(() => {

    spyOn(component, 'onSelect').and.callThrough();
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.nativeElement.querySelector('#remove').click();
      fixture.detectChanges();
      expect(component.onSelect).toHaveBeenCalled();
    });
  }));

  it(' delete 3rd item  out of 4 first', fakeAsync(() => {
    component.billItems = billitemArray;
    expect(component.billItems.length).toBe(4);
    expect(component.billItems[2].item).toBe('three');
    expect(component.billItems[2].task).toBe('task3');
    expect(component.billItems[2].hours).toBe(5);
    expect(component.billItems[2].rate).toBe(1250);
    component.onSelect(2);
    expect(component.billItems.length).toBe(3);
    expect(component.billItems[2].item).toBe('four');
    expect(component.billItems[2].task).toBe('task4');
    expect(component.billItems[2].hours).toBe(8);
    expect(component.billItems[2].rate).toBe(1600);
  }));

  it(' delete 3rd item  out of 4 second', fakeAsync(() => {
    expect(component.billItems.length).toBe(2);
    component.onSelect(-1);
    expect(component.billItems.length).toBe(2);
  }));

  it(' bill items cannot be null', fakeAsync(() => {
    component.billItems = null;
    component.getSubTotal();
    expect(component.total).toBe(0);
  }));

  it('should make calculation when deleting an item from the array', fakeAsync(() => {

    spyOn(component, 'onSelect').and.callThrough();
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.nativeElement.querySelector('#remove').click();
      fixture.detectChanges();
      expect(component.onSelect).toHaveBeenCalled();

      expect(component.taxes).toBe(18);
      expect(component.deposit).toBe(400);
      expect(component.discount).toBe(7);
      expect(component.total).toBe(140);
      expect(component.calculatedTotal).toBe(-244.60000000000002);
      expect(fixture.nativeElement.querySelector('#subtotal').textContent.trim()).toBe('140');
      expect(fixture.nativeElement.querySelector('#total').textContent.trim()).toBe('-245');
    });
  }));

  // it('should call _keyPress method for address-contact', fakeAsync(() => {
  //   spyOn(component, '_keyPress').and.callThrough();
  //   tick();
  //   const elemInput: HTMLInputElement = fixture.nativeElement.querySelector('#address-contact');
  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => {
  //     elemInput.value = '6';
  //     fixture.detectChanges();
  //     elemInput.dispatchEvent(new Event('keypress'));
  //     fixture.detectChanges();
  //     expect(component._keyPress).toHaveBeenCalled();
  //   });
  // }));

  it('should call mouseEnterAddItem method when mouse enter addItemLink division', fakeAsync(() => {
    spyOn(component, 'mouseEnterAddItem').and.callThrough();
    tick();
    const elemInput: HTMLInputElement = fixture.nativeElement.querySelector('#addItemLink');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      elemInput.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      expect(component.mouseEnterAddItem).toHaveBeenCalled();
    });
  }));

  it('should make addItem division style as display:block when mouse enter addItemLink division', fakeAsync(() => {
    spyOn(component, 'mouseEnterAddItem').and.callThrough();
    tick();
    const elemInput: HTMLInputElement = fixture.nativeElement.querySelector('#addItemLink');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      elemInput.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      expect(component.mouseEnterAddItem).toHaveBeenCalled();
      fixture.detectChanges();
      const addItem: HTMLElement = fixture.nativeElement.querySelector('#addItem');
      const styleDisplaay = addItem.style.display;
      expect(styleDisplaay).toBe('block');

    });
  }));

  it('should call mouseLeaveAddItem method when mouse leave addItemLink division', fakeAsync(() => {
    spyOn(component, 'mouseLeaveAddItem').and.callThrough();
    tick();
    const elemInput: HTMLInputElement = fixture.nativeElement.querySelector('#addItemLink');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      elemInput.dispatchEvent(new Event('mouseleave'));
      fixture.detectChanges();
      expect(component.mouseLeaveAddItem).toHaveBeenCalled();
    });
  }));

  it('should make addItem division style as display:none when mouse leave addItemLink division', fakeAsync(() => {
    spyOn(component, 'mouseLeaveAddItem').and.callThrough();
    tick();
    const elemInput: HTMLInputElement = fixture.nativeElement.querySelector('#addItemLink');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      elemInput.dispatchEvent(new Event('mouseleave'));
      fixture.detectChanges();
      expect(component.mouseLeaveAddItem).toHaveBeenCalled();
      fixture.detectChanges();
      const addItem: HTMLElement = fixture.nativeElement.querySelector('#addItem');
      const styleDisplaay = addItem.style.display;
      expect(styleDisplaay).toBe('none');
    });
  }));

  it('should call addItem method when clicking add button', fakeAsync(() => {
    spyOn(component, 'addItem').and.callThrough();
    tick();
    const elemInput1: HTMLInputElement = fixture.nativeElement.querySelector('#taskTitle');
    const elemInput2: HTMLInputElement = fixture.nativeElement.querySelector('#taskDesc');
    const elemInput3: HTMLInputElement = fixture.nativeElement.querySelector('#unitsWorked');
    const elemInput4: HTMLInputElement = fixture.nativeElement.querySelector('#unitCost');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      elemInput1.value = 'OMG software solutions';
      elemInput1.dispatchEvent(new Event('input'));
      elemInput2.value = 'Front end development installation';
      elemInput2.dispatchEvent(new Event('input'));
      elemInput3.value = '45';
      elemInput3.dispatchEvent(new Event('input'));
      elemInput4.value = '10200';
      elemInput4.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      fixture.nativeElement.querySelector('#submit').click();
      fixture.detectChanges();
      expect(component.addItem).toHaveBeenCalled();
    });
  }));

  it('add an item into the array', fakeAsync(() => {
    spyOn(component, 'addItem').and.callThrough();
    tick();
    const elemInput1: HTMLInputElement = fixture.nativeElement.querySelector('#taskTitle');
    const elemInput2: HTMLInputElement = fixture.nativeElement.querySelector('#taskDesc');
    const elemInput3: HTMLInputElement = fixture.nativeElement.querySelector('#unitsWorked');
    const elemInput4: HTMLInputElement = fixture.nativeElement.querySelector('#unitCost');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      elemInput1.value = 'OMG software solutions';
      elemInput1.dispatchEvent(new Event('input'));
      elemInput2.value = 'Front end development installation';
      elemInput2.dispatchEvent(new Event('input'));
      elemInput3.value = '45';
      elemInput3.dispatchEvent(new Event('input'));
      elemInput4.value = '10200';
      elemInput4.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      fixture.nativeElement.querySelector('#submit').click();
      fixture.detectChanges();
      expect(component.addItem).toHaveBeenCalled();
      expect(component.billItems.length).toBe(3);
      expect(component.billItems[2].item).toBe('OMG software solutions');
      expect(component.billItems[2].task).toBe('Front end development installation');
      expect(component.billItems[2].hours).toBe(45);
      expect(component.billItems[2].rate).toBe(10200);

    });
  }));

  it('add an item into the array with hours and rate as 0 (empty)', fakeAsync(() => {
    spyOn(component, 'addItem').and.callThrough();
    tick();
    const elemInput1: HTMLInputElement = fixture.nativeElement.querySelector('#taskTitle');
    const elemInput2: HTMLInputElement = fixture.nativeElement.querySelector('#taskDesc');
    const elemInput3: HTMLInputElement = fixture.nativeElement.querySelector('#unitsWorked');
    const elemInput4: HTMLInputElement = fixture.nativeElement.querySelector('#unitCost');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      elemInput1.value = 'OMG software solutions';
      elemInput1.dispatchEvent(new Event('input'));
      elemInput2.value = 'Front end development installation';
      elemInput2.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      fixture.nativeElement.querySelector('#submit').click();
      fixture.detectChanges();
      expect(component.addItem).toHaveBeenCalled();
      expect(component.billItems.length).toBe(3);
      expect(component.billItems[2].item).toBe('OMG software solutions');
      expect(component.billItems[2].task).toBe('Front end development installation');
      expect(component.billItems[2].hours).toBe(0);
      expect(component.billItems[2].rate).toBe(0);

    });
  }));

  it('should make calculation when adding an item into the array(Privileged checked)', fakeAsync(() => {
    spyOn(component, 'addItem').and.callThrough();
    tick();
    const elemInput1: HTMLInputElement = fixture.nativeElement.querySelector('#taskTitle');
    const elemInput2: HTMLInputElement = fixture.nativeElement.querySelector('#taskDesc');
    const elemInput3: HTMLInputElement = fixture.nativeElement.querySelector('#unitsWorked');
    const elemInput4: HTMLInputElement = fixture.nativeElement.querySelector('#unitCost');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      elemInput1.value = 'OMG software solutions';
      elemInput1.dispatchEvent(new Event('input'));
      elemInput2.value = 'Front end development installation';
      elemInput2.dispatchEvent(new Event('input'));
      elemInput3.value = '45';
      elemInput3.dispatchEvent(new Event('input'));
      elemInput4.value = '10200';
      elemInput4.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      fixture.nativeElement.querySelector('#submit').click();
      fixture.detectChanges();
      expect(component.addItem).toHaveBeenCalled();
      expect(component.billItems.length).toBe(3);
      expect(component.billItems[2].item).toBe('OMG software solutions');
      expect(component.billItems[2].task).toBe('Front end development installation');
      expect(component.billItems[2].hours).toBe(45);
      expect(component.billItems[2].rate).toBe(10200);
      expect(component.taxes).toBe(18);
      expect(component.deposit).toBe(400);
      expect(component.discount).toBe(7);
      expect(component.total).toBe(459380);
      expect(component.calculatedTotal).toBe(509511.80000000005);
      expect(fixture.nativeElement.querySelector('#subtotal').textContent.trim()).toBe('459380');
      expect(fixture.nativeElement.querySelector('#total').textContent.trim()).toBe('509512');
    });
  }));

  it('should make calculation when adding an item into the array(Privileged Unchecked)', fakeAsync(() => {
    spyOn(component, 'addItem').and.callThrough();
    tick();
    const elemInput1: HTMLInputElement = fixture.nativeElement.querySelector('#taskTitle');
    const elemInput2: HTMLInputElement = fixture.nativeElement.querySelector('#taskDesc');
    const elemInput3: HTMLInputElement = fixture.nativeElement.querySelector('#unitsWorked');
    const elemInput4: HTMLInputElement = fixture.nativeElement.querySelector('#unitCost');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.nativeElement.querySelector('#privileged').click();
      fixture.detectChanges();
      elemInput1.value = 'OMG software solutions';
      elemInput1.dispatchEvent(new Event('input'));
      elemInput2.value = 'Front end development installation';
      elemInput2.dispatchEvent(new Event('input'));
      elemInput3.value = '45';
      elemInput3.dispatchEvent(new Event('input'));
      elemInput4.value = '10200';
      elemInput4.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      fixture.nativeElement.querySelector('#submit').click();
      fixture.detectChanges();
      expect(component.addItem).toHaveBeenCalled();
      expect(component.billItems.length).toBe(3);
      expect(component.billItems[2].item).toBe('OMG software solutions');
      expect(component.billItems[2].task).toBe('Front end development installation');
      expect(component.billItems[2].hours).toBe(45);
      expect(component.billItems[2].rate).toBe(10200);
      expect(component.taxes).toBe(18);
      expect(component.deposit).toBe(400);
      expect(component.discount).toBe(2);
      expect(component.total).toBe(459380);
      expect(component.calculatedTotal).toBe(532480.8);
      expect(fixture.nativeElement.querySelector('#subtotal').textContent.trim()).toBe('459380');
      expect(fixture.nativeElement.querySelector('#total').textContent.trim()).toBe('532481');
    });
  }));

  it('should display currency value as INR in required places by default', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.nativeElement.querySelector('#amount-head').textContent.trim()).toBe('Amount(INR)');
      expect(fixture.nativeElement.querySelector('#subtotal-head').textContent.trim()).toBe('Subtotal(INR):');
      expect(fixture.nativeElement.querySelector('#deposit-head').textContent.trim()).toBe('Deposit(INR):');
      expect(fixture.nativeElement.querySelector('#total-head').textContent.trim()).toBe('Total(INR):');
    });
  }));

  it('should display currency value as USD in required places', async(() => {

    component.invoiceInfo.currency = component.allProfiles[0].value;
    fixture.detectChanges();
    const select = fixture.debugElement.query(By.css('select'));
    fixture.whenStable().then(() => {
      expect(fixture.nativeElement.querySelector('#amount-head').textContent.trim()).toBe('Amount(USD)');
      expect(fixture.nativeElement.querySelector('#subtotal-head').textContent.trim()).toBe('Subtotal(USD):');
      expect(fixture.nativeElement.querySelector('#deposit-head').textContent.trim()).toBe('Deposit(USD):');
      expect(fixture.nativeElement.querySelector('#total-head').textContent.trim()).toBe('Total(USD):');
    });
  }));

  it('should display currency value as INR in required places', async(() => {

    component.invoiceInfo.currency = component.allProfiles[1].value;
    fixture.detectChanges();
    const select = fixture.debugElement.query(By.css('select'));
    fixture.whenStable().then(() => {
      expect(fixture.nativeElement.querySelector('#amount-head').textContent.trim()).toBe('Amount(INR)');
      expect(fixture.nativeElement.querySelector('#subtotal-head').textContent.trim()).toBe('Subtotal(INR):');
      expect(fixture.nativeElement.querySelector('#deposit-head').textContent.trim()).toBe('Deposit(INR):');
      expect(fixture.nativeElement.querySelector('#total-head').textContent.trim()).toBe('Total(INR):');
    });
  }));

  it('should display currency value as GBP in required places', async(() => {

    component.invoiceInfo.currency = component.allProfiles[2].value;
    fixture.detectChanges();
    const select = fixture.debugElement.query(By.css('select'));
    fixture.whenStable().then(() => {
      expect(fixture.nativeElement.querySelector('#amount-head').textContent.trim()).toBe('Amount(GBP)');
      expect(fixture.nativeElement.querySelector('#subtotal-head').textContent.trim()).toBe('Subtotal(GBP):');
      expect(fixture.nativeElement.querySelector('#deposit-head').textContent.trim()).toBe('Deposit(GBP):');
      expect(fixture.nativeElement.querySelector('#total-head').textContent.trim()).toBe('Total(GBP):');
    });
  }));

});
