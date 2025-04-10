export interface IUser {
    firstName: string;
    lastName: string;
    location: IUserLocation
}

export interface IUserLocation {
    businessLocation: string;
    houseAddress: string;
}

export interface IUsersData {
    data: IUser[];
}