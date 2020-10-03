/**
 * Pulls a value from the environment
 * @param key
 * @param defaultReturn
 */
export function env<T>(key: string, defaultReturn: T): T|string
{
    if(process?.env[key])
    {
        try{
            return(JSON.parse(process?.env[key] ??''));
        }
        catch(err)
        {
            return(process?.env[key] ?? defaultReturn)
        }
    }
    else
    {
        return(defaultReturn);
    }
}

/**
 * Are we in a production environment?
 */
export const configIsProductionEnvironment=()=> (env('NODE_ENV','')).toLowerCase()=='production'
/**
 * What is the base URL for the AW server as a string
 */
export const configBaseURL= ()=>env('VUE_APP_LINK_BASE_URL','');
