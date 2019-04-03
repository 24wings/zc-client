import { Component } from "@angular/core";
import { ApiService } from "../../service/api.service";

@Component({selector:"personal",templateUrl:"/src/app/pages/personal/personal.component.html"})
export class PersonalComponent{
    constructor(private api:ApiService){}

    addBankCard(){
        this.api.addBackCard({});
    }
}