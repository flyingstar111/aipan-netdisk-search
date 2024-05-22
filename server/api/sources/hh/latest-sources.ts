export default defineEventHandler(async (event) => {

    try{
        const query = await getQuery(event)
        // https://so.yuneu.com/v1/disk/latest
        let apiEndpoints = await $fetch('/api/sources/api-endpoints')

        let engineValue = query.engine
        let index = apiEndpoints.findIndex((item) => item.engine === parseInt(engineValue))

        let res =  await  $fetch(apiEndpoints[index].latest_url,{
            method:'GET',
            query:{
                ...query,
                adv_params: apiEndpoints[index].adv_params
            }
        })

        return res

    }catch (e) {
        console.log(e)
        return {
            code: 500,
            msg:'error',
        }
    }
})
