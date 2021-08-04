export interface Roles {
    success: boolean;
    message: string;
    data:    Data;
}

export interface Data {
    data:  Datum[];
    count: number;
}

export interface Datum {
    iid:         number;
    srolename:   string;
    ereadonly:   string;
    eadd:        string;
    eedit:       string;
    edelete:     string;
    eexecute:    string;
    eschedule:   string;
    iisactive:   number;
    dcreatedat:  Date;
    dmodifiedat: Date;
}



