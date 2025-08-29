import React, { useState, useEffect } from 'react';
import './FlashSale.css';

const FlashSale = () => {
  const [countdown, setCountdown] = useState(5);
  const [buttonText, setButtonText] = useState('5s');
  const [isPurchased, setIsPurchased] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 倒计时功能
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
        setButtonText(`${countdown - 1}s`);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setButtonText('抢购');
    }
  }, [countdown]);

  // 模拟抢购请求
  const handlePurchase = async () => {
    if (isPurchased || isLoading) return;

    setIsLoading(true);
    try {
      // 模拟异步请求，延迟1秒
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsPurchased(true);
      setButtonText('已抢购');
    } catch (error) {
      console.error('抢购失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 判断按钮是否可点击
  const isButtonDisabled = countdown > 0 || isPurchased || isLoading;

  return (
    <div className="flash-sale-container">
      <h1 className="page-title">限时抢购</h1>

      <div className="card-container">
        <div className="product-card">
          <div className="product-image">
            <img src="https://via.placeholder.com/300x200/ff6b6b/ffffff?text=商品图片" alt="商品图片" />
          </div>

          <div className="product-info">
            <h2 className="product-title">限时特价商品</h2>
            <p className="product-subtitle">
              这是一个非常长的副标题，用来测试多行文本的显示效果，看看是否能够正确显示省略号
            </p>
            <div className="price-section">
              <span className="current-price">¥99</span>
              <span className="original-price">¥199</span>
              <span className="discount">5折</span>
            </div>

            <button
              className={`purchase-button ${isButtonDisabled ? 'disabled' : ''}`}
              onClick={handlePurchase}
              disabled={isButtonDisabled}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashSale; 