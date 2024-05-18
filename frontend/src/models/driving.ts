export interface Drivings{
    id : number;
    startAddress: string;
    endAddress: string;
    userId:number;
    price:number;
    startTime: Date;
    endTime: Date;
    driverId:number;
    accepted:boolean
   
}

export interface CreateDriving {
    startAddress: string;
    endAddress: string;
    userId:number;
   
   
}