import React, { useState, useDeferredValue, useMemo, useEffect, useTransition } from 'react';


const defaultCount = 5000;

// 生成大量列表项
const generateItems = (count, filter) => {
  const items = [];
  for (let i = 0; i < count; i++) {
    if (!filter || i.toString().includes(filter)) {
      items.push({ id: i, name: `项目 ${i}` });
    }
  }
  return items;
};

// 单个列表项组件
const ListItem = ({ item }) => {
  // 模拟一些渲染开销
  const startTime = performance.now();
  while (performance.now() - startTime < 1) {
    // 阻塞JS线程0.5ms来模拟渲染开销
  }
  return <div className="list-item">{item.name}</div>;
};

// 列表组件 - 使用memo优化，只在items变化时才rerender
const ItemList = React.memo(({ items }) => {
  return (
    <div className="item-list">
      {items.map(item => (
        <ListItem key={item.id} item={item} />
      ))}
    </div>
  );
});

// 主演示组件
const ReactSchedulerDemo = () => {
  const [filter, setFilter] = useState('');
  const [mode, setMode] = useState('normal');
  const [isPending, startTransition] = React.useTransition();
  
  // 使用useDeferredValue来延迟filter值
  const deferredFilter = useDeferredValue(filter);
  
  // 根据模式选择使用哪个filter
  const displayFilter = mode === 'concurrent' ? deferredFilter : filter;
  
  // 过滤项目
  const filteredItems = useMemo(() => {
    return generateItems(defaultCount, displayFilter);
  }, [displayFilter]);
  
  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    
    // 在并发模式下使用startTransition
  };
  
  return (
    <div className="demo-container">
      <h1>React调度器任务拆分性能演示</h1>
      
      <div className="controls">
        <div className="input-group">
          <label>搜索过滤: </label>
          <input
            type="text"
            value={filter}
            onChange={handleFilterChange}
            placeholder="输入数字过滤..."
          />
        </div>
        
        <div className="mode-selector">
          <button 
            className={mode === 'normal' ? 'active' : ''}
            onClick={() => setMode('normal')}
          >
            普通模式
          </button>
          <button 
            className={mode === 'concurrent' ? 'active' : ''}
            onClick={() => setMode('concurrent')}
          >
            并发模式
          </button>
        </div>
      </div>
      
      <div className="status">
        当前模式: <strong>{mode === 'concurrent' ? '并发模式 (自动拆分任务)' : '普通模式 (同步渲染)'}</strong>
        {mode === 'concurrent' && isPending && <span className="loading"> 渲染中...</span>}
      </div>
      
      <div className="results">
        <p>显示项目: {filteredItems.length} / {defaultCount}</p>
        <ItemList items={filteredItems} />
      </div>
    </div>
  );
};

export default ReactSchedulerDemo;