export interface PetInfo {
    pet_profile: PetProfile;
    pet_vacc: PetVacc;
    pet_med_app: PetMedApp;
    pet_deseases: PetDeseases;
    pet_exam_rep: PetExamRep;
}

export interface PetProfile {
    user_id: string;
    user_name: string;
    profile_id: string;
    name: string;
    species: string;
    breed: string;
    image: string;
    weight: string;
    date_of_birth: string;
    is_indoor: string;
    food_type: string;
    meal_size: string;
    meals_per_day: string;
    physical_activity: string;
    traveling: string;
    profile_active: string;
}

interface PetVacc {
    vet: string;
    description: string;
    date: string;
}

interface PetMedApp {
    vet: string;
    date_from: string;
    date_to: string;
    description: string;
}

interface PetDeseases {
    chronic_deseases: string;
    allergies: string;
}

interface PetExamRep {
    vet: string;
    description: string;
}