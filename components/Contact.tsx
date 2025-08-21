"use client"

import { Mail, Send, Calendar, Heart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Cards"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getTranslation, TranslationKey } from "@/lib/translations"
import { getLocaleFromPathname } from "@/lib/i18n"
import { useState } from "react"

export function Contact() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const t = (key: TranslationKey) => getTranslation(locale, key)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSending, setIsSending] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)
    setStatus("idle")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        setStatus("error")
      }
    } catch (err) {
      console.error(err)
      setStatus("error")
    } finally {
      setIsSending(false)
    }
  }

  const getLocalizedPath = (path: string) => {
    return `/${locale}${path}`
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-sunshine-50">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 relative flex flex-row gap-4 justify-center items-center">
          <span className="text-lavender-700">{t("contact.title")}</span>
          <Heart className="w-6 h-6 text-rose-400 animate-subtle-pulse" aria-hidden="true" />
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-rose-300 rounded-full opacity-60"></div>
        </h2>
        <p className="text-xl text-lavender-600 max-w-3xl mx-auto leading-relaxed font-medium">
          {t("contact.description")}
        </p>
      </div>

      <form className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16" onSubmit={handleSubmit}>
        <div>
          <h3 className="text-2xl font-bold mb-6 text-lavender-700">{t("contact.connect")}</h3>
          <p className="text-lavender-600 mb-8 leading-relaxed font-medium">{t("contact.connect.desc")}</p>

          <div className="space-y-6">
            <div className="mb-8 flex items-center gap-4">
              <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center shadow-soft border-2 border-rose-200">
                <Mail className="w-8 h-8 text-rose-700" aria-hidden="true" />
              </div>
              <div>
                <h4 className="font-semibold text-lavender-800 text-lg">{t("contact.email")}</h4>
                <p className="text-lavender-600 code-style">micaela.avigliano@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="bg-lavender-50 rounded-3xl p-6 border-2 border-lavender-200 shadow-soft text-center lg:w-full w-7/12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-lavender-200 rounded-2xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-lavender-700" aria-hidden="true" />
              </div>
              <div>
                <h4 className="font-semibold text-lavender-800">{t("contact.schedule")}</h4>
                <p className="text-lavender-600 text-sm">{t("contact.schedule.desc")}</p>
              </div>
            </div>
            <Link href={getLocalizedPath("/book")} className="w-full underline underline-offset-2 text-lavender-600 hover:bg-lavender-700 text-white transform hover:-translate-y-1 transition-all">
              {t("contact.schedule.cta")}
            </Link>
          </div>
        </div>

        <Card className="border-2 border-cream-200 shadow-soft-lg rounded-3xl bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-lavender-700">{t("contact.form.title")}</CardTitle>
            <p className="text-lavender-600 font-medium">{t("contact.form.desc")}</p>
          </CardHeader>
          <CardContent className="space-y-6 grid md:grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-lavender-600 mb-2" htmlFor="name-id">{t("contact.form.name")} *</label>
              <Input
                placeholder={t("contact.form.placeholder.name")}
                className="rounded-2xl border-2 border-cream-500 focus:border-lavender-400 bg-cream-50"
                id="name-id"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-lavender-600 mb-2" htmlFor="email-id">
                {t("contact.form.email")} *
              </label>
              <Input
                type="email"
                placeholder={`${t("contact.form.placeholder.email")}@email.com`}
                className="rounded-2xl border-2 border-cream-500 focus:border-lavender-400 bg-cream-50"
                id="email-id"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-lavender-600 mb-2" htmlFor="subject-id">
                {t("contact.form.subject")} *
              </label>
              <Input
                placeholder={t("contact.form.placeholder.subject")}
                className="rounded-2xl border-2 border-cream-500 focus:border-lavender-400 bg-cream-50"
                id="subject-id"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-lavender-600 mb-2" htmlFor="message-id">
                {t("contact.form.message")} *
              </label>
              <Textarea
                placeholder={t("contact.form.placeholder.message")}
                rows={5}
                className="rounded-2xl border-2 border-cream-500 focus:border-lavender-400 bg-cream-50"
                id="message-id"
                value={formData.message}
                onChange={handleChange}
                name="message"
                required
              />
            </div>

            <button
              className="w-full bg-rose-600 hover:bg-rose-700 text-white rounded-2xl py-4 shadow-soft hover:shadow-soft-lg transform hover:-translate-y-1 transition-all border-2 hover:border-white/20 flex flex-row items-center justify-center"
              type="submit"
              disabled={isSending}
            >
              <Send className="w-5 h-5 mr-2" />
              {isSending ? "Sending..." : t("contact.form.send")}
            </button>
            {status === "success" && <p className="text-green-600">Message sent successfully!</p>}
            {status === "error" && <p className="text-red-600">Something went wrong. Try again later.</p>}
          </CardContent>
        </Card>
      </form>

      <div className="text-center bg-sky-50 rounded-3xl p-8 max-w-2xl mx-auto border-2 border-sky-200 shadow-soft">
        <h3 className="text-xl font-bold text-sky-700 mb-4">{t("contact.response.time")}</h3>
        <p className="text-lavender-600 font-medium">
          {t("contact.message")}
        </p>
      </div>
    </section >
  )
}
