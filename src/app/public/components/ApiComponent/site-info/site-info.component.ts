// site-info.component.ts
import { Component, OnInit } from '@angular/core';
import { SiteInfoDto } from 'src/app/public/Interfaces/admin/SiteInfoDto';
import { AdminService } from 'src/app/public/services/ApIServices/admin.service';

@Component({
  selector: 'app-site-info',
  templateUrl: './site-info.component.html',
  styleUrls: ['./site-info.component.scss']
})
export class SiteInfoComponent implements OnInit {
  siteInfo: SiteInfoDto | null = null;

  constructor(private siteInfoService: AdminService) {}

  ngOnInit(): void {
    this.siteInfoService.getSiteInfo().subscribe({
      next: (data) => {
        this.siteInfo = data;
      },
      error: (error) => {
        console.error('Error fetching site info:', error);
      }
    });
  }
}
