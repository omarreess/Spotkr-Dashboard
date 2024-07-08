export const formatDate = (date)=>{
    return new Date(date).toISOString().slice(0,16).replace("T"," ")
}