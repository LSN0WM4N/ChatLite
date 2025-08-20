export const parseTursoDate = (dbDate) => {
    if (!dbDate) 
        return null;
    
    const date = new Date(dbDate.replace(' ', 'T') + 'Z');
    return date.getTime();
};