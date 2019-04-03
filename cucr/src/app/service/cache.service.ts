import { Injectable } from "@angular/core";

@Injectable()
export class CacheService{
    get userId(){
        return localStorage.getItem("userId");
    }
}