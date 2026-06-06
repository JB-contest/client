export interface MaterialInfo {
  name: string;
  location: string;
  loanType: string;
  title: string;
}

interface Props {
  disabled: boolean;
  value: MaterialInfo;
  onChange: (patch: Partial<MaterialInfo>) => void;
}

export default function MaterialInfoForm({ disabled, value, onChange }: Props) {
  return (
    <div className="panel p-5">
      <div className="text-sm font-semibold mb-4">자료 정보</div>
      <div className="grid grid-cols-2 gap-4">
        <div className="field">
          <label className="field-label">자료명</label>
          <input
            className="input"
            placeholder="자료명을 입력하세요."
            value={value.name}
            onChange={(e) => onChange({ name: e.target.value })}
            disabled={disabled}
          />
        </div>
        <div className="field">
          <label className="field-label">게재 위치</label>
          <select
            className="select"
            value={value.location}
            onChange={(e) => onChange({ location: e.target.value })}
            disabled={disabled}
          >
            <option>상세페이지</option>
            <option>홈페이지</option>
            <option>카드뉴스</option>
            <option>FAQ</option>
          </select>
        </div>
        <div className="field">
          <label className="field-label">대출 유형</label>
          <select
            className="select"
            value={value.loanType}
            onChange={(e) => onChange({ loanType: e.target.value })}
            disabled={disabled}
          >
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
            value={value.title}
            onChange={(e) => onChange({ title: e.target.value })}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
}
