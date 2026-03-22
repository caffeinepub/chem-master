import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useGetAcademyInfo,
  useGetCourses,
  useSubmitContact,
} from "../hooks/useQueries";

const sampleCourses = [
  {
    title: "Organic Chemistry",
    subject: "Chemistry",
    duration: "12 Weeks",
    fee: 450n,
    description:
      "Master reaction mechanisms, functional groups, stereochemistry, and synthesis pathways used in exams and beyond.",
  },
  {
    title: "Inorganic Chemistry",
    subject: "Chemistry",
    duration: "10 Weeks",
    fee: 400n,
    description:
      "Explore periodic trends, coordination compounds, transition metals, and inorganic reaction chemistry.",
  },
  {
    title: "Physical Chemistry",
    subject: "Chemistry",
    duration: "10 Weeks",
    fee: 420n,
    description:
      "Deep-dive into thermodynamics, kinetics, quantum chemistry, electrochemistry, and spectroscopy.",
  },
];

export default function AcademyPage() {
  const { data: academyInfoArr, isLoading: infoLoading } = useGetAcademyInfo();
  const { data: courses, isLoading: coursesLoading } = useGetCourses();
  const submitContact = useSubmitContact();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const academyInfo = academyInfoArr?.[0];

  const displayCourses =
    courses && courses.length > 0 ? courses : sampleCourses;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitContact.mutateAsync({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        timestamp: BigInt(Date.now()),
      });
      setSubmitted(true);
      toast.success("Enrollment request submitted!");
    } catch {
      toast.error("Failed to submit. Please try again.");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-navy py-14">
        <div className="container mx-auto px-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors"
            data-ocid="academy.link"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            To Study Offline By Us
          </h1>
          <p className="text-white/80 max-w-xl text-base leading-relaxed">
            We work to help you achieve your dreams. If you want to study
            concepts by us face to face, Join{" "}
            <span className="text-gold font-semibold">Chem. Master</span>.
          </p>
        </div>
      </div>

      {/* Chem. Master Banner */}
      <section className="bg-section-light py-14">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-navy mb-6">
              <BookOpen className="w-8 h-8 text-gold" />
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-navy mb-3">
              Chem. Master
            </h2>
            <p className="text-teal font-semibold text-xl tracking-wide">
              Where Dreams Meet Reality
            </p>
          </motion.div>

          {/* Location & Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-10 max-w-xl mx-auto"
          >
            <Card className="rounded-2xl shadow-card border-0 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-gold via-teal to-navy" />
              <CardContent className="p-8 space-y-5">
                <h3 className="font-display font-bold text-navy text-lg mb-1">
                  Visit Us at Our Centre
                </h3>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-navy" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">
                      Address
                    </p>
                    <p className="text-foreground font-medium leading-relaxed">
                      #21, Golden Valley, Highground Road,
                      <br />
                      Near Trishla City
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">
                      Phone
                    </p>
                    <a
                      href="tel:+918591230011"
                      className="text-foreground font-semibold text-lg hover:text-teal transition-colors"
                    >
                      +91 85 91 23 00 11
                    </a>
                  </div>
                </div>
                <div className="pt-2">
                  <Button
                    asChild
                    className="w-full rounded-full bg-navy text-white hover:bg-navy/90 font-semibold"
                    data-ocid="academy.primary_button"
                  >
                    <a href="tel:+918591230011">Call to Enquire</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display font-bold text-3xl text-navy mb-4">
                About Our Academy
              </h2>
              {infoLoading ? (
                <div className="space-y-2" data-ocid="academy.loading_state">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ) : (
                <p className="text-muted-foreground leading-relaxed">
                  {academyInfo?.about ??
                    "Chem. Master was founded in 2010 with a single mission: to make chemistry accessible, engaging, and achievable for every student. Our team of PhD-qualified tutors combines rigorous academic knowledge with innovative teaching methods. We offer personalised attention in small groups, alongside an expansive online video library that students can access anytime. Whether you're preparing for GCSE, A-Level, or university entrance exams, we have the expertise and passion to take you to the top."}
                </p>
              )}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="p-4 bg-section-light rounded-xl text-center">
                  <div className="font-display font-bold text-3xl text-teal">
                    500+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Students Taught
                  </div>
                </div>
                <div className="p-4 bg-section-light rounded-xl text-center">
                  <div className="font-display font-bold text-3xl text-teal">
                    95%
                  </div>
                  <div className="text-sm text-muted-foreground">Pass Rate</div>
                </div>
                <div className="p-4 bg-section-light rounded-xl text-center">
                  <div className="font-display font-bold text-3xl text-teal">
                    {academyInfo ? String(academyInfo.foundedYear) : "2010"}
                  </div>
                  <div className="text-sm text-muted-foreground">Founded</div>
                </div>
                <div className="p-4 bg-section-light rounded-xl text-center">
                  <div className="font-display font-bold text-3xl text-teal">
                    15+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Years Experience
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="rounded-xl shadow-card">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-display font-semibold text-navy mb-2">
                    Contact Information
                  </h3>
                  <div className="flex items-start gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-teal mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">
                      {academyInfo?.address ??
                        "#21, Golden Valley, Highground Road, Near Trishla City"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-teal shrink-0" />
                    <span className="text-muted-foreground">
                      {academyInfo?.phone ?? "+91 85 91 23 00 11"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-teal shrink-0" />
                    <span className="text-muted-foreground">
                      {academyInfo?.email ?? "info@chemmaster.com"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4 text-teal shrink-0" />
                    <span className="text-muted-foreground">
                      Mon–Sat: 9:00 AM – 7:00 PM
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="bg-section-light py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-3xl text-navy mb-3">
              Our Academic Courses
            </h2>
            <p className="text-muted-foreground">
              Structured programs designed for measurable progress and exam
              success.
            </p>
          </div>
          {coursesLoading ? (
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              data-ocid="courses.loading_state"
            >
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-48 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {displayCourses.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  data-ocid={`courses.item.${i + 1}`}
                >
                  <Card className="rounded-xl shadow-card hover:shadow-card-hover transition-shadow h-full">
                    <CardContent className="p-6">
                      <Badge className="bg-teal/10 text-teal border-0 mb-3">
                        {c.subject}
                      </Badge>
                      <h3 className="font-display font-bold text-navy text-lg mb-1">
                        {c.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                        {c.description}
                      </p>
                      <div className="flex items-center justify-between text-sm border-t border-border pt-3">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {c.duration}
                        </span>
                        <span className="font-bold text-navy">
                          ${String(c.fee)}/mo
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Enrollment Form */}
      <section className="bg-navy py-16" id="enroll">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-display font-bold text-3xl text-white mb-3">
                Enroll or Contact Us
              </h2>
              <p className="text-white/70">
                Fill in the form and we'll get back to you within 24 hours.
              </p>
            </div>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 rounded-xl p-10 text-center"
                data-ocid="enroll.success_state"
              >
                <CheckCircle className="w-14 h-14 text-gold mx-auto mb-4" />
                <h3 className="font-display font-bold text-white text-xl mb-2">
                  We've received your request!
                </h3>
                <p className="text-white/70">
                  Our team will contact you within 24 hours. Welcome to Chem.
                  Master!
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-xl p-6 shadow-card space-y-4"
                data-ocid="enroll.modal"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      placeholder="Your full name"
                      required
                      className="mt-1"
                      data-ocid="enroll.input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      placeholder="your@email.com"
                      required
                      className="mt-1"
                      data-ocid="enroll.input"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, phone: e.target.value }))
                    }
                    placeholder="+91 85 91 23 00 11"
                    className="mt-1"
                    data-ocid="enroll.input"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message / Course Interest</Label>
                  <Textarea
                    id="message"
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    placeholder="Tell us which course you're interested in and your current level..."
                    rows={4}
                    className="mt-1"
                    data-ocid="enroll.textarea"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submitContact.isPending}
                  className="w-full rounded-full bg-gold text-navy font-bold hover:bg-gold/90 py-3"
                  data-ocid="enroll.submit_button"
                >
                  {submitContact.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Enrollment Request"
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
