import { useI18n } from "@/lib/I18nProvider";
import { getTranslation, type TranslationKey } from "@/lib/translations";
import { Link } from "@tanstack/react-router";
import { AlertCircle, ArrowLeft } from "lucide-react";

const Error = () => {
    const { locale } = useI18n();
    const t = (key: TranslationKey) => getTranslation(locale, key)
    return (
        <div className="container mx-auto px-4 py-24 max-w-2xl">
            <div className="mb-8 relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive">
                <AlertCircle className="h-4 w-4" aria-hidden="true" />
                <h2 className="mb-1 font-medium leading-none tracking-tight">Error</h2>
                <p className="text-sm [&_p]:leading-relaxed">{t('404.error.msg')}</p>
            </div>

            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <Link to="/$locale" params={{locale}}>
                    <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
                    {t('404.back.home')}
                </Link>
            </div>
        </div>
    );
};

export default Error;
