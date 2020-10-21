/**
 * 
 */
import allRoutes from "../router/allRouters"

 const recursionRoutes=(allRoutes,menuList)=>{
    let user=[]
    allRoutes.forEach(item=>{
        menuList.forEach(v=>{
            if(item.meta.name===v.name){
                if(v.children&& v.children.length>0){
                    item.children=recursionRoutes(item.children,v.children)
                }
              user.push(item)
            }
        })
    })
return user
}
export default recursionRoutes
let menuList=[
    {
        "name": "管理首页"
    },
    {
        "name": "学员管理",
        "children": [
            {
                "name": "学员项目管理"
            }
        ]
    },
    {
        "name": "我的中心"
    }
]
// console.log(recursionRoutes(allRoutes,menuList)); 