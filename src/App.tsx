import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

type Service = {
  number: string;
  title: string;
  description: string;
};

type Value = {
  title: string;
  description: string;
};

type Step = {
  number: string;
  title: string;
  description: string;
};

type FormState = {
  nom: string;
  telephone: string;
  email: string;
  besoin: string;
  zone: string;
  message: string;
};

const services: Service[] = [
  {
    number: "01",
    title: "Nettoyage de bureaux",
    description:
      "Des espaces de travail nets, harmonieux et accueillants pour vos équipes comme pour vos clients.",
  },
  {
    number: "02",
    title: "Immeubles et copropriétés",
    description:
      "Une intervention soignée pour les parties communes, halls, escaliers et espaces partagés.",
  },
  {
    number: "03",
    title: "Après chantier",
    description:
      "Un nettoyage précis et rigoureux pour révéler un lieu propre, prêt à être utilisé ou livré.",
  },
  {
    number: "04",
    title: "Appartements et villas",
    description:
      "Une prestation haut de gamme pour entretenir les intérieurs avec discrétion et exigence.",
  },
  {
    number: "05",
    title: "Entretien régulier",
    description:
      "Un suivi fiable dans le temps pour garantir une qualité constante et une vraie tranquillité d’esprit.",
  },
  {
    number: "06",
    title: "Nettoyage ponctuel",
    description:
      "Une réponse souple et réactive pour un besoin spécifique, une remise en état ou une intervention ciblée.",
  },
];

const values: Value[] = [
  {
    title: "Exigence",
    description:
      "Chaque détail compte. Nous portons une attention constante à la qualité de finition.",
  },
  {
    title: "Fiabilité",
    description:
      "Des prestations tenues avec sérieux, ponctualité et constance.",
  },
  {
    title: "Discrétion",
    description:
      "Une présence mesurée, respectueuse de vos lieux, de vos équipes et de votre rythme.",
  },
  {
    title: "Réactivité",
    description:
      "Une organisation agile pour répondre rapidement à vos besoins.",
  },
];

const steps: Step[] = [
  {
    number: "01",
    title: "Vous nous contactez",
    description:
      "Vous nous expliquez votre besoin, votre fréquence souhaitée et votre zone d’intervention.",
  },
  {
    number: "02",
    title: "Nous étudions votre demande",
    description:
      "Nous analysons votre besoin avec précision afin de proposer une solution claire et adaptée.",
  },
  {
    number: "03",
    title: "Nous intervenons avec soin",
    description:
      "Nos équipes assurent une prestation rigoureuse, discrète et conforme à vos attentes.",
  },
];

const zones = [
  "Marseille",
  "Aix-en-Provence",
  "Aubagne",
  "Cassis",
  "La Ciotat",
  "Vitrolles",
];

