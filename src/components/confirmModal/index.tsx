import './index.less';
export default function ConfirmModal() {
  return (
    <div id="overlayDiv" className="overlay none" style={{ display: 'none' }}>
      <div className="confirm-box">
        <div className="confirm-header">
          <h3 className="confirm-title">确认操作</h3>
        </div>
        <div className="confirm-content">您确定要执行此操作吗？</div>
        <div className="confirm-buttons">
          <button className="confirm-button cancel-button">取消</button>
          <button className="confirm-button confirm-button-primary">
            确认
          </button>
        </div>
      </div>
    </div>
  );
}
