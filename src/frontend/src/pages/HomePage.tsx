import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  ChevronRight,
  PlayCircle,
  Target,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: Users,
    title: "Experienced Tutors",
    desc: "Learn from qualified chemistry experts with years of teaching experience.",
  },
  {
    icon: Target,
    title: "Personalized Learning",
    desc: "Tailored study plans designed around your goals, pace, and learning style.",
  },
  {
    icon: Award,
    title: "Proven Results",
    desc: "Our students consistently achieve top grades. Our track record speaks for itself.",
  },
];

const courses = [
  {
    title: "Organic Chemistry",
    level: "Advanced",
    desc: "Master reaction mechanisms, functional groups, and synthesis pathways.",
    color: "bg-teal/10 text-teal",
  },
  {
    title: "Inorganic Chemistry",
    level: "Intermediate",
    desc: "Explore periodic trends, coordination compounds, and transition metals.",
    color: "bg-navy/10 text-navy",
  },
  {
    title: "Physical Chemistry",
    level: "Advanced",
    desc: "Dive into thermodynamics, kinetics, quantum mechanics, and spectroscopy.",
    color: "bg-gold/10 text-gold",
  },
];

const testimonials = [
  {
    quote:
      "Chem. Master completely transformed how I understand chemistry. I went from failing to scoring 94% in my finals!",
    name: "Aisha Patel",
    role: "A-Level Student",
    initials: "AP",
  },
  {
    quote:
      "The tutors are incredibly knowledgeable and patient. Best investment in my education without question.",
    name: "Marcus Thompson",
    role: "University Applicant",
    initials: "MT",
  },
  {
    quote:
      "Face-to-face sessions and expert guidance — this academy is truly exceptional.",
    name: "Fatima Al-Hassan",
    role: "GCSE Student",
    initials: "FA",
  },
];

export default function HomePage() {
  return (
    <div>
      <section
        className="relative min-h-[580px] flex items-center"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-chemistry-classroom.dim_1400x800.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-navy/75 md:bg-gradient-to-r md:from-navy/90 md:via-navy/70 md:to-transparent" />
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-gold/20 text-gold border-gold/30 mb-4">
                🧪 Chemistry Excellence
              </Badge>
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
                Master Chemistry
                <br />
                <span className="text-gold">With Confidence</span>
              </h1>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                Chem. Master offers expert chemistry tutoring to help students
                achieve their dreams — face to face, concept by concept.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  className="rounded-full bg-gold text-navy font-semibold px-7 py-3 hover:bg-gold/90 text-base"
                  data-ocid="hero.primary_button"
                >
                  <Link to="/academy">Enroll Now</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/50 text-white hover:bg-white/10 px-7 py-3 text-base"
                  data-ocid="hero.secondary_button"
                >
                  <Link to="/videos">
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Watch Lessons
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-section-light py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-6"
              >
                <div className="w-14 h-14 rounded-full bg-teal/10 flex items-center justify-center mb-4">
                  <f.icon className="w-7 h-7 text-teal" />
                </div>
                <h3 className="font-display font-bold text-navy text-lg mb-2">
                  {f.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-3xl text-navy mb-3">
              Our Academic Courses
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              From foundational concepts to advanced theory — choose the path
              that fits your academic level.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card
                  className="rounded-xl shadow-card hover:shadow-card-hover transition-shadow h-full"
                  data-ocid={`courses.item.${i + 1}`}
                >
                  <CardContent className="p-6">
                    <Badge className={`${c.color} border-0 mb-3`}>
                      {c.level}
                    </Badge>
                    <h3 className="font-display font-bold text-navy text-lg mb-2">
                      {c.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {c.desc}
                    </p>
                    <Link
                      to="/academy"
                      className="text-teal font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Learn More <ChevronRight className="w-4 h-4" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button
              asChild
              className="rounded-full bg-navy text-white hover:bg-navy/90"
              data-ocid="courses.primary_button"
            >
              <Link to="/academy">
                <BookOpen className="w-4 h-4 mr-2" />
                Explore All Courses
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Watch Our Lessons — empty state until videos are posted */}
      <section className="bg-section-light py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-3xl text-navy mb-3">
              Watch Our Lessons
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Lessons will be posted here soon. Stay tuned!
            </p>
          </div>
          <div
            className="flex flex-col items-center justify-center py-12 text-center"
            data-ocid="videos.empty_state"
          >
            <PlayCircle className="w-20 h-20 text-muted-foreground/30 mb-5" />
            <p className="text-muted-foreground text-sm max-w-sm">
              No lessons have been posted yet. Check back soon — chemistry
              lessons will appear here once uploaded.
            </p>
            <Button
              asChild
              className="rounded-full bg-teal text-white hover:bg-teal/90 mt-6"
              data-ocid="videos.primary_button"
            >
              <Link to="/videos">
                <PlayCircle className="w-4 h-4 mr-2" />
                Go to Lessons
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-3xl text-navy mb-3">
              What Students Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card
                  className="rounded-xl shadow-card h-full"
                  data-ocid={`testimonials.item.${i + 1}`}
                >
                  <CardContent className="p-6">
                    <p className="text-muted-foreground text-sm italic leading-relaxed mb-4">
                      "{t.quote}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-white font-bold text-sm">
                        {t.initials}
                      </div>
                      <div>
                        <div className="font-semibold text-navy text-sm">
                          {t.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {t.role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display font-bold text-3xl text-white mb-4">
            Ready to Excel in Chemistry?
          </h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">
            Join Chem. Master today and unlock your full potential with expert
            face-to-face guidance.
          </p>
          <Button
            asChild
            className="rounded-full bg-gold text-navy font-bold px-10 py-3 text-base hover:bg-gold/90"
            data-ocid="cta.primary_button"
          >
            <Link to="/academy">Get Started Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
