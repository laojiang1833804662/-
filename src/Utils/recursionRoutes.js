import allRoutes from "../router/allRouters"

const recursionRoutes = (allRoutes, menuList) => {
    let userRoutes = []
    allRoutes.forEach(item => {
        menuList.forEach(v => {
            if (item.meta.name === v.name) {
                if (v.children && v.children.length > 0) {
                    item.children = recursionRoutes(item.children, v.children)
                }
                userRoutes.push(item)
            }
        })
    })
    return userRoutes
}
export default recursionRoutes
