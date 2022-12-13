import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  //aslında loginForm'umumuz FormGroup'muş
  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService) { }

  ngOnInit(): void { this.createLoginForm();
  }

  createLoginForm()
  {
    //loginform'u formBuilder'daki gruplara
    //ayırıyorum.
    this.loginForm = this.formBuilder.group(
      {
        email:["",Validators.required],
        password:["",Validators.required]
      }
    )
  }
  login()
  {
    //nesneye bağlama operasyonu
    if(this.loginForm.valid)
    {
      
      let loginModel = Object.assign({},this.loginForm.value);
      //mapleme işleme.
      this.authService.login(loginModel).subscribe(response=>
        {
          localStorage.setItem('token',response.data.token)
          this.toastrService.info(response.message) 
        },responseError=>{
          this.toastrService.error(responseError.error)
        } 
        )

        //localStorage için bir servis oluştur.
    }
  }

}//interceptors: araya girmek demektir.
//post ederken bir paket al yanına öyle post et demektir.

