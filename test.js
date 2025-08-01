面试题：oath2

https://graph.qq.com/oauth2.0/show?which=Login&display=pc&response_type=code&state=authorize&client_id=101135748&redirect_uri=https%3A%2F%2Fpassport.bilibili.com%2Fpc%2Fpassport%2FsnsLogin%3Fcsrf_state%3Db01041ffb195727bd7af26a51f64a6fe%26sns_platform%3Dqq%26source%3Dmain-fe-header%26go_url%3Dhttps%253A%252F%252Fsearch.bilibili.com%252Fall%253Fvt%253D83985218%2526keyword%253D%2525E9%25259A%25258F%2525E6%25259C%2525BA%2525E9%252593%2525BE%2525E8%2525A1%2525A8%2525E7%25259A%252584%2525E8%2525B5%25258B%2525E5%252580%2525BC%2526from_source%253Dwebtop_search%2526spm_id_from%253D333.1007%2526search_source%253D5&scope=do_like,get_user_info,get_simple_userinfo,get_vip_info,get_vip_rich_info,add_one_blog,list_album,upload_pic,add_album,list_photo,get_info,add_t,del_t,add_pic_t,get_repost_list,get_other_info,get_fanslist,get_idollist,add_idol,del_idol,get_tenpay_addr
scope: 允许获取的信息，用户可以勾选或者不勾选
全选 哔哩哔哩将获取以下权限：
使用你的QQ头像、昵称信息
授权即同意服务协议和QQ隐私保护指引

response_type = code: 返回类型，code，临时token两种方式
clinet_id：这个应用在用户中心的身份证号
bilibili要去QQ开发者关联平台去申请

token是不安全的，因为有网络设置才5分钟。token。

cookie更安全的