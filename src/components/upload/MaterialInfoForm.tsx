export default function MaterialInfoForm({ disabled }: { disabled: boolean }) {
  return (
    <div className="panel p-5">
      <div className="text-sm font-semibold mb-4">자료 정보</div>
      <div className="grid grid-cols-2 gap-4">
        <div className="field">
          <label className="field-label">자료명</label>
          <input
            className="input"
            placeholder="자료명을 입력하세요."
            defaultValue="봄맞이 신용대출 상세페이지"
            disabled={disabled}
          />
        </div>
        <div className="field">
          <label className="field-label">게재 위치</label>
          <select className="select" defaultValue="상세페이지" disabled={disabled}>
            <option>상세페이지</option>
            <option>홈페이지</option>
            <option>카드뉴스</option>
            <option>FAQ</option>
          </select>
        </div>
        <div className="field">
          <label className="field-label">대출 유형</label>
          <select className="select" defaultValue="신용대출" disabled={disabled}>
            <option>신용대출</option>
            <option>담보대출</option>
            <option>전세자금대출</option>
          </select>
        </div>
        <div className="field">
          <label className="field-label">상품명</label>
          <input
            className="input"
            placeholder="상품명을 입력하세요."
            defaultValue="JB 봄맞이 직장인 신용대출"
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
}
