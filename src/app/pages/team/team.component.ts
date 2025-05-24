import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroBannerComponent } from '../../shared/components/hero-banner/hero-banner.component';
import { TeamService } from '../../core/services/team.service';
import { TeamMember } from '../../core/models/team-member.model';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, HeroBannerComponent],
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  teamMembers: TeamMember[] = [];
  selectedMember: TeamMember | null = null;
  
  constructor(private teamService: TeamService) {}
  
  ngOnInit(): void {
    this.teamService.getTeamMembers().subscribe(members => {
      this.teamMembers = members;
    });
  }
  
  openMemberDetails(member: TeamMember): void {
    this.selectedMember = member;
  }
  
  closeMemberDetails(): void {
    this.selectedMember = null;
  }
}