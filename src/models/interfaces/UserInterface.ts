import User from "../entities/userEntity";
import GenericInterface from "./GenericInterface";

interface UserInterface extends GenericInterface<User>{
    login(user_name : string, password : string) : Promise<{token : string}>
    signup(user_name : string, email : string, password : string) : Promise<{success : boolean}>
}

export default UserInterface;