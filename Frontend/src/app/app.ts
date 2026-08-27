import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({ 
  selector: 'app-root',
  imports:[CommonModule,FormsModule], 
   templateUrl: './app.html',
   styleUrl: './app.css',
  })
export class App {
 
  departments: string[] = ['CS', 'AI', 'ART'];
  selectedFilter: string = 'All';
  viewMode: 'card' | 'list' = 'card';

  newMemberName: string = '';
  newMemberAge: number = 0;
  newMemberDepartment: string = '';
  newMemberAvailability: boolean = true;
  formSubmitted: boolean = false;

  members: any[] = [
    { id: 1, name: 'ahmed', age: 28, department: 'ART', isAvailable: true },
    { id: 2, name: 'ali', age: 26, department: 'AI', isAvailable:  false},
    { id: 3, name: 'Mostafa', age: 20, department: 'CS', isAvailable: true },
    { id: 4, name: 'sama', age: 20, department: 'CS', isAvailable: true }
  ];

  get filteredMembers(): any[] {
    if (this.selectedFilter === 'All') {
      return this.members;
    }
    return this.members.filter(m => m.department === this.selectedFilter);
  }


  addMember(): void {
    this.formSubmitted = true;

    if (!this.newMemberName.trim() || !this.newMemberAge || this.newMemberAge <= 0 || !this.newMemberDepartment) {
      return;
    }

    const newMember = {
      id: Date.now(),
      name: this.newMemberName.trim(),
      age: this.newMemberAge,
      department: this.newMemberDepartment,
      isAvailable: this.newMemberAvailability
    };

    this.members.push(newMember);

 
    this.newMemberName = '';
    this.newMemberAge = 0;
    this.newMemberDepartment = '';
    this.newMemberAvailability = true;
    this.formSubmitted = false;
  }


  toggleAvailability(member: any): void {
    member.isAvailable = !member.isAvailable;
  }
}