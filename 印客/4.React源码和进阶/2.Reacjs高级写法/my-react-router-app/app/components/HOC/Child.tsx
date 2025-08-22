import React from 'react';


export const Child = ({ name }: { name: string }) => {
  return <div>Child:{name}</div>
}

export const HOC = (Com: React.ComponentType<{ name: string }>) => {
  return () => {
    return <div>
      <span>我是简单的HOC包装</span>
      <Com name='印客' />
    </div>
  }
}

export class ClassChild extends React.Component {
  render() {
    return <div>i am class Child</div>
  }
}



export const ClassHOC = (Comp: React.ComponentType<{name:string}>) => {


  return class ClassHOCCom extends React.Component{

    render(){
      return <div>
        <span>我是class的HOC</span>
        <Comp/>
        
      </div>
      
    }
  }
}

// import React, { ComponentType } from "react"

// export const Child = ({ name }: { name: string }) => {
//   return <div>Child:{name}</div>
// };



// export class ClassChild extends React.Component {
//   render() {
//     return <div>i am class child:{this.props.name}</div>
//   }
// }


// export const BasicHOC = (Component: ComponentType<any>) => {
//   return () =>
//     <div>
//       <div>wrap for the compnent</div>
//       <Component />
//     </div>
// }

// export const PropsEnhanceHOC = (Component: ComponentType<any>) => {
//   const newProps = { name: '印客' }
//   return () =>
//     <div>
//       <div>wrap for the compnent</div>
//       <Component  {...newProps} />
//     </div>
// }

