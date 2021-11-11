import { createContext } from "react/cjs/react.development";
import { checkLogged } from "../Api";
import { AuthState } from "./context";


const Testcontext = createContext();

const Preload = () => new Promise(
    async  (resolve,reject) =>{
        await checkLogged()
        .then(data => {
            resolve(data);
        });
    }
 )

const Test = async ({chilrend})=>{
    const a = await Preload();
    return <Testcontext>
        {chilrend}
    </Testcontext>;    
};

export default Test;