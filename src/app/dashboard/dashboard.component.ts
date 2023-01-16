import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // acno=''
  // psw=''
  // amnt=''

  // acno1=''
  // psw1=''
  // amnt1=''
  dateandtime:any

  acno:any

  user=''

  constructor(private ds:DataService,private fb:FormBuilder,private router:Router) { 
    this.dateandtime=new Date()

    if(localStorage.getItem('currentuser')){
    // Access Username
    this.user=JSON.parse(localStorage.getItem('currentuser') || '')
  }
}
  // Deposit
  depositForm=this.fb.group({acno:[''],psw:[''],amnt:['']})

  // Withdraw
  withdrawForm=this.fb.group({acno1:[''],psw1:[''],amnt1:['']})

  ngOnInit(): void {
    if(!localStorage.getItem('token')){
      alert('please login first')
      this.router.navigateByUrl('')

    }
  }


  deposit(){

    var acno=this.depositForm.value.acno
    var psw=this.depositForm.value.psw
    var amnt=this.depositForm.value.amnt

    this.ds.deposit(acno,psw,amnt).subscribe((result:any)=>{
      alert(`${amnt} is credited your ac and the balance is${result.message}`)
    },
    result=>{
      alert(result.error.message)
    })

  }
  withdraw(){
    var acno1=this.withdrawForm.value.acno1
    var psw1=this.withdrawForm.value.psw1
    var amnt1=this.withdrawForm.value.amnt1

    this.ds.withdraw(acno1,psw1,amnt1).subscribe((result:any)=>{
      alert(`${amnt1} is debited and the balance is ${result.message}`)
    },
    result=>{
      alert(result.error.message)
    })
  }

  logout(){
    localStorage.removeItem('currentuser')
    localStorage.removeItem('currentacno')
    localStorage.removeItem('token')

    this.router.navigateByUrl('')


  }

  deleteconfirm(){
    this.acno=JSON.parse(localStorage.getItem('currentacno') || "")
  }

  oncancel(){
    this.acno=""

  }

  delete(event:any){

    this.ds.deleteacc(event).subscribe((result:any)=>{
      alert(result.message)
      this.logout()

    },
    result=>{
      
      alert(result.error.message)
    })

  }
}
