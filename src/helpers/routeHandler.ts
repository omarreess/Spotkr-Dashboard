

export const  prepareRoute = (routePath: string , bindings: Object ) => {
     Object.keys(bindings).forEach((key:string)=>{
        routePath = routePath.replace(`{${key}}`,bindings[key])
     })
     return routePath
}