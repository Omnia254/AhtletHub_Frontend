// coach-approval.component.ts
import { Component } from '@angular/core';
import { ApprovalResponseDto } from 'src/app/public/Interfaces/admin/ApprovalResponseDto';

import { AdminService } from 'src/app/public/services/ApIServices/admin.service';

@Component({
  selector: 'app-coach-approval',
  templateUrl: './coach-approval.component.html',
  styleUrls: ['./coach-approval.component.scss']
})
export class CoachApprovalComponent {
  approvalResponse: ApprovalResponseDto | null = null;
  errorMessage: string | null = null;

  constructor(private coachApprovalService: AdminService) {}

  approveCoach(coachId: number): void {
    this.coachApprovalService.approveCoach(coachId).subscribe({
      next: (response) => {
        this.approvalResponse = response;
        this.errorMessage = null;
      },
      error: (error) => {
        this.errorMessage = 'Error approving coach';
        console.error('Error:', error);
      }
    });
  }
}
