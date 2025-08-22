import React, { useState, useEffect } from 'react';
import './FlashSale.css';


const FlashSale = () => {
  const [countDown, setCountDown] = useState(2);
  const [buttonText, setButtonText] = useState('还剩1秒抢购');
  const [loading, setLoading] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);


  useEffect(() => {
    if (countDown > 0) {
      const timer = setTimeout(() => {
        setCountDown(countDown - 1);
        setButtonText(`还剩下${countDown - 1}可以抢购`)
      }, 1000);

      return () => {
        clearTimeout(timer)
      }
    } else {
      setButtonText('抢购')
    };

  }, [countDown]);

  /**
   * 这个逻辑是错误的??
   * 按钮不可以点击，但是显示。
   * loading状态
   * 正常展示状态倒计时状态
   * 可以抢购状态
   * 置灰状态
   * */
  const disabled = countDown > 0 || loading || isPurchased;
  const purchasedCls = isPurchased ? 'disabled' : '';
  const pursuedClick = () => {
    if (!disabled) {
      new Promise((resolve, reject) => {
        setLoading(true);
        setTimeout(() => {
          resolve();
          setLoading(false);
          setButtonText('已抢购')
          setIsPurchased(true)
        }, 5000)
      })
    }
  };

  console.log('loading==>', loading)

  return (
    <div className="flash-sale-container">
      <div className="flash-sale-content">
        <div className="flash-sale-left">
          <div className="flash-sale-title">
            主标题
          </div>
          <div className="flash-sale-sub-title">
            这个是检测2行超长的副标题这个是检测2行超长的副标题这个是检测2行超长的副标题这个是检测2行超长的副标题这个是检测2行超长的副标题这个是检测2行超长的副标题
          </div>
        </div>
        <div className={`flash-sale-right-button ${purchasedCls}`} onClick={pursuedClick}>
          {!loading ? buttonText : 'loading'}
        </div>
      </div>
    </div >
  );
};

export default FlashSale; 