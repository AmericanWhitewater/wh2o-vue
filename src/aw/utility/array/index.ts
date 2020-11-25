export function addOrUpdate<T>(pred: (value: T, index: number, obj: Array<T>) => boolean,a: T[],b: T)
{
    const i = a.findIndex(pred);
    if(i>=0)
    {
        a.splice(i,1,b);
    }
    else
    {
        a.push(b);
    }
}
