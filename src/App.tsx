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
import "./styles.css";

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

function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text ? <p className="section-text">{text}</p> : null}
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
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
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} value={value} onChange={onChange}>
        {children}
      </select>
    </div>
  );
}

export default function App() {
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
    if (!existing) document.head.appendChild(meta);
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
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
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
      const key = "clean-touch-leads";
      const previous = localStorage.getItem(key);
      const leads = previous ? JSON.parse(previous) : [];
      leads.push({
        ...form,
        createdAt: new Date().toISOString(),
        source: "website",
      });
      localStorage.setItem(key, JSON.stringify(leads));
      setForm(initialForm);
      setStatus("success");
      setStatusMessage(
        "Votre demande a bien été enregistrée. Nous reviendrons vers vous dans les meilleurs délais."
      );
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
    <div className="site-shell">
      <div className="page-glow page-glow-left" />
      <div className="page-glow page-glow-right" />
      <div className="page-glow page-glow-bottom" />

      <header className="header">
        <div className="container header-inner">
          <button className="brand" onClick={() => scrollToId("accueil")}>
            <div className="brand-mark brand-mark-image">
  <img src="clean-touch-apple-touch-icon.png" alt="Clean Touch" />
</div>
            <div className="brand-text">
              <p className="brand-title">Clean Touch</p>
              <p className="brand-subtitle">Nettoyage professionnel</p>
            </div>
          </button>

          <nav className="nav desktop-nav">
            {[
              ["Accueil", "accueil"],
              ["Services", "services"],
              ["À propos", "apropos"],
              ["Zones d’intervention", "zones"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <button key={id} onClick={() => scrollToId(id)}>
                {label}
              </button>
            ))}
            <button className="btn btn-primary btn-small" onClick={() => scrollToId("contact")}>
              Demander un devis
            </button>
          </nav>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-nav">
            <div className="container mobile-nav-inner">
              {[
                ["Accueil", "accueil"],
                ["Services", "services"],
                ["À propos", "apropos"],
                ["Zones d’intervention", "zones"],
                ["Contact", "contact"],
              ].map(([label, id]) => (
                <button key={id} onClick={() => scrollToId(id)}>
                  {label}
                </button>
              ))}
              <button className="btn btn-primary" onClick={() => scrollToId("contact")}>
                Demander un devis
              </button>
            </div>
          </div>
        )}
      </header>

      <main>
        <section id="accueil" className="hero section-anchor">
          <div className="container hero-grid">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="badge">
                <Sparkles size={14} />
                Nettoyage professionnel haut de gamme
              </div>

              <h1 className="hero-title">
                Le nettoyage professionnel, avec élégance et exigence.
              </h1>

              <p className="hero-text">
                Clean Touch accompagne les professionnels et les particuliers avec un service d’entretien soigné,
                fiable et haut de gamme. Une approche claire, douce et rigoureuse pour des espaces toujours impeccables.
              </p>

              <div className="hero-actions">
                <button className="btn btn-primary" onClick={() => scrollToId("contact")}>
                  Obtenir un devis <ArrowRight size={16} />
                </button>
                <button className="btn btn-secondary" onClick={() => scrollToId("services")}>
                  Découvrir nos services
                </button>
              </div>

              <div className="mini-grid">
                {[
                  ["Service soigné", "Une qualité constante dans chaque intervention."],
                  ["Réponse rapide", "Une organisation fluide et réactive selon vos besoins."],
                  ["Image premium", "Un entretien discret, net et irréprochable."],
                ].map(([title, text]) => (
                  <div key={title} className="mini-card">
                    <p>{title}</p>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="hero-visual-wrap"
            >
              <div className="hero-visual glass-card">
                <div className="hero-visual-inner">
                  <div className="logo-showcase logo-showcase-image">
                  <img src="clean-touch-apple-touch-icon.png" alt="Logo Clean Touch" className="hero-logo-image" />
                  </div>

                  <div className="hero-visual-copy">
                    <p className="visual-kicker">
                      Clean <span>Touch</span>
                    </p>
                    <h2>Une signature visuelle douce, lumineuse et mémorable.</h2>
                    <p>
                      Un univers premium inspiré de la lumière, du soin du détail et d’une propreté parfaitement maîtrisée.
                    </p>

                    <div className="visual-tags">
                      {[
                        "Ambiance lumineuse",
                        "Palette ivoire & bleu grisé",
                        "Design éditorial raffiné",
                        "Expérience rassurante",
                      ].map((item) => (
                        <div key={item} className="visual-tag">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="services" className="section section-anchor">
          <div className="container">
            <SectionHeading
              eyebrow="Services"
              title="Des prestations pensées pour des lieux impeccables."
              text="Chaque service est conçu pour apporter clarté, confort visuel et qualité durable, avec une exécution discrète et soignée."
            />

            <div className="cards-grid services-grid">
              {services.map((service, index) => (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="service-card"
                >
                  <div className="service-card-top">
                    <div className="service-number">{service.number}</div>
                    <div className="service-orb" />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="apropos" className="section section-soft section-anchor">
          <div className="container about-grid">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="about-main"
            >
              <SectionHeading
                eyebrow="À propos"
                title="Une entreprise de nettoyage pensée pour durer."
                text="Clean Touch propose un service d’entretien professionnel où le sens du détail, la qualité constante et la discrétion occupent une place centrale."
              />

              <p className="body-copy">
                Nous accompagnons chaque client avec sérieux, clarté et une attention particulière à l’image des lieux.
                Notre ambition est simple : offrir une expérience de nettoyage rassurante, élégante et fiable, adaptée
                aux attentes des professionnels comme des particuliers.
              </p>

              <div className="about-points">
                {[
                  "Souci du détail",
                  "Qualité de service constante",
                  "Interventions discrètes",
                  "Image haut de gamme accessible",
                ].map((item) => (
                  <div key={item} className="point-pill">
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="cards-grid values-grid">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="value-card"
                >
                  <div className="value-head">
                    <div className="value-icon">
                      <ShieldCheck size={18} />
                    </div>
                    <h3>{value.title}</h3>
                  </div>
                  <p>{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="steps-block"
            >
              <div className="section-heading">
                <p className="eyebrow eyebrow-light">Comment ça marche</p>
                <h2 className="light-title">Un fonctionnement simple, clair et rassurant.</h2>
              </div>

              <div className="cards-grid steps-grid">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.05 }}
                    className="step-card"
                  >
                    <div className="step-number">{step.number}</div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="zones" className="section section-anchor">
          <div className="container zones-grid">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <SectionHeading
                eyebrow="Zones d’intervention"
                title="Une présence locale, pour une réponse plus fluide."
                text="Nous intervenons dans plusieurs secteurs pour garantir proximité, disponibilité et qualité de service. Chaque demande est étudiée avec attention pour proposer une prestation adaptée à votre environnement."
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="zones-card"
            >
              <div className="zones-pills">
                {zones.map((zone) => (
                  <span key={zone}>{zone}</span>
                ))}
              </div>

              <div className="zones-note">
                <div className="zones-icon">
                  <MapPin size={17} />
                </div>
                <p>
                  Vous êtes situé dans une commune voisine ou vous avez un besoin spécifique sur une autre zone ?
                  Contactez-nous pour étudier la faisabilité de votre demande.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="contact" className="section section-soft section-anchor">
          <div className="container contact-grid">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="contact-info"
            >
              <p className="eyebrow eyebrow-light">Contact & devis</p>
              <h2 className="light-title">Parlons de votre besoin.</h2>
              <p className="contact-copy">
                Nous vous répondons avec sérieux et clarté afin de vous proposer une solution adaptée, élégante et efficace.
              </p>

              <div className="contact-list">
                {[
                  { icon: Phone, label: "Téléphone", value: "+33 6 00 00 00 00" },
                  { icon: Mail, label: "E-mail", value: "contact@cleantouch.fr" },
                  { icon: MapPin, label: "Ville", value: "Marseille" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="contact-item">
                      <div className="contact-item-icon">
                        <Icon size={17} />
                      </div>
                      <div>
                        <p>{item.label}</p>
                        <span>{item.value}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="contact-note">
                Architecture prête pour une connexion future à Google Sheets, Airtable, Supabase, Firebase ou un backend personnalisé. Les demandes sont actuellement stockées localement pour faciliter le prototypage.
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="contact-form-wrap"
            >
              <form onSubmit={handleSubmit} className="contact-form">
                <Field
                  label="Nom"
                  name="nom"
                  value={form.nom}
                  onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>}
                  placeholder="Votre nom"
                />
                <Field
                  label="Téléphone"
                  name="telephone"
                  value={form.telephone}
                  onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>}
                  placeholder="Votre téléphone"
                  type="tel"
                />
                <Field
                  label="E-mail"
                  name="email"
                  value={form.email}
                  onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>}
                  placeholder="Votre adresse e-mail"
                  type="email"
                />
                <SelectField
                  label="Type de besoin"
                  name="besoin"
                  value={form.besoin}
                  onChange={handleChange as React.ChangeEventHandler<HTMLSelectElement>}
                >
                  <option value="">Sélectionner</option>
                  <option>Nettoyage de bureaux</option>
                  <option>Immeubles et copropriétés</option>
                  <option>Après chantier</option>
                  <option>Appartements et villas</option>
                  <option>Entretien régulier</option>
                  <option>Nettoyage ponctuel</option>
                </SelectField>

                <div className="field field-full">
                  <SelectField
                    label="Zone d’intervention"
                    name="zone"
                    value={form.zone}
                    onChange={handleChange as React.ChangeEventHandler<HTMLSelectElement>}
                  >
                    <option value="">Sélectionner</option>
                    {zones.map((zone) => (
                      <option key={zone}>{zone}</option>
                    ))}
                    <option>Autre secteur</option>
                  </SelectField>
                </div>

                <div className="field field-full">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Décrivez votre besoin, la fréquence souhaitée et toute précision utile."
                  />
                </div>

                <div className="form-footer field-full">
                  <button className="btn btn-primary" type="submit">
                    Envoyer la demande <ArrowRight size={16} />
                  </button>
                  <p>Réponse rapide • Formulaire évolutif • Données stockées localement en mode prototype</p>
                </div>

                {status !== "idle" && (
                  <div className={`status-message ${status === "success" ? "success" : "error"} field-full`}>
                    <CheckCircle2 size={18} />
                    <span>{statusMessage}</span>
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <p className="footer-brand">Clean Touch</p>
            <p className="footer-copy">
              Entreprise de nettoyage professionnel à l’univers premium, pensée pour inspirer confiance, sérieux et qualité de service.
            </p>
          </div>

          <div>
            <p className="footer-title">Liens rapides</p>
            <div className="footer-links">
              {[
                ["Accueil", "accueil"],
                ["Services", "services"],
                ["À propos", "apropos"],
                ["Contact", "contact"],
              ].map(([label, id]) => (
                <button key={id} onClick={() => scrollToId(id)}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="footer-title">Coordonnées</p>
            <div className="footer-links footer-static">
              <p>Marseille</p>
              <p>contact@cleantouch.fr</p>
              <p>+33 6 00 00 00 00</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">© {new Date().getFullYear()} CLEAN TOUCH — Tous droits réservés.</div>
      </footer>
    </div>
  );
}
