import { Component, OnInit } from '@angular/core';
import { Cycle } from 'src/app/services/models/cycle';
import { CycleServiceService } from 'src/app/services/services/cycle-service.service';

@Component({
  selector: 'app-manage-cycles',
  templateUrl: './manage-cycles.component.html',
  styleUrls: ['./manage-cycles.component.scss']
})
export class ManageCyclesComponent implements OnInit{
  cycles: Cycle[] = [];


  constructor(private cycleService: CycleServiceService) { }
  newCycle: Cycle = { cycleName: '', startDate: '', endDate: '' }; 


  ngOnInit(): void {
    this.getCycles();
  }

  getCycles(): void {
    this.cycleService.getAllCycles().subscribe((data) => {
      this.cycles = data;
    });
  }

  addCycle(): void {
    this.cycleService.addCycle(this.newCycle).subscribe((data: Cycle) => {
      this.cycles.push(data);
      this.newCycle = { cycleName: '', startDate: '', endDate: '' }; 
    });
  }


}
