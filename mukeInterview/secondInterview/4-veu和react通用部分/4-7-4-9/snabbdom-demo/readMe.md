# 步骤
1. 执行http-server -p 8001
2. 在console.log
执行
``` javascript
const vnode = h("div#container.two.classes", { on: { click: ((()=>{})) } }, [
  h("span", { style: { fontWeight: "bold" } }, "This is bold"),
  " and this is just normal text",
  h("a", { props: { href: "/foo" } }, "I'll take you places!")
]);


```
得到对象如下：
``` json
{
    "sel": "div#container.two.classes",
    "data": {
        "on": {}
    },
    "children": [
        {
            "sel": "span",
            "data": {
                "style": {
                    "fontWeight": "bold"
                }
            },
            "text": "This is bold"
        },
        {
            "text": " and this is just normal text"
        },
        {
            "sel": "a",
            "data": {
                "props": {
                    "href": "/foo"
                }
            },
            "text": "I'll take you places!"
        }
    ]
}
```