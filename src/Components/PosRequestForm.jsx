import { useState } from "react";

const today = () => new Date().toISOString().slice(0, 10);

const initialState = {
  firstName: "",
  lastName: "",
  phonePrefix: "+374",
  phone: "",
  orgName: "",
  tin: "",
  orgCreatedAt: today(),
  legalStreet: "",
  legalRegion: "",
  legalCity: "",
  legalZip: "",
  directorFirstName: "",
  directorLastName: "",
  passportNumber: "",
  passportIssuedAt: today(),
  passportIssuedBy: "",
  contactPhones: "",
  contactEmail: "",
  legalForm: "",
  terminalType: "",
  pointName: "",
  pointAddress: "",
  website: "",
  avgTurnover: "",
  productsDescription: "",
  previousCardAcceptance: "",
  expectedCardSales: "",
  notes: "",
  consent: false,
};

const LEGAL_FORMS = ["ԱՁ", "ՍՊԸ", "ՓԲԸ", "ԲԲԸ", "ԱՅԼ"];
const TERMINAL_TYPES = ["POS", "ՀԴՄ POS", "V-POS", "M-POS"];

const inputCls =
  "w-full h-12 rounded-lg border border-gray-200 bg-white px-4 text-gray-800 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100";
const areaCls =
  "w-full min-h-[70px] rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 resize-y";

