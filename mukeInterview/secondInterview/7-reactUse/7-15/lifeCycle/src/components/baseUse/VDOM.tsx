const VDOMCom = () => {
  const element = <div>Hello</div>;
  console.log(element); // 输出虚拟 DOM 对象（如 { type: 'div', props: { ... } }）
  return element;
};

export default VDOMCom