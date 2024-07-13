import { Component, OnInit } from '@angular/core';
import { Cycle } from 'src/app/services/models/cycle';
import { CycleServiceService } from 'src/app/services/services/cycle-service.service';

@Component({
  selector: 'app-paticipant-cycle',
  templateUrl: './paticipant-cycle.component.html',
  styleUrls: ['./paticipant-cycle.component.scss']
})
export class PaticipantCycleComponent implements OnInit {
  cycles: Cycle[] = [];
  filteredCycles: Cycle[] = [];
  searchQuery: string = '';

  constructor(private cycleService: CycleServiceService) { }

  ngOnInit(): void {
    this.getCycles();
  }

  getCycles(): void {
    this.cycleService.getAllNotFinishedCycles().subscribe((data) => {
      this.cycles = data;
      this.filteredCycles = data; 
    });
  }

  searchCycles(): void {
    if (this.searchQuery) {
      this.filteredCycles = this.cycles.filter(cycle => 
        cycle.cycleName?.toLowerCase().includes(this.searchQuery.toLowerCase()));
    } else {
      this.filteredCycles = this.cycles; 
    }
  }
}
