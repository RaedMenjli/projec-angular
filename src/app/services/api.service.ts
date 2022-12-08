import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import{map} from'rxjs/operators'
import { Observable } from 'rxjs/internal/Observable';
import { EmployeeModel } from '../dashboard/employee.dashboard.model';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }
  postEmployee(data :any){
    return this.http.post<any>("http://localhost:3000/employee", data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getEmployee(data :any){
    return this.http.get<any>("http://localhost:3000/employee")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  updateEmployee(data :any,id: number){
    return this.http.put<any>("http://localhost:3000/employee/"+id, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteEmployee(id: number){
    return this.http.delete<any>("http://localhost:3000/employee/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  searchEmployee(keyword:string):Observable <EmployeeModel[]>{
    return this.http.get<EmployeeModel[]>("http://localhost:3000/employee?firstName_like="+ keyword);
    }
  sortEmployeeNameAsc():Observable <EmployeeModel[]>{
    return this.http.get<EmployeeModel[]>("http://localhost:3000/employee?_sort=firstName&_order=asc");
    }
    sortEmployeeNameDesc():Observable <EmployeeModel[]>{
      return this.http.get<EmployeeModel[]>("http://localhost:3000/employee?_sort=firstName&_order=desc");
      }
  sortEmployeeSalaryDesc():Observable <EmployeeModel[]>{
        return this.http.get<EmployeeModel[]>("http://localhost:3000/employee")
        .pipe(map((res)=>{
          return res.sort((a, b) => parseInt(b.salary) - parseInt(a.salary))          ;
        }))
      }
      sortEmployeeSalaryAsc():Observable <EmployeeModel[]>{
        return this.http.get<EmployeeModel[]>("http://localhost:3000/employee")
        .pipe(map((res)=>{
          return res.sort((a, b) => parseInt(a.salary) - parseInt(b.salary))          ;
        }))
      }

}
