import { useState } from "react";

const makeCode = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 6 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
};

const inputBase =
  "w-full h-[34px] rounded-[2px] border border-[#e3e3e8] bg-white text-[14px] text-[#222] outline-none focus:border-[#6a0fd9]";

const Field = ({ label, required, error, children }) => (
  <div className="mb-5">
    <label className="mb-2 block text-[13px] font-semibold text-[#333]">
      {label}
      {required && <span className="ml-1 text-red-600">*</span>}
    </label>
    {children}
    {error && <p className="mt-1 text-[12px] text-red-600">{error}</p>}
  </div>
);

const IconInput = ({ icon, ...props }) => (
  <div className="relative">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9a9aa5]">
      {icon}
    </span>
    <input {...props} className={`${inputBase} pl-9 pr-3`} />
  </div>
);

const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);
const GlobeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
  </svg>
);
const UploadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 16V4M7 9l5-5 5 5M4 20h16" />
  </svg>
);
const RefreshIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 12a8 8 0 11-2.5-5.8M20 4v5h-5" />
  </svg>
);

const initialValues = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  facebook: "",
  linkedin: "",
  message: "",
};

const JoinTeamForm = ({
  title,
  description, // տեքստ կամ JSX
  submitText,
  successText,
  onSubmit,
}) => {
  const [values, setValues] = useState(initialValues);
  const [files, setFiles] = useState([]);
  const [code, setCode] = useState(makeCode);
  const [captcha, setCaptcha] = useState("");
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const setField = (name) => (e) => {
    const value =
      name === "phone" ? e.target.value.replace(/[^\d\s]/g, "") : e.target.value;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const refreshCaptcha = () => {
    setCode(makeCode());
    setCaptcha("");
  };

  const validate = () => {
    const er = {};
    const required = "Լրացրեք այս դաշտը";
    if (!values.firstName.trim()) er.firstName = required;
    if (!values.lastName.trim()) er.lastName = required;
    if (values.phone.replace(/\s/g, "").length < 8) er.phone = "Մուտքագրեք հեռախոսահամարը";
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) er.email = "Սխալ էլ. հասցե";
    if (files.length === 0) er.files = "Կցեք Ձեր ռեզյումեն";
    if (captcha.trim().toUpperCase() !== code) er.captcha = "Սխալ ծածկագիր";
    return er;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) return;

    setSending(true);
    try {
      await onSubmit?.({
        values: { ...values, phone: `+374 ${values.phone.trim()}` },
        files,
      });
      setValues(initialValues);
      setFiles([]);
      refreshCaptcha();
      setDone(true);
    } catch (err) {
      console.error(err);
      setErrors({ form: "Չհաջողվեց ուղարկել, փորձեք նորից" });
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="w-full bg-white px-4 py-14">
      <div className="mx-auto max-w-[775px]">
        <h2 className="mb-8 text-[24px] font-medium text-[#6a0fd9] md:text-[28px]">
          {title}
        </h2>
        <div className="mb-8 text-center text-[14px] leading-6 text-[#333]">
          {description}
        </div>

        {done ? (
          <p className="rounded bg-[#faf7ff] p-6 text-center text-[16px] font-semibold text-[#6a0fd9]">
            {successText}
          </p>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <Field label="Անուն" required error={errors.firstName}>
              <input
                value={values.firstName}
                onChange={setField("firstName")}
                className={`${inputBase} px-3`}
              />
            </Field>

            <Field label="Ազգանուն" required error={errors.lastName}>
              <input
                value={values.lastName}
                onChange={setField("lastName")}
                className={`${inputBase} px-3`}
              />
            </Field>

            <Field label="Հեռախոսահամար" required error={errors.phone}>
              <div className="flex h-[34px] items-center rounded-[2px] border border-[#e3e3e8] bg-white focus-within:border-[#6a0fd9]">
                <span className="flex items-center gap-2 border-r border-[#e3e3e8] px-3 text-[13px] text-[#222]">
                  {/* Հայաստանի դրոշ */}
                  <span className="flex h-[10px] w-[18px] flex-col overflow-hidden">
                    <span className="flex-1 bg-[#d90012]" />
                    <span className="flex-1 bg-[#0033a0]" />
                    <span className="flex-1 bg-[#f2a800]" />
                  </span>
                  +374
                </span>
                <input
                  type="tel"
                  inputMode="numeric"
                  value={values.phone}
                  onChange={setField("phone")}
                  className="h-full flex-1 bg-transparent px-3 text-[14px] outline-none"
                />
              </div>
            </Field>

            <Field label="Էլ. հասցե" error={errors.email}>
              <IconInput
                type="email"
                icon={<MailIcon />}
                value={values.email}
                onChange={setField("email")}
              />
            </Field>

            <Field label="Facebook ով. կայքում անձնական էջի հղում">
              <IconInput
                icon={<GlobeIcon />}
                value={values.facebook}
                onChange={setField("facebook")}
              />
            </Field>

            <Field label="LinkedIn ով. կայքում անձնական էջի հղում">
              <IconInput
                icon={<GlobeIcon />}
                value={values.linkedin}
                onChange={setField("linkedin")}
              />
            </Field>

            <Field label="Ուղեկցող նամակ">
              <textarea
                rows={4}
                value={values.message}
                onChange={setField("message")}
                className="w-full resize-y rounded-[2px] border border-[#e3e3e8] p-3 text-[14px] outline-none focus:border-[#6a0fd9]"
              />
            </Field>

            <Field label="Վերբեռնեք Ձեր ռեզյումեն" required error={errors.files}>
              <label className="flex min-h-[64px] cursor-pointer items-center justify-between rounded-[2px] border border-dashed border-[#d9d9df] px-5 text-[13px] text-[#444] hover:border-[#6a0fd9]">
                <span>
                  {files.length
                    ? files.map((f) => f.name).join(", ")
                    : "Կցել ֆայլը / ֆայլերը"}
                </span>
                <UploadIcon />
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    setFiles(Array.from(e.target.files));
                    setErrors((er) => ({ ...er, files: undefined }));
                  }}
                />
              </label>
            </Field>

            <Field label="Ստուգման ծածկագիր" required error={errors.captcha}>
              <div className="max-w-[388px] border border-[#cfcfd6] p-3">
                <p className="mb-2 text-[12px] text-[#555]">Մուտքագրեք ծածկագիրը</p>
                <div className="mb-3 flex items-center gap-4">
                  <input
                    value={captcha}
                    onChange={(e) => {
                      setCaptcha(e.target.value);
                      setErrors((er) => ({ ...er, captcha: undefined }));
                    }}
                    className={`${inputBase} flex-1 px-3`}
                  />
                  <button
                    type="button"
                    onClick={refreshCaptcha}
                    aria-label="Թարմացնել"
                    className="text-[#333] hover:text-[#6a0fd9]"
                  >
                    <RefreshIcon />
                  </button>
                </div>
                <div className="flex h-[52px] select-none items-center justify-center border border-[#eee] bg-white">
                  <span className="text-[26px] font-black italic tracking-[0.12em] text-[#111] line-through decoration-[#111]/70">
                    {code}
                  </span>
                </div>
              </div>
            </Field>

            {errors.form && (
              <p className="mb-3 text-[13px] text-red-600">{errors.form}</p>
            )}

            <button
              type="submit"
              disabled={sending}
              className="mt-2 h-[38px] w-full rounded-full bg-[#6a0fd9] text-[13px] font-semibold text-white transition hover:bg-[#5a0bbd] disabled:opacity-60"
            >
              {sending ? "Ուղարկվում է..." : submitText}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default JoinTeamForm;