function Label({ children, required }) {
  return (
    <label className="mb-2 block text-[17px] font-semibold text-gray-800">
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}

function Hint({ children }) {
  return <p className="mt-1 text-[10px] italic text-gray-400">{children}</p>;
}

function Section({ children }) {
  return <div className="mb-6">{children}</div>;
}

function TwoCols({ children }) {
  return <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">{children}</div>;
}

function RadioGroup({ name, options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2">
      {options.map((opt) => (
        <label key={opt} className="flex cursor-pointer items-center gap-2 text-gray-600">
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
            className="h-5 w-5 accent-purple-700"
          />
          {opt}
        </label>
      ))}
    </div>
  );
}

export default function PosRequestForm({ onSubmit }) {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | done | error

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const setVal = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  const requiredFields = [
    "orgName",
    "tin",
    "orgCreatedAt",
    "passportNumber",
    "passportIssuedAt",
    "passportIssuedBy",
    "contactPhones",
    "legalForm",
    "terminalType",
    "pointName",
    "productsDescription",
    "expectedCardSales",
  ];

  const validate = () => {
    const next = {};
    requiredFields.forEach((k) => {
      if (!String(form[k]).trim()) next[k] = true;
    });
    if (!form.consent) next.consent = true;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setStatus("sending");
      const { consent, ...data } = form;
      if (onSubmit) await onSubmit({ ...data, createdAt: new Date().toISOString() });
      setStatus("done");
      setForm(initialState);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const err = (k) => (errors[k] ? "!border-red-400" : "");

  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="mx-auto max-w-[750px] rounded-3xl border border-indigo-100 bg-white p-6 shadow-sm sm:p-10"
      >
        <h2 className="mb-8 text-2xl font-bold text-purple-700">
          V-POS, POS կամ mPOS տերմինալի տեղադրման հայտ
        </h2>

        <Section>
          <Label>Անուն Ազգանուն</Label>
          <TwoCols>
            <div>
              <input className={inputCls} value={form.firstName} onChange={set("firstName")} />
              <Hint>Անուն</Hint>
            </div>
            <div>
              <input className={inputCls} value={form.lastName} onChange={set("lastName")} />
              <Hint>Ազգանուն</Hint>
            </div>
          </TwoCols>
        </Section>

        <Section>
          <Label>Հեռախոսի համար</Label>
          <div className="flex h-12 overflow-hidden rounded-lg border border-gray-200 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100">
            <div className="flex items-center gap-2 bg-gray-100 px-3 text-xs text-gray-700">
              <span className="flex h-3 w-5 flex-col overflow-hidden rounded-sm">
                <span className="flex-1 bg-red-600" />
                <span className="flex-1 bg-blue-800" />
                <span className="flex-1 bg-orange-400" />
              </span>
              {form.phonePrefix}
              <span className="text-[8px]">▼</span>
            </div>
            <input
              type="tel"
              className="flex-1 px-4 outline-none"
              value={form.phone}
              onChange={set("phone")}
            />
          </div>
        </Section>

        <Section>
          <Label required>Կազմակերպության անվանում</Label>
          <input className={`${inputCls} ${err("orgName")}`} value={form.orgName} onChange={set("orgName")} />
        </Section>

        <Section>
          <Label required>ՀՎՀՀ</Label>
          <input className={`${inputCls} ${err("tin")}`} value={form.tin} onChange={set("tin")} />
        </Section>

        <Section>
          <Label required>Կազմակերպության ստեղծման ամսաթիվ օր/ամիս/տարի</Label>
          <input
            type="date"
            className={`${inputCls} sm:w-[60%] ${err("orgCreatedAt")}`}
            value={form.orgCreatedAt}
            onChange={set("orgCreatedAt")}
          />
          <Hint>dd-MMM-yyyy</Hint>
        </Section>

        <Section>
          <Label>Իրավաբանական հասցե</Label>
          <input className={inputCls} value={form.legalStreet} onChange={set("legalStreet")} />
          <Hint>Փողոցի անուն, տան համար, բնակարանի համար</Hint>
          <div className="mt-3">
            <TwoCols>
              <div>
                <input className={inputCls} value={form.legalRegion} onChange={set("legalRegion")} />
                <Hint>Մարզ</Hint>
              </div>
              <div>
                <input className={inputCls} value={form.legalCity} onChange={set("legalCity")} />
                <Hint>Քաղաք</Hint>
              </div>
              <div>
                <input className={inputCls} value={form.legalZip} onChange={set("legalZip")} />
                <Hint>Փոստային կոդ</Hint>
              </div>
            </TwoCols>
          </div>
        </Section>

        <Section>
          <Label>Տնօրենի Անուն Ազգանուն</Label>
          <TwoCols>
            <div>
              <input className={inputCls} value={form.directorFirstName} onChange={set("directorFirstName")} />
              <Hint>Անուն</Hint>
            </div>
            <div>
              <input className={inputCls} value={form.directorLastName} onChange={set("directorLastName")} />
              <Hint>Ազգանուն</Hint>
            </div>
          </TwoCols>
        </Section>

        <Section>
          <Label required>Տնօրենի անձնագրի համարը</Label>
          <input
            className={`${inputCls} sm:w-[60%] ${err("passportNumber")}`}
            value={form.passportNumber}
            onChange={set("passportNumber")}
          />
        </Section>

        <Section>
          <Label required>Անձնագրի տրման ամսաթիվը</Label>
          <input
            type="date"
            className={`${inputCls} sm:w-[60%] ${err("passportIssuedAt")}`}
            value={form.passportIssuedAt}
            onChange={set("passportIssuedAt")}
          />
          <Hint>dd-MMM-yyyy</Hint>
        </Section>

        <Section>
          <Label required>Ում կողմից է տրված</Label>
          <input
            className={`${inputCls} sm:w-[60%] ${err("passportIssuedBy")}`}
            value={form.passportIssuedBy}
            onChange={set("passportIssuedBy")}
          />
        </Section>

        <Section>
          <Label required>Խնդրում ենք նշել իրավասու կոնտակտային անձի հեռախոսահամարները</Label>
          <input className={`${inputCls} ${err("contactPhones")}`} value={form.contactPhones} onChange={set("contactPhones")} />
        </Section>

        <Section>
          <Label>Խնդրում ենք նշել իրավասու կոնտակտային անձի էլ. փոստի հասցեն</Label>
          <input type="email" className={inputCls} value={form.contactEmail} onChange={set("contactEmail")} />
        </Section>

        <Section>
          <Label required>Կազմակերպության իրավական ձևը</Label>
          <RadioGroup name="legalForm" options={LEGAL_FORMS} value={form.legalForm} onChange={setVal("legalForm")} />
          {errors.legalForm && <p className="mt-1 text-xs text-red-500">Ընտրեք տարբերակ</p>}
        </Section>

        <Section>
          <Label required>Պահանջվող տերմինալի ձևը</Label>
          <RadioGroup name="terminalType" options={TERMINAL_TYPES} value={form.terminalType} onChange={setVal("terminalType")} />
          {errors.terminalType && <p className="mt-1 text-xs text-red-500">Ընտրեք տարբերակ</p>}
        </Section>

        <Section>
          <Label required>Առևտրային և սպասարկման կետի անվանում (հայերեն և անգլերեն)</Label>
          <textarea className={`${areaCls} ${err("pointName")}`} value={form.pointName} onChange={set("pointName")} />
        </Section>

        <Section>
          <Label>Առևտրային և սպասարկման կետի հասցե</Label>
          <textarea className={areaCls} value={form.pointAddress} onChange={set("pointAddress")} />
        </Section>

        <Section>
          <Label>Ինտերնետային կայքի անվանում (V-POS-ի դեպքում)</Label>
          <input className={inputCls} value={form.website} onChange={set("website")} />
        </Section>

        <Section>
          <Label>Վերջին տարվա,ամսվա միջին շրջանառությունը ՀՀ դրամով</Label>
          <input className={inputCls} value={form.avgTurnover} onChange={set("avgTurnover")} />
        </Section>

        <Section>
          <Label required>
            Կազմակերպության կողմից վաճառվող ապրանքների կամ ծառայությունների համառոտ նկարագիրը
          </Label>
          <textarea
            className={`${areaCls} ${err("productsDescription")}`}
            value={form.productsDescription}
            onChange={set("productsDescription")}
          />
        </Section>

        <Section>
          <Label>
            Արդյո՞ք նախկինում վճարումներն ընդունել եք վճարային քարտերով: Եթե այո, խնդրում ենք նշել նաև
            սպասարկող կազմակերպության անվանումը և վերջինիս հետ պայմանագիրը խզելու պատճառները:
          </Label>
          <textarea
            className={areaCls}
            value={form.previousCardAcceptance}
            onChange={set("previousCardAcceptance")}
          />
        </Section>

        <Section>
          <Label required>Որքան ամսական իրացում եք կանխատեսում վճարային քարտերով վճարումներով</Label>
          <input
            className={`${inputCls} ${err("expectedCardSales")}`}
            value={form.expectedCardSales}
            onChange={set("expectedCardSales")}
          />
        </Section>

        <Section>
          <Label>Նշումների համար</Label>
          <textarea className={areaCls} value={form.notes} onChange={set("notes")} />
        </Section>

        <label className="mb-10 flex cursor-pointer items-start gap-3 text-xs text-gray-600">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
            className={`mt-0.5 h-4 w-4 accent-purple-700 ${errors.consent ? "outline outline-2 outline-red-400" : ""}`}
          />
          <span>
            Սույն հայտը լրացնելով՝ հավաստում եմ, որ դրանում ներկայացված տվյալները ստույգ են, լրիվ և
            արժանահավատ: Տալիս եմ իմ համաձայնությունը, որպեսզի Բանկը ստուգի դրանց իսկությունը:
          </span>
        </label>

        <div className="flex flex-col items-center gap-3">
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-full bg-purple-700 px-12 py-3 text-lg font-semibold text-white transition hover:bg-purple-800 disabled:opacity-60"
          >
            {status === "sending" ? "Ուղարկվում է..." : "Ուղարկել"}
          </button>
          {Object.keys(errors).length > 0 && (
            <p className="text-sm text-red-500">Լրացրեք բոլոր պարտադիր դաշտերը (*)</p>
          )}
          {status === "done" && <p className="text-sm text-green-600">Հայտը հաջողությամբ ուղարկվեց</p>}
          {status === "error" && <p className="text-sm text-red-500">Սխալ տեղի ունեցավ, փորձեք նորից</p>}
        </div>
      </form>
    </div>
  );
}