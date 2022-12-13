import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { LoginModel } from '../models/loginModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  apiUrl='https://localhost:44388/api/auth/';

  constructor(private httpClient:HttpClient) { }

  login(loginModel:LoginModel)
  {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",loginModel)
  }

  //auth olmuş mu olmamış mı bir fonksiyon.
  //Http unutkandır, local storage'da tutulucak token 
  //bilgileri.
  //tarayıcı hatırlasın diye**
  isAuthenticated()
  {
    if(localStorage.getItem("token"))
    {
      return true;
    }
    else{
      return false;
    }
  }
}
function singleResponseModel<T>(arg0: string, loginModel: LoginModel) {
  throw new Error('Function not implemented.');
}

