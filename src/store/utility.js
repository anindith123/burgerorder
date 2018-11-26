export const updateObject = (old, updatedObject) =>{
    return{
        ...old,
        ...updatedObject
    };
}