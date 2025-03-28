import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../../core/modallaptop/modal.component';
import { CommonModule } from '@angular/common';
import { FeaturesService } from '../features.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { AddempComponent } from '../../core/addemp/addemp.component';
import { UpdatesEmpComponent } from '../../core/updateemp/updateemp.component';
import { DeleteEmpComponent } from '../../core/deleteemp/deleteemp.component';
import { MatPaginatorModule } from '@angular/material/paginator';

interface Employee {
  employeeName: string;
  employmentDate: string;
  employmentPeriod: string;
}

@Component({
  selector: 'app-usermanagement',
  imports: [
    UpdatesEmpComponent,
    DeleteEmpComponent,
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    AddempComponent,
    MatPaginatorModule,
    MatIconModule
  ],
  templateUrl: './usermanagement.component.html',
  styleUrl: './usermanagement.component.css',
  standalone: true,
})
export class UserManagementComponent implements OnInit {
  displayedColumns: string[] = [
    'employeeName',
    'employmentDate',
    'employmentPeriod',
    'actions'
  ];

  dataSource = new MatTableDataSource<any>();

  employees: any[] = [];
  isModalOpen = false;
  isaddempModalOpen = false;
  iseditempModalOpen = false;
  isDeleteModalOpen = false;
  searchKeyword = '';
  pageNo = 1;
  pageSize = 10;
  isEditMode: any;
  selectedemployee: any = {};

  employee: any[] = [];
  employeeMap: { [key: string]: string } = {};

  constructor(private FeaturesService: FeaturesService) {}

  ngOnInit(): void {
    this.getEmployeeid();
  }

  getEmployeeid(): void {
    this.FeaturesService.getAllEmployee().subscribe({
      next: (response) => {
        console.log('Employees response:', response);
  
        // Check if response contains an array of employees
        if (!response.employees || !Array.isArray(response.employees)) {
          console.error('Unexpected response format:', response);
          return;
        }
  
        // Assign data to the table's dataSource
        this.dataSource.data = response.employees;
  
        // If using MatTableDataSource, refresh table manually
        this.dataSource._updateChangeSubscription(); 
  
        console.log('Updated dataSource:', this.dataSource.data);
      },
      error: (error) => console.error('Error fetching employees:', error),
    });
  }
  

  getEmployeeName(_id: string): string {
    return this.employeeMap[_id] || 'Unknown';
  }

  filterEmployees(Employee: Employee): boolean {
    if (!this.searchKeyword.trim()) {
      return true;
    }

    const keyword = this.searchKeyword.trim().toLowerCase();
    return (
      Employee.employeeName.toLowerCase().includes(keyword) ||
      Employee.employmentDate.toLowerCase().includes(keyword) ||
      Employee.employmentPeriod.toLowerCase().includes(keyword)
    );
    }

  openModal(Employee?: any) {
    this.isModalOpen = true;
  }
  closeModal(): void {
    this.isModalOpen = false;
  }

  openeditempModal(employee?: any) {
    console.log('Edit button clicked');
    this.iseditempModalOpen = true;
    this.selectedemployee = employee;
    console.log('Selected employee:', this.selectedemployee);
  }

  closeaddempModal(): void {
    this.isaddempModalOpen = false;
  }

  closeeditempModal(): void {
    this.iseditempModalOpen = false;
  }

  openDeleteEmpModal(employee?: any) {
    console.log('Delete button clicked');
    this.isDeleteModalOpen = true;
    this.selectedemployee = employee;
    console.log('Selected Employee:', this.selectedemployee);
  }

  closeDeleteEmpModal(): void {
    this.isDeleteModalOpen = false;
  }

  onSearch(): void {
    this.pageNo = 1;
  }

  clearSearch(): void {
    this.searchKeyword = '';
  }
}
