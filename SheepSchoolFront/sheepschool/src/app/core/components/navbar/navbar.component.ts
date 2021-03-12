import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../auth/services/token-storage.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isConnected: boolean = false;

  constructor(
    private tokenStorageService: TokenStorageService
  ) {
  }

  ngOnInit(): void {
    this.isConnected = this.tokenStorageService.isConnected();
  }
}
