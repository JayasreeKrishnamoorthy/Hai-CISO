export interface Login {
    message: string;
    success: boolean;
    data:    Data;
}

export interface Data {
    id:         number;
    name:       string;
    groups:     UserGroup[];
    userGroup:  UserGroup;
    token:      string;
    temppass:   boolean;
    idendifier: string;
}

export interface UserGroup {
    iid:             number;
    iisactive:       number;
    dcreatedat:      Date | null;
    dmodifiedat:     Date | null;
    userGroupId?:    UserGroup;
    susergroupname?: string;
}
