import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { Cycle } from 'src/app/services/models/cycle';
import { CycleServiceService } from 'src/app/services/services/cycle-service.service';

@Component({
  selector: 'app-manage-cycles',
  templateUrl: './manage-cycles.component.html',
  styleUrls: ['./manage-cycles.component.scss']
})
export class ManageCyclesComponent implements OnInit {
  cycles: Cycle[] = [];
  cycleForm: FormGroup;

  constructor(private cycleService: CycleServiceService, private fb: FormBuilder) {
    this.cycleForm = this.fb.group({
      cycleName: ['', Validators.required],
      startDate: ['', [Validators.required, this.dateValidator()]],
      endDate: ['', [Validators.required, this.dateValidator()]]
    }, { validators: this.dateRangeValidator });
  }

  ngOnInit(): void {
    this.getCycles();
  }

  getCycles(): void {
    this.cycleService.getAllCycles().subscribe((data) => {
      this.cycles = data;
    });
  }

  addCycle(): void {
    if (this.cycleForm.valid) {
      const newCycle: Cycle = this.cycleForm.value;
      this.cycleService.addCycle(newCycle).subscribe((data: Cycle) => {
        this.cycles.push(data);
        this.cycleForm.reset();
      });
    } else {
      Object.keys(this.cycleForm.controls).forEach(key => {
        this.cycleForm.controls[key].markAsTouched();
      });
    }
  }

  private dateValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); 
      const selectedDate = new Date(control.value);
      return selectedDate >= today ? null : { invalidDate: true };
    };
  }
  

  private dateRangeValidator(group: FormGroup): ValidationErrors | null {
    const startDate = group.get('startDate')?.value;
    const endDate = group.get('endDate')?.value;
    return startDate && endDate && new Date(startDate) <= new Date(endDate) ? null : { invalidDateRange: true };
  }
}
