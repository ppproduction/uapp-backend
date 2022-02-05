import { GenericTypeormInterface } from "@typeauto/typeorm-generics";
import User from "../entities/userEntity";

interface UserInterface extends GenericTypeormInterface<User>{
    login(user_name : string, password : string) : Promise<{token : string}>
    signup(user_name : string, email : string, password : string) : Promise<{success : boolean}>
}

export default UserInterface;