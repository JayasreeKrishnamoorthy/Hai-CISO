export interface SelectCompany {
    success: boolean;
    message: string;
    data:    Datum[];
}

export interface Datum {
    iid:         number;
    iisactive:   number;
    dcreatedat:  null;
    dmodifiedat: null;
    userGroupId: UserGroupID;
}

export interface UserGroupID {
    iid:            number;
    susergroupname: string;
    iisactive:      number;
    dcreatedat:     Date;
    dmodifiedat:    Date;
    iroleid:        Iroleid;
    customerid:     null;
}

export interface Iroleid {
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
