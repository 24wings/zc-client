import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import "rxjs/operator/toPromise";
import { CacheService } from "./cache.service";
@Injectable()
export class ApiService{
    ip="http://192.168.1.99:5000";

    constructor(private httpClient:HttpClient,private cache:CacheService){
        
    }


    listBankCard(){
        return this.Post(this.ip+"/",{userId:this.cache.userId})
    }

    addBackCard(bankCard:any){
        return this.Post(this.ip+"/api/CucrSaas/ZC/Admin/ZCSetting/addBankCrad",bankCard)
    }

    Get(url:string,params:any){
        return this.httpClient.get(this.ip+url,{params});
    }

    Post(url:string,data:any){
        return new Promise( resolve=>this.httpClient.post(this.ip+url,data).subscribe(rtn=>resolve(rtn)));
    }

}