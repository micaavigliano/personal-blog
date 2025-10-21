import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { Mail, Calendar, Clock } from "lucide-react";
import { useState } from "react";
import { getTranslation } from "@/lib/translations"
import type { TranslationKey } from "@/lib/translations"
import { useI18n } from "@/lib/I18nProvider";

const Contact = () => {
  const { locale } = useI18n()
  const t = (key: TranslationKey) => getTranslation(locale, key)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setStatus("idle");

    try {
      const res = await fetch("/.netlify/functions/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({})); // handle empty body

      if (res.ok && data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        console.error("Server error:", data);
        setStatus("error");
      }
    } catch (err) {
      console.error("Network error:", err);
      setStatus("error");
    } finally {
      setIsSending(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <article aria-labelledby="contact-title" className="py-20 px-6 bg-muted container mx-auto max-w-6xl">
      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center" id="contact-title">{t('contact.title')}</h2>
      <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
        {t('contact.description')}
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-6">{t('contact.connect')}</h3>
          <p className="text-muted-foreground mb-8">
            {t('contact.connect.desc')}
          </p>

          <div className="space-y-6 mb-8">
            <article className="border-2 pt-6 rounded-lg bg-card text-card-foreground shadow-sm" aria-labelledby="contact-email-title">
              <div className="flex items-start gap-4 p-6 pt-0">
                <div className="w-12 h-12 rounded-full bg-lavender flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-foreground" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-bold mb-1" id="contact-email-title">{t('contact.email')}</h4>
                  <a
                    href="mailto:micaela.avigliano@gmail.com"
                    className="text-muted-foreground hover:text-foreground transition-colors underline"
                  >
                    micaela.avigliano@gmail.com
                  </a>
                </div>
              </div>
            </article>

            <article className="border-2 pt-6 rounded-lg bg-card text-card-foreground shadow-sm">
              <div className="flex items-start gap-4 p-6 pt-0">
                <div className="w-12 h-12 rounded-full bg-mint flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-foreground" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-bold mb-2">{t('contact.schedule')}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {t('contact.schedule.desc')}
                  </p>
                  <Link
                    to="/$locale/book"
                    params={{ locale }}
                    className="border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2"
                  >
                    {t('contact.schedule.cta')}
                  </Link>
                </div>
              </div>
            </article>

            <article className="border-2 pt-6 rounded-lg bg-card text-card-foreground shadow-sm">
              <div className="flex items-start gap-4 p-6 pt-0">
                <div className="w-12 h-12 rounded-full bg-sky flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-foreground" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">{t('contact.response.time')}</h4>
                  <p className="text-sm text-muted-foreground">
                    {t('contact.message')}
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>

        <article className="border-2 rounded-lg bg-card text-card-foreground shadow-sm" aria-labelledby="contact-form-title">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-2xl font-semibold leading-none tracking-tight" id="contact-form-title">{t('contact.form.title')}</h2>
            <p className="text-sm text-muted-foreground">
              {t('contact.form.desc')}
            </p>
          </div>
          <div className="p-6 pt-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">
                  {t('contact.form.name')} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1.5"
                  placeholder={`${t('contact.form.placeholder.name')}`}
                />
              </div>

              <div>
                <Label htmlFor="email">
                  {t('contact.form.email')} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={`${t('contact.form.placeholder.email')}`}
                  required
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="subject">
                  {t('contact.form.subject')} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={`${t('contact.form.placeholder.subject')}`}
                  required
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="message">
                  {t('contact.form.message')} <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={`${t('contact.form.placeholder.message')}`}
                  required
                  rows={5}
                  className="mt-1.5"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-violet-200 text-accent-foreground hover:bg-accent/90"
                disabled={isSending}
              >
                {isSending ? t('contact.form.loading') : t("contact.form.send")}
              </Button>
              {status === "success" && <p className="text-green-600">{t('contact.form.success')}</p>}
              {status === "error" && <p className="text-red-600">{t('contact.form.fail')}</p>}
            </form>
          </div>
        </article>
      </div>
    </article>
  );
};

export default Contact;
