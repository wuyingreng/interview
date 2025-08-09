// 适配器模式

{
    code: 0,
    msg: '',
    data: {
        total: '',
        list: []
    }
}

// 后端
{
    code: 0,
    message: '',
    data: {
        total: '',
        records: []
    }
}

// 优化
{
    ...,
    responseProcessor(res) {
        ...res,
        msg: res.message,
        data:{
            ...res.data,
            list: res?.data?.records
        }
    }
}

// 适配器 解决对象之间不匹配问题 
// 代理模式 增强原有对象功能 提供接口不会改变

