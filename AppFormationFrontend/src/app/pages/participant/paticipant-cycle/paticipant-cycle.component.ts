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
  constructor(private cycleService: CycleServiceService) { }
  ngOnInit(): void {
    this.getCycles();
  }

  getCycles(): void {
    this.cycleService.getAllNotFinishedCycles().subscribe((data) => {
      this.cycles = data;
    });
  }
}
