import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import DataSharingDemo from './components/DataSharingDemo';
import DataSharingComparison from './components/DataSharingComparison';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>商品管理系统</h1>
          <p>使用 ahooks useRequest 实现 SWR 缓存功能</p>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/demo" element={<DataSharingDemo />} />
            <Route path="/comparison" element={<DataSharingComparison />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>演示项目：商品列表页和详情页共享缓存数据</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
