import Auth from "../dependencies/auth";
import Db from "../dependencies/db";

const providers = {
    connection : Db.connection,
    auth : new Auth(),
}

export default providers;