
import {ResponseCode} from './responseCode';
export class ResponseModel{
public responseCode:ResponseCode=ResponseCode.NotSet;
    public responseMessage:string="";
    public dataset:any;
}