const initialForm: FormState = {
  nom: "",
  telephone: "",
  email: "",
  besoin: "",
  zone: "",
  message: "",
};

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={classNames("relative z-10", align === "center" && "mx-auto text-center")}>
      <p className="text-[11px] uppercase tracking-[0.36em] text-[#AE9761] sm:text-xs">{eyebrow}</p>
      <h2 className="mt-4 text-4xl leading-[0.95] text-[#31465D] sm:text-5xl lg:text-6xl">{title}</h2>
      {text ? (
        <p className={classNames("mt-5 max-w-2xl text-base leading-8 text-[#667A8F]", align === "center" && "mx-auto")}>
          {text}
        </p>
      ) : null}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    document.title = "CLEAN TOUCH — Nettoyage professionnel haut de gamme";

    const existing = document.querySelector('meta[name="description"]');
    const meta = existing || document.createElement("meta");
    meta.setAttribute("name", "description");
    meta.setAttribute(
      "content",
      "Clean Touch, entreprise de nettoyage professionnel haut de gamme. Entretien de bureaux, copropriétés, appartements, villas et interventions ponctuelles à Marseille et ses environs."
    );

    if (!existing) {
      document.head.appendChild(meta);
    }
  }, []);

  const isValid = useMemo(() => {
    return (
      form.nom.trim().length > 1 &&
      form.telephone.trim().length > 5 &&
      /\S+@\S+\.\S+/.test(form.email) &&
      form.besoin.trim().length > 1 &&
      form.zone.trim().length > 1 &&
      form.message.trim().length > 8
    );
  }, [form]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (status !== "idle") {
      setStatus("idle");
      setStatusMessage("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValid) {
      setStatus("error");
      setStatusMessage(
        "Merci de compléter correctement tous les champs afin de nous transmettre votre demande."
      );
      return;
    }

    try {
      const storageKey = "clean-touch-leads";
      const previous = localStorage.getItem(storageKey);
      const leads = previous ? JSON.parse(previous) : [];
      const payload = {
        ...form,
        createdAt: new Date().toISOString(),
        source: "website",
      };

      leads.push(payload);
      localStorage.setItem(storageKey, JSON.stringify(leads));

      setStatus("success");
      setStatusMessage(
        "Votre demande a bien été enregistrée. Nous reviendrons vers vous dans les meilleurs délais."
      );
      setForm(initialForm);
    } catch {
      setStatus("error");
      setStatusMessage(
        "Une erreur est survenue lors de l’enregistrement de votre demande. Merci de réessayer dans un instant."
      );
    }
  };

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F6F0E7] text-[#526983] selection:bg-[#E6D199]/40 selection:text-[#2F435A]">
      <style>{`
        :root {
          --bg: #F6F0E7;
          --bg-soft: #FBF7F1;
          --bg-warm: #F2E8DE;
          --panel: rgba(255,255,255,0.66);
          --panel-strong: rgba(255,255,255,0.84);
          --border: rgba(78, 96, 116, 0.12);
          --text: #5A7188;
          --text-dark: #31465D;
          --muted: #7C8EA1;
          --gold: #DFC16F;
          --gold-deep: #BE9B43;
          --gold-soft: #F1E4BA;
          --shadow: 0 24px 60px rgba(74, 89, 106, 0.10);
          --shadow-soft: 0 12px 32px rgba(74, 89, 106, 0.07);
          --radius-xl: 34px;
          --radius-lg: 26px;
        }

        html { scroll-behavior: smooth; }
        body {
          margin: 0;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background:
            radial-gradient(circle at 8% 12%, rgba(226, 199, 112, 0.16), transparent 20%),
            radial-gradient(circle at 85% 10%, rgba(123, 149, 176, 0.12), transparent 22%),
            radial-gradient(circle at 50% 55%, rgba(255,255,255,0.45), transparent 40%),
            linear-gradient(180deg, #FAF5EE 0%, #F6F0E7 42%, #F9F4ED 100%);
          color: var(--text);
        }
        h1, h2, h3, h4 {
          font-family: "Cormorant Garamond", Georgia, serif;
          letter-spacing: -0.01em;
        }
        * { box-sizing: border-box; }
        .glass {
          background: linear-gradient(180deg, rgba(255,255,255,0.76), rgba(255,255,255,0.58));
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid var(--border);
          box-shadow: var(--shadow);
        }
        .soft-panel {
          background: linear-gradient(180deg, rgba(255,255,255,0.92), rgba(253,250,244,0.76));
          border: 1px solid rgba(78, 96, 116, 0.08);
          box-shadow: var(--shadow-soft);
        }
        .section-anchor { scroll-margin-top: 110px; }
        .gold-line { position: relative; }
        .gold-line::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -18px;
          width: 86px;
          height: 1px;
          background: linear-gradient(90deg, rgba(190,155,67,0), rgba(190,155,67,0.95), rgba(190,155,67,0));
        }
        .premium-button {
          position: relative;
          overflow: hidden;
        }
        .premium-button::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, rgba(255,255,255,0.0) 20%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.0) 80%);
          transform: translateX(-130%);
          transition: transform 0.7s ease;
        }
        .premium-button:hover::before {
          transform: translateX(130%);
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 -z-10 opacity-80">
        <div className="absolute left-[-8%] top-[8%] h-[30rem] w-[30rem] rounded-full bg-[#E6D59A24] blur-3xl" />
        <div className="absolute right-[-6%] top-[18%] h-[28rem] w-[28rem] rounded-full bg-[#8CA2BC1F] blur-3xl" />
        <div className="absolute bottom-[8%] left-[35%] h-[24rem] w-[24rem] rounded-full bg-[#E3C98214] blur-3xl" />
      </div>

      <header className="sticky top-0 z-50 border-b border-[#4C62770D] bg-[#FBF7F0]/80 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={() => scrollToId("accueil")}
            className="group flex items-center gap-3 text-left"
            aria-label="Aller à l'accueil"
          >
            <div className="relative flex h-12 w-12 items-center justify-center rounded-[1.35rem] border border-[#E3CB83] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(249,242,221,0.88))] shadow-[0_12px_24px_rgba(179,149,79,0.18)] transition duration-300 group-hover:-translate-y-0.5">
              <div className="absolute inset-[7px] rounded-[1rem] bg-[radial-gradient(circle_at_top,rgba(233,212,123,0.65),rgba(255,255,255,0.1)_72%)]" />
              <span className="relative text-lg text-[#C8A34A]">✦</span>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.38em] text-[#C1A55E]">Clean Touch</p>
              <p className="text-sm text-[#5A7188]">Nettoyage professionnel</p>
            </div>
          </button>

          <nav className="hidden items-center gap-8 lg:flex">
            {[
              ["Accueil", "accueil"],
              ["Services", "services"],
              ["À propos", "apropos"],
              ["Zones d’intervention", "zones"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollToId(id)}
                className="text-sm text-[#5B6F85] transition duration-300 hover:text-[#31465D]"
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => scrollToId("contact")}
              className="premium-button rounded-full border border-[#DEC26B] bg-[linear-gradient(135deg,#3B5268,#4F6984)] px-5 py-3 text-sm font-medium text-white shadow-[0_16px_30px_rgba(56,76,98,0.22)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_36px_rgba(56,76,98,0.26)]"
            >
              Demander un devis
            </button>
          </nav>

          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#52698324] bg-white/80 shadow-sm lg:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-[#52698312] bg-[#FCF9F3]/96 lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6">
              {[
                ["Accueil", "accueil"],
                ["Services", "services"],
                ["À propos", "apropos"],
                ["Zones d’intervention", "zones"],
                ["Contact", "contact"],
              ].map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => scrollToId(id)}
                  className="rounded-2xl px-4 py-3 text-left text-sm text-[#526983] transition hover:bg-white/90"
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => scrollToId("contact")}
                className="premium-button mt-2 rounded-2xl bg-[linear-gradient(135deg,#3B5268,#4F6984)] px-4 py-3 text-sm font-medium text-white shadow-[0_16px_30px_rgba(56,76,98,0.18)]"
              >
                Demander un devis
              </button>
            </div>
          </div>
        )}
      </header>

      <main>
        <section id="accueil" className="section-anchor relative overflow-hidden">
          <div className="mx-auto grid max-w-7xl gap-14 px-4 pb-14 pt-12 sm:px-6 sm:pb-20 sm:pt-18 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-24 lg:pt-24">
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="relative z-10"
            >
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#E5CC86] bg-white/72 px-4 py-2.5 text-[11px] uppercase tracking-[0.3em] text-[#6F8398] shadow-[0_10px_28px_rgba(86,101,123,0.08)] backdrop-blur-xl sm:text-xs">
                <Sparkles size={14} className="text-[#C9A54B]" />
                Nettoyage professionnel haut de gamme
              </div>

              <h1 className="gold-line max-w-4xl text-5xl leading-[0.88] text-[#2F435A] sm:text-6xl lg:text-[5.3rem]">
                Le nettoyage professionnel, avec élégance et exigence.
              </h1>

              <p className="mt-10 max-w-2xl text-base leading-8 text-[#667B91] sm:text-lg">
                Clean Touch accompagne les professionnels et les particuliers avec un service d’entretien soigné,
                fiable et haut de gamme. Une approche claire, douce et rigoureuse pour des espaces toujours
                impeccables.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => scrollToId("contact")}
                  className="premium-button group inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#33495F,#506985)] px-7 py-4 text-sm font-medium text-white shadow-[0_18px_34px_rgba(56,76,98,0.24)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_42px_rgba(56,76,98,0.28)]"
                >
                  Obtenir un devis
                  <ArrowRight size={16} className="transition duration-300 group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => scrollToId("services")}
                  className="rounded-full border border-[#D9BE70] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(249,244,231,0.9))] px-7 py-4 text-sm font-medium text-[#4E647C] shadow-[0_14px_30px_rgba(160,135,76,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(160,135,76,0.16)]"
                >
                  Découvrir nos services
                </button>
              </div>

              <div className="mt-12 grid max-w-2xl gap-4 sm:grid-cols-3">
                {[
                  ["Service soigné", "Une qualité constante dans chaque intervention."],
                  ["Réponse rapide", "Une organisation fluide et réactive selon vos besoins."],
                  ["Image premium", "Un entretien discret, net et irréprochable."],
                ].map(([title, text], index) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.15 + index * 0.06 }}
                    className="soft-panel rounded-[24px] p-4 transition duration-300 hover:-translate-y-1"
                  >
                    <p className="text-sm font-medium text-[#3F556D]">{title}</p>
                    <p className="mt-2 text-sm leading-6 text-[#72869B]">{text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.08 }}
              className="relative flex items-center justify-center"
            >
              <div className="absolute left-4 top-4 h-24 w-24 rounded-full border border-[#E5CB82]/60 bg-white/35 blur-[1px]" />
              <div className="absolute bottom-10 right-0 h-44 w-44 rounded-full bg-[#8FA6C31F] blur-3xl" />
              <div className="absolute right-8 top-12 h-32 w-32 rounded-full bg-[#E4CF8B2A] blur-3xl" />

              <div className="glass relative w-full max-w-[560px] overflow-hidden rounded-[2.2rem] p-4 sm:p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(237,217,143,0.22),transparent_28%),radial-gradient(circle_at_80%_25%,rgba(114,140,168,0.16),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.4),rgba(255,255,255,0.08))]" />
                <div className="relative rounded-[1.9rem] border border-white/60 bg-[linear-gradient(180deg,rgba(255,253,249,0.96),rgba(250,246,238,0.88))] p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:p-9">
                  <div className="grid gap-5 sm:grid-cols-[0.88fr_1.12fr] sm:items-center">
                    <div className="relative mx-auto flex h-[18rem] w-full max-w-[14rem] items-center justify-center rounded-[2rem] border border-[#E6D48E] bg-[radial-gradient(circle_at_top,rgba(240,225,162,0.6),rgba(255,255,255,0.64)_62%)] shadow-[0_22px_40px_rgba(193,164,89,0.18)]">
                      <div className="absolute left-4 top-4 h-10 w-10 rounded-full border border-white/50 bg-white/20" />
                      <div className="absolute bottom-5 right-4 h-14 w-14 rounded-full bg-[#8FA7C218] blur-2xl" />
                      <div className="relative flex h-36 w-24 items-center justify-center rounded-[52%_52%_58%_58%/36%_36%_72%_72%] bg-[linear-gradient(180deg,#F3E6B0,#E0C45E)] shadow-[inset_0_12px_22px_rgba(255,255,255,0.6),0_18px_30px_rgba(194,161,76,0.25)] sm:h-40 sm:w-28">
                        <div className="absolute inset-[18%_15%_31%_15%] rounded-full border border-white/75 opacity-85" />
                        <div className="absolute inset-[28%_28%_42%_28%] rounded-full border border-white/40 opacity-80" />
                        <div className="absolute -bottom-8 h-16 w-5 rounded-full bg-[linear-gradient(180deg,#E8D071,#D9B84A)] shadow-[0_8px_14px_rgba(194,161,76,0.18)]" />
                      </div>
                    </div>

                    <div className="text-center sm:text-left">
                      <p className="text-[11px] uppercase tracking-[0.5em] text-[#C6A95A] sm:text-xs">
                        Clean <span className="text-[#657C94]">Touch</span>
                      </p>
                      <h2 className="mt-4 text-3xl leading-tight text-[#334860] sm:text-[2.5rem]">
                        Une signature visuelle douce, lumineuse et mémorable.
                      </h2>
                      <p className="mt-4 text-sm leading-7 text-[#6C8097] sm:text-base">
                        Un univers premium inspiré de la lumière, du soin du détail et d’une propreté parfaitement maîtrisée.
                      </p>

                      <div className="mt-7 grid gap-3 sm:grid-cols-2">
                        {[
                          "Ambiance lumineuse",
                          "Palette ivoire & bleu grisé",
                          "Design éditorial raffiné",
                          "Expérience rassurante",
                        ].map((item) => (
                          <div
                            key={item}
                            className="rounded-[1.1rem] border border-[#5A718814] bg-white/78 px-4 py-3 text-sm text-[#587089] shadow-[0_10px_20px_rgba(84,101,122,0.05)]"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="services" className="section-anchor relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
          <div className="absolute inset-x-0 top-10 -z-10 h-[22rem] rounded-[3rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.35),rgba(255,255,255,0.05))]" />
          <SectionHeading
            eyebrow="Services"
            title="Des prestations pensées pour des lieux impeccables."
            text="Chaque service est conçu pour apporter clarté, confort visuel et qualité durable, avec une exécution discrète et soignée."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.48, delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-[2rem] border border-[#566D8314] bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(250,245,238,0.72))] p-6 shadow-[0_18px_42px_rgba(81,97,117,0.08)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_28px_52px_rgba(81,97,117,0.12)]"
              >
                <div className="absolute right-0 top-0 h-32 w-32 translate-x-10 -translate-y-10 rounded-full bg-[radial-gradient(circle,rgba(224,196,106,0.28),transparent_68%)] transition duration-300 group-hover:scale-125" />
                <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-8 translate-y-8 rounded-full bg-[radial-gradient(circle,rgba(135,159,184,0.18),transparent_70%)]" />

                <div className="relative flex items-start justify-between gap-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#E0C16E] bg-[linear-gradient(180deg,#FFF9E7,#F6E9BB)] text-sm font-medium tracking-[0.18em] text-[#C39A3C] shadow-[0_10px_22px_rgba(187,155,71,0.18)]">
                    {service.number}
                  </div>
                  <div className="h-10 w-10 rounded-full border border-[#E5CF93]/60 bg-[radial-gradient(circle,rgba(255,255,255,0.85),rgba(241,226,175,0.45))] shadow-[0_8px_20px_rgba(186,154,77,0.12)] transition duration-300 group-hover:scale-110" />
                </div>
                <h3 className="relative mt-8 text-[2rem] leading-none text-[#364B63]">{service.title}</h3>
                <p className="relative mt-4 text-sm leading-7 text-[#6E8298]">{service.description}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="apropos" className="section-anchor relative py-14 lg:py-24">
          <div className="absolute inset-x-0 top-0 h-full bg-[linear-gradient(180deg,rgba(245,236,226,0.55),rgba(249,244,237,0.15))]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-stretch">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.58 }}
                className="relative overflow-hidden rounded-[2.3rem] border border-[#556C8214] bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(250,244,234,0.76))] p-7 shadow-[0_24px_54px_rgba(80,97,116,0.1)] sm:p-10"
              >
                <div className="absolute -right-16 top-0 h-48 w-48 rounded-full bg-[#E2C7761E] blur-3xl" />
                <div className="absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-[#92A7C11C] blur-3xl" />
                <SectionHeading
                  eyebrow="À propos"
                  title="Une entreprise de nettoyage pensée pour durer."
                  text="Clean Touch propose un service d’entretien professionnel où le sens du détail, la qualité constante et la discrétion occupent une place centrale."
                />
                <p className="relative z-10 mt-6 max-w-2xl text-base leading-8 text-[#6C8299]">
                  Nous accompagnons chaque client avec sérieux, clarté et une attention particulière à l’image des lieux.
                  Notre ambition est simple : offrir une expérience de nettoyage rassurante, élégante et fiable, adaptée
                  aux attentes des professionnels comme des particuliers.
                </p>

                <div className="relative z-10 mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    "Souci du détail",
                    "Qualité de service constante",
                    "Interventions discrètes",
                    "Image haut de gamme accessible",
                  ].map((item) => (
                    <div key={item} className="rounded-[1.35rem] border border-[#556C8212] bg-white/80 px-4 py-4 text-sm text-[#556D86] shadow-[0_12px_26px_rgba(86,101,123,0.05)]">
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>

              <div className="grid gap-4 sm:grid-cols-2">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.52, delay: index * 0.06 }}
                    className={classNames(
                      "relative overflow-hidden rounded-[2rem] border p-6 shadow-[0_18px_42px_rgba(81,97,117,0.08)] transition duration-300 hover:-translate-y-1.5",
                      index % 2 === 0
                        ? "border-[#566D8314] bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(249,244,235,0.76))]"
                        : "border-[#566D8314] bg-[linear-gradient(180deg,rgba(240,234,224,0.92),rgba(255,255,255,0.72))]"
                    )}
                  >
                    <div className="absolute right-0 top-0 h-28 w-28 translate-x-8 -translate-y-8 rounded-full bg-[radial-gradient(circle,rgba(223,193,111,0.24),transparent_68%)]" />
                    <div className="relative flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#DEC571] bg-[linear-gradient(180deg,#FFF8E2,#F3E4B2)] shadow-[0_10px_22px_rgba(187,155,71,0.16)]">
                        <ShieldCheck size={18} className="text-[#B99035]" />
                      </div>
                      <h3 className="text-[2rem] leading-none text-[#40566F]">{value.title}</h3>
                    </div>
                    <p className="relative mt-4 text-sm leading-7 text-[#70849B]">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.58 }}
            className="relative overflow-hidden rounded-[2.4rem] border border-[#556C8214] bg-[linear-gradient(135deg,rgba(49,70,93,0.98),rgba(79,105,132,0.94))] p-7 text-white shadow-[0_28px_60px_rgba(55,73,93,0.22)] sm:p-10 lg:p-12"
          >
            <div className="absolute left-0 top-0 h-56 w-56 -translate-x-16 -translate-y-16 rounded-full bg-[#E3C7741F] blur-3xl" />
            <div className="absolute right-0 top-0 h-48 w-48 translate-x-16 -translate-y-10 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-60 w-60 translate-x-20 translate-y-20 rounded-full bg-[#E4CF8A14] blur-3xl" />

            <div className="relative z-10 max-w-3xl">
              <p className="text-[11px] uppercase tracking-[0.34em] text-[#E7D79D] sm:text-xs">Comment ça marche</p>
              <h2 className="mt-4 text-4xl leading-[0.96] text-white sm:text-5xl lg:text-6xl">
                Un fonctionnement simple, clair et rassurant.
              </h2>
            </div>

            <div className="relative z-10 mt-10 grid gap-5 lg:grid-cols-3">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="rounded-[2rem] border border-white/10 bg-white/8 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:bg-white/12"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#E8D59A] bg-[linear-gradient(180deg,#FFF8E5,#E5CC79)] text-sm font-medium tracking-[0.18em] text-[#A57D28] shadow-[0_10px_20px_rgba(212,182,95,0.24)]">
                    {step.number}
                  </div>
                  <h3 className="mt-6 text-[2rem] leading-none text-white">{step.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#D8E0E8]">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="zones" className="section-anchor mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <SectionHeading
                eyebrow="Zones d’intervention"
                title="Une présence locale, pour une réponse plus fluide."
                text="Nous intervenons dans plusieurs secteurs pour garantir proximité, disponibilité et qualité de service. Chaque demande est étudiée avec attention pour proposer une prestation adaptée à votre environnement."
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="relative overflow-hidden rounded-[2.2rem] border border-[#556C8214] bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(247,241,231,0.82))] p-6 shadow-[0_24px_52px_rgba(80,97,116,0.08)] sm:p-8"
            >
              <div className="absolute -right-10 top-0 h-36 w-36 rounded-full bg-[#E2C8771B] blur-3xl" />
              <div className="absolute -left-8 bottom-0 h-28 w-28 rounded-full bg-[#94A9C21A] blur-3xl" />

              <div className="relative flex flex-wrap gap-3">
                {zones.map((zone) => (
                  <span
                    key={zone}
                    className="rounded-full border border-[#DEC571] bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(247,240,222,0.82))] px-4 py-2.5 text-sm text-[#546B84] shadow-[0_10px_22px_rgba(187,155,71,0.08)]"
                  >
                    {zone}
                  </span>
                ))}
              </div>

              <div className="relative mt-8 rounded-[1.7rem] border border-[#556C8212] bg-white/78 p-5 shadow-[0_12px_28px_rgba(86,101,123,0.05)]">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-2xl border border-[#E1C879] bg-[#FBF5E3] shadow-[0_8px_20px_rgba(187,155,71,0.10)]">
                    <MapPin size={17} className="text-[#BB9538]" />
                  </div>
                  <p className="text-sm leading-7 text-[#6D8198]">
                    Vous êtes situé dans une commune voisine ou vous avez un besoin spécifique sur une autre zone ?
                    Contactez-nous pour étudier la faisabilité de votre demande.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="contact" className="section-anchor relative py-14 lg:py-24">
          <div className="absolute inset-x-0 top-0 h-full bg-[linear-gradient(180deg,rgba(245,236,226,0.45),rgba(249,244,237,0.08))]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="relative overflow-hidden rounded-[2.3rem] border border-[#556C8214] bg-[linear-gradient(180deg,rgba(49,70,93,0.98),rgba(76,100,124,0.96))] p-7 text-white shadow-[0_24px_56px_rgba(55,73,93,0.2)] sm:p-9"
              >
                <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-[#E2C77420] blur-3xl" />
                <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-white/8 blur-2xl" />

                <p className="relative z-10 text-[11px] uppercase tracking-[0.34em] text-[#E6D79F] sm:text-xs">Contact & devis</p>
                <h2 className="relative z-10 mt-4 text-4xl leading-[0.96] text-white sm:text-5xl">Parlons de votre besoin.</h2>
                <p className="relative z-10 mt-5 text-base leading-8 text-[#D7E0E7]">
                  Nous vous répondons avec sérieux et clarté afin de vous proposer une solution adaptée, élégante et efficace.
                </p>

                <div className="relative z-10 mt-8 space-y-4">
                  {[
                    { icon: Phone, label: "Téléphone", value: "+33 6 00 00 00 00" },
                    { icon: Mail, label: "E-mail", value: "contact@cleantouch.fr" },
                    { icon: MapPin, label: "Ville", value: "Marseille" },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="rounded-[1.5rem] border border-white/10 bg-white/8 p-4 backdrop-blur-xl">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#E4CE8B] bg-[linear-gradient(180deg,#FFF7E0,#E4CB7A)] shadow-[0_10px_20px_rgba(212,182,95,0.2)]">
                            <Icon size={17} className="text-[#A37B28]" />
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-[#D5DEEA]">{item.label}</p>
                            <p className="mt-1 text-sm text-white">{item.value}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="relative z-10 mt-8 rounded-[1.7rem] border border-[#E2C77444] bg-[linear-gradient(180deg,rgba(255,250,235,0.14),rgba(255,250,235,0.06))] p-5">
                  <p className="text-sm leading-7 text-[#E0E7EE]">
                    Architecture prête pour une connexion future à Google Sheets, Airtable, Supabase, Firebase ou un backend personnalisé. Les demandes sont actuellement stockées localement pour faciliter le prototypage.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.08 }}
                className="relative overflow-hidden rounded-[2.3rem] border border-[#556C8214] bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(250,245,237,0.82))] p-7 shadow-[0_24px_52px_rgba(80,97,116,0.08)] sm:p-9"
              >
                <div className="absolute right-0 top-0 h-40 w-40 translate-x-10 -translate-y-10 rounded-full bg-[#E2C7761A] blur-3xl" />
                <form onSubmit={handleSubmit} className="relative z-10 grid gap-4 sm:grid-cols-2" noValidate>
                  <Field
                    label="Nom"
                    name="nom"
                    value={form.nom}
                    onChange={handleChange}
                    placeholder="Votre nom"
                  />
                  <Field
                    label="Téléphone"
                    name="telephone"
                    value={form.telephone}
                    onChange={handleChange}
                    placeholder="Votre téléphone"
                    type="tel"
                  />
                  <Field
                    label="E-mail"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Votre adresse e-mail"
                    type="email"
                  />

                  <SelectField label="Type de besoin" name="besoin" value={form.besoin} onChange={handleChange}>
                    <option value="">Sélectionner</option>
                    <option>Nettoyage de bureaux</option>
                    <option>Immeubles et copropriétés</option>
                    <option>Après chantier</option>
                    <option>Appartements et villas</option>
                    <option>Entretien régulier</option>
                    <option>Nettoyage ponctuel</option>
                  </SelectField>

                  <div className="sm:col-span-2">
                    <SelectField label="Zone d’intervention" name="zone" value={form.zone} onChange={handleChange}>
                      <option value="">Sélectionner</option>
                      {zones.map((zone) => (
                        <option key={zone}>{zone}</option>
                      ))}
                      <option>Autre secteur</option>
                    </SelectField>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm text-[#5B718A]">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Décrivez votre besoin, la fréquence souhaitée et toute précision utile."
                      className="w-full rounded-[1.5rem] border border-[#52698318] bg-white/90 px-4 py-3 text-sm text-[#425972] outline-none transition duration-300 placeholder:text-[#A3AFBE] focus:-translate-y-0.5 focus:border-[#D8C15E] focus:ring-4 focus:ring-[#E7D47D1F]"
                    />
                  </div>

                  <div className="sm:col-span-2 flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="submit"
                      className="premium-button inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#344A60,#4E6883)] px-7 py-4 text-sm font-medium text-white shadow-[0_18px_34px_rgba(56,76,98,0.2)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_42px_rgba(56,76,98,0.24)]"
                    >
                      Envoyer la demande
                      <ArrowRight size={16} />
                    </button>

                    <p className="text-xs leading-6 text-[#8A99AA]">
                      Réponse rapide • Formulaire évolutif • Données stockées localement en mode prototype
                    </p>
                  </div>

                  {status !== "idle" && (
                    <div
                      className={classNames(
                        "sm:col-span-2 rounded-[1.5rem] border px-4 py-3 text-sm leading-7 shadow-sm",
                        status === "success"
                          ? "border-[#D9C86F] bg-[#FFFCEF] text-[#556C84]"
                          : "border-[#D8B2A6] bg-[#FFF6F4] text-[#8A5E57]"
                      )}
                      role="status"
                      aria-live="polite"
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle2 size={18} className={status === "success" ? "text-[#C8AA42]" : "text-[#C47A67]"} />
                        <span>{statusMessage}</span>
                      </div>
                    </div>
                  )}
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#4C627712] bg-[linear-gradient(180deg,#FBF7F0,#F4EDE3)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_auto_auto] lg:px-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.38em] text-[#BEA15A]">Clean Touch</p>
            <p className="mt-4 max-w-md text-sm leading-7 text-[#6A7F97]">
              Entreprise de nettoyage professionnel à l’univers premium, pensée pour inspirer confiance, sérieux et qualité de service.
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-[#465B74]">Liens rapides</p>
            <div className="mt-4 flex flex-col gap-2.5 text-sm text-[#6E839B]">
              {[
                ["Accueil", "accueil"],
                ["Services", "services"],
                ["À propos", "apropos"],
                ["Contact", "contact"],
              ].map(([label, id]) => (
                <button key={id} onClick={() => scrollToId(id)} className="text-left transition duration-300 hover:text-[#31465D]">
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-[#465B74]">Coordonnées</p>
            <div className="mt-4 space-y-2.5 text-sm text-[#6E839B]">
              <p>Marseille</p>
              <p>contact@cleantouch.fr</p>
              <p>+33 6 00 00 00 00</p>
            </div>
          </div>
        </div>

        <div className="border-t border-[#52698310] px-4 py-4 text-center text-xs text-[#8E9CAC] sm:px-6 lg:px-8">
          © {new Date().getFullYear()} CLEAN TOUCH — Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}

type BaseFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
};

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}: BaseFieldProps & { placeholder: string; type?: string }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm text-[#5B718A]">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-[1.5rem] border border-[#52698318] bg-white/90 px-4 py-3 text-sm text-[#425972] outline-none transition duration-300 placeholder:text-[#A3AFBE] focus:-translate-y-0.5 focus:border-[#D8C15E] focus:ring-4 focus:ring-[#E7D47D1F]"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  children,
}: BaseFieldProps & { children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm text-[#5B718A]">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-[1.5rem] border border-[#52698318] bg-white/90 px-4 py-3 text-sm text-[#425972] outline-none transition duration-300 focus:-translate-y-0.5 focus:border-[#D8C15E] focus:ring-4 focus:ring-[#E7D47D1F]"
      >
        {children}
      </select>
    </div>
  );
}

export default App;
