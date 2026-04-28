import { motion } from "framer-motion";
import { useState, FormEvent } from "react";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/LanguageContext";

const FloatingInput = ({
  name,
  label,
  type,
  value,
  onChange,
}: {
  name: string;
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
}) => {
  const [focused, setFocused] = useState(false);
  const float = focused || value.length > 0;

  return (
    <div className="relative">
      <input
        id={name}
        name={name}
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="peer w-full bg-transparent border-b border-border pt-7 pb-3 px-0 text-foreground focus:outline-none focus:border-gold transition-colors duration-500"
      />
      <label
        htmlFor={name}
        className={`absolute left-0 pointer-events-none transition-all duration-500 ease-cinematic ${
          float
            ? "top-1 text-xs text-gold tracking-wider uppercase"
            : "top-7 text-base text-muted-foreground"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

const Contact = () => {
  const { t } = useLanguage();

  // 👉 state form
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    product: "",
  });

  const [loading, setLoading] = useState(false);

  const fields = [
    { name: "name", label: t("contact.field.name"), type: "text" },
    { name: "email", label: t("contact.field.email"), type: "email" },
    { name: "phone", label: t("contact.field.phone"), type: "tel" },
    { name: "product", label: t("contact.field.product"), type: "text" },
  ];


  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      const res = await fetch("api.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gửi thất bại");
      }

      toast.success(t("contact.toast") || "Gửi thành công!");

      // 👉 reset form
      setForm({
        name: "",
        email: "",
        phone: "",
        product: "",
      });

    } catch (err: any) {
      toast.error(err.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-8 md:py-28 bg-secondary">
      <div className="container grid lg:grid-cols-2 gap-16 lg:gap-24">
        
      
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-gold font-medium">
            {t("contact.eyebrow")}
          </span>

          <h2 className="mt-4 font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05]">
            {t("contact.title.1")}{" "}
            <span className="italic text-gradient-gold">
              {t("contact.title.2")}
            </span>.
          </h2>

          <p className="mt-6 text-muted-foreground max-w-md leading-relaxed">
            {t("contact.body")}
          </p>

          <div className="mt-10 space-y-4 text-sm">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                {t("contact.office.label")}
              </div>
              <div className="mt-1 font-medium">
                {t("contact.office.value")}
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                {t("contact.email.label")}
              </div>
              <div className="mt-1 font-medium">
                {t("contact.email.value")}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          {fields.map((f) => (
            <FloatingInput
              key={f.name}
              {...f}
              value={form[f.name as keyof typeof form]}
              onChange={(val) =>
                setForm((prev) => ({ ...prev, [f.name]: val }))
              }
            />
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto inline-flex items-center justify-center px-10 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-gradient-gold hover:text-gold-foreground transition-all duration-500 ease-cinematic disabled:opacity-50"
          >
            {loading ? "Sending..." : t("contact.submit")}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;