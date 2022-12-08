import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { EmployeeModel } from './employee.dashboard.model';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  formValue !: FormGroup;
  formValue2 !: FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd!: boolean;
  showUpdate!:boolean;
  constructor(private formbuilder : FormBuilder,
    private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName : ['',Validators.required],
      lastName : ['',Validators.required],
      email : ['',Validators.required],
      mobile : ['',Validators.required],
      salary : ['',Validators.required]
    })
    this.getAllEmployee();
    this.formValue2 = this.formbuilder.group({sortBy:['']})
  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeeModelObj)
    .subscribe((res:any): void =>{
      console.log(res);
      alert("Employee added successfully")
      let ref=document.getElementById("cancel");
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
      (err: any) =>{
      alert("Something went wrong");
    }
    )
  }
  getAllEmployee(){
    this.api.getEmployee(this.employeeData)
    .subscribe((res:any )=>{
      this.employeeData = res ;
    })
  }
  deleteEmployee(row : any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("Employee deleted");
      this.getAllEmployee();
    })
  }
  onEdit(row:any){
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
  }
  updateEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;
    console.log(this.employeeModelObj.id)
    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res=>{
      alert("Employee Details Updated successfully")
      let ref=document.getElementById("cancel");
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }

  onSearch(row : any){
  this.api.searchEmployee(row.keyword)
    .subscribe(res=>{
      console.log(res);
      this.employeeData=res;

    })
  }
  onSortNameAsc(){
    this.api.sortEmployeeNameAsc()
      .subscribe(res=>{
        console.log(res);
        this.employeeData=res;
  
      })
    }
    onSortNameDesc(){
      this.api.sortEmployeeNameDesc()
        .subscribe(res=>{
          console.log(res);
          this.employeeData=res;
    
        })
      }
      onSortSalaryAsc(){
        this.api.sortEmployeeSalaryAsc()
          .subscribe(res=>{
            console.log(res);
            this.employeeData=res;
          })
        }
    onSortSalaryDesc(){
      this.api.sortEmployeeSalaryDesc()
        .subscribe(res=>{
          console.log(res);
          this.employeeData=res;
        })
      }
    sort(){
        console.log(this.formValue2.value);
        if (this.formValue2.value.sortBy == "sAsc"){
          this.onSortSalaryAsc();
        }
        else if (this.formValue2.value.sortBy== "sDesc"){
          this.onSortSalaryDesc();
        }
        else if (this.formValue2.value.sortBy== "nDesc"){
          this.onSortNameDesc();
        }
        else if (this.formValue2.value.sortBy== "nAsc"){
          this.onSortNameAsc();
        }
      }

}
