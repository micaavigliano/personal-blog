import { useState, useEffect } from 'react';
import { Mail, Check, AlertCircle, Loader2, Sparkles, PartyPopper } from 'lucide-react';
import { useI18n } from '@/lib/I18nProvider';
import { getTranslation, type TranslationKey } from '@/lib/translations';

const NewsletterSubscribe = () => {
  const { locale } = useI18n()
  const t = (key: TranslationKey) => getTranslation(locale, key)
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  // Check if already subscribed on mount
  // useEffect(() => {
  //   //const stored = window.sessionStorage?.getItem('newsletter_subscribed');
  //   if (stored) {
  //     try {
  //       const parsed = JSON.parse(stored);
  //       if (parsed?.email) {
  //         setEmail(parsed.email);
  //         setStatus('success');
  //       }
  //     } catch { }
  //   }
  // }, []);

  const validateEmail = (value: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  };

  // interface StoredSubscription {
  //   email: string;
  //   name?: string;
  //   subscribedAt?: string;
  // }

 const handleSubmit = async (e?: React.SyntheticEvent): Promise<void> => {
  e?.preventDefault();
  setMessage('');

  if (!validateEmail(email)) {
    setStatus('error');
    setMessage(t('newsletter.valid.email'));
    return;
  }

  setStatus('loading');

  try {
    const res = await fetch('/.netlify/functions/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Send whatever you want to store; your function already supports { email, name }
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        name: name.trim() || undefined,
        locale,                 // nice to have for targeting
        source: 'newsletter-form', // optional: where it came from
      }),
    });

    // The function returns:
    // 201 { message: "Subscribed", subscriber: {...} }
    // 200 { already: true, message: "Already subscribed" }
    // 400/500 { message: "..." }
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setStatus('error');
      setMessage(data?.message || t('newsletter.error.msg'));
      return;
    }

    // Success (new or already)
    const successMsg = data?.already
      ? 'already' // add this key to your i18n if you like
      : t('newsletter.success.msg');

    setMessage(successMsg);

    // Reset UI back to initial state
    setEmail('');
    setName('');
    setStatus('idle');

    // Optional: remember they subscribed (if you want to alter UI next visit)
    try {
      window.sessionStorage?.setItem(
        'newsletter_subscribed',
        JSON.stringify({
          email: (data?.subscriber?.email as string) || undefined,
          subscribedAt: new Date().toISOString(),
        })
      );
    } catch {}
  } catch {
    setStatus('error');
    setMessage(t('newsletter.error.msg'));
  }
};



  // Success state
  // if (status === 'success' && email) {
  //   return (
  //     <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
  //       <div className="max-w-md mx-auto text-center">
  //         <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
  //           <Check className="w-8 h-8 text-green-600" aria-hidden="true" />
  //         </div>
  //         <h3 className="text-2xl font-bold mb-2 text-gray-900">
  //           {t('newsletter.subscribed.success')}
  //         </h3>
  //         <p className="text-sm mb-3 text-gray-600">
  //           {email}
  //         </p>
  //         <p className="text-sm text-gray-600">
  //           {t('newsletter.subscribed.msg')}
  //         </p>
  //         <div className="mt-4 p-3 rounded-lg bg-green-50 text-green-700 text-sm flex items-center justify-center gap-4">
  //           <PartyPopper className="w-4 h-4" aria-hidden="true" />
  //           <p>{message}</p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <article className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl max-w-md mx-auto" aria-labelledby="newsletter-subscribe-title">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 bg-purple-100 text-purple-600">
            <Mail className="w-7 h-7" aria-hidden="true" />
          </div>
          <h3 className="text-2xl font-bold mb-2 text-gray-900" id="newsletter-subscribe-title">
            {t('newsletter.title')}
          </h3>
          <p className="text-sm text-gray-600">
            {t('newsletter.description')}
          </p>
        </div>

        {/* Form Fields */}
        <form className="space-y-3">
          <div>
            <label htmlFor="newsletter-name" className="sr-only">
              {t('contact.form.name')}
            </label>
            <input
              id="newsletter-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('contact.form.placeholder.name')}
              disabled={status === 'loading'}
              className="w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed placeholder-gray-400 bg-white border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="newsletter-email" className="sr-only">
              {t('contact.form.email')}
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('contact.form.placeholder.email')}
              disabled={status === 'loading'}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed placeholder-gray-400 bg-white border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-blue-500 ${status === 'error' ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                }`}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
              aria-invalid={status === 'error'}
              aria-describedby={message ? 'newsletter-message' : undefined}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={status === 'loading' || !email}
            className="w-full px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/30"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                <span>{t('newsletter.subscribing')}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" aria-hidden="true" />
                <span>{t('newsletter.button.text')}</span>
              </>
            )}
          </button>
        </form>

        {/* Message */}
        {message && status !== 'success' && (
          <div
            id="newsletter-message"
            role="alert"
            aria-live="polite"
            className={`mt-4 p-3 rounded-lg flex items-start gap-2 ${status === 'error'
              ? 'bg-red-50 text-red-700 border border-red-200'
              : 'bg-green-50 text-green-700 border border-green-200'
              }`}
          >
            {status === 'error' ? (
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
            ) : (
              <Check className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
            )}
            <p className="text-sm">{message}</p>
          </div>
        )}

        {/* Privacy Note */}
        <p className="text-xs text-center mt-4 text-gray-700 opacity-75">
          {t('newsletter.privacy')}
        </p>
    </article>
  );
};

export default NewsletterSubscribe;