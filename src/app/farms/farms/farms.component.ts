import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Farm } from '../model/farm';
import { FarmsService } from '../services/farms.service';

@Component({
  selector: 'app-farms',
  templateUrl: './farms.component.html',
  styleUrls: ['./farms.component.scss']
})
export class FarmsComponent implements OnInit {

  farms: Observable <Farm[]>;
  displayedColumns = ['name'];

  constructor(private farmsService: FarmsService) { 
    this.farms = this.farmsService.list();
  }

  ngOnInit(): void {

  }

}
