/**
 * @description 演示 props 和事件
 * @author 双越老师
 */

import { useState } from "react"

const Input = ({ submitTitle }: { submitTitle: (title: string) => void }) => {
    const [title, setTitle] = useState<string>('')

    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const onSubmit = () => {

        submitTitle(title) // 'abc'

        setTitle('')
    }
    return <div>
        <input value={title} onChange={onTitleChange} />
        <button onClick={onSubmit}>提交</button>
    </div>
}


const List = ({ list }: { list: any[] }) => {

    return <ul>{list.map((item) => {
        return <li key={item.id}>
            <span>{item.title}</span>
        </li>
    })}</ul>
}

const DEFAILT_LIST = [
    {
        id: 'id-1',
        title: '标题1'
    },
    {
        id: 'id-2',
        title: '标题2'
    },
    {
        id: 'id-3',
        title: '标题3'
    }
]
const TodoListDemo = () => {
    const [list, setList] = useState(DEFAILT_LIST)
    const onSubmitTitle = (title: string) => {
        setList(list.concat({
            id: `id-${Date.now()}`,
            title
        }))
    }
    return <div>
        <Input submitTitle={onSubmitTitle} />
        <List list={list} />
    </div>
}

export default TodoListDemo
