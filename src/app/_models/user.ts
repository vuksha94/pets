export class User {
    user_data: UserData;
    pet_data: any;
    /*
    isVet(): boolean {
        return this.user_data.rola === 'Veterinarian';
    }

    isPetOwner(): boolean {
        return this.user_data.rola === 'Pet owner';
    }*/
}

interface UserData {
    user_id: string;
    username: string;
    ime_prezime: string;
    telefon: string;
    rola: string;
    adresa: string;
}

