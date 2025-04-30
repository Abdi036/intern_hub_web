"use client";

import Image from "next/image";
import img1 from "@/public/pexels-fauxels-3184357.jpg";

import { Building, GraduationCap, Users } from "lucide-react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { useAuth } from "../_context/AuthContext";

export default function Hero() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handleExploreClick = () => {
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      router.push("/signin");
    }
  };

  return (
    <main className="flex-1">
      <section
        id="home"
        className="relative w-full min-h-[100vh] flex items-center justify-center overflow-hidden"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/pexels-fauxels-3183150.jpg"
            fill
            alt="Students finding internships"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content */}
        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center text-white">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none">
                Find Your Perfect Internship Match
              </h1>
              <p className="max-w-[600px] mx-auto text-lg md:text-xl text-gray-200">
                InternHub connects talented students with leading companies for
                meaningful internship opportunities that launch careers.
              </p>
              <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center">
                <Button
                  text="Explore Opportunities"
                  onClick={handleExploreClick}
                />
              </div>
              <div className="flex items-center justify-center gap-8 text-sm text-gray-200">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>10,000+ Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  <span>500+ Companies</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="w-full py-12 md:py-24 lg:py-32 bg-background"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-2xl mb-5 text-primary font-bold">
                How it works
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Simple Process, Powerful Results
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform makes it easy for students to find their dream
                internships and for companies to discover top talent.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">For Students</h3>
              <p className="text-muted-foreground">
                Create a profile, browse internships, and apply with just a few
                clicks. Track your applications and get notified when companies
                respond.
              </p>
            </div>
            <div className="flex flex-col justify-center space-y-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Building className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">For Companies</h3>
              <p className="text-muted-foreground">
                Post internship opportunities, review applications, and connect
                with promising candidates all in one place.
              </p>
            </div>
            <div className="flex flex-col justify-center space-y-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Make Connections</h3>
              <p className="text-muted-foreground">
                Our platform connects students with companies, matching the
                right talent to the right organizations for valuable internship
                experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="why-internhub"
        className="w-full py-12 md:py-24 lg:py-32 bg-muted"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-2xl mb-5 text-primary font-bold">
                Why InternHub
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                The Leading Internship Platform
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We&appos;ve helped thousands of students launch their careers
                and companies find their next generation of talent.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <Image
              src={img1}
              width={400}
              height={400}
              alt="InternHub platform"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
            />
            <div className="flex flex-col justify-center space-y-4">
              <ul className="grid gap-6">
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Curated Opportunities</h3>
                    <p className="text-muted-foreground">
                      We verify all companies and internships to ensure quality
                      opportunities for students.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Skill Matching</h3>
                    <p className="text-muted-foreground">
                      Our platform matches students with internships based on
                      their skills and interests.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Streamlined Process</h3>
                    <p className="text-muted-foreground">
                      Simple application process and powerful management tools
                      for both students and companies.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        id="testimonials"
        className="w-full py-12 md:py-24 lg:py-32 bg-background"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-2xl mb-5 text-primary font-bold">
                Testimonials
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Success Stories
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from students and companies who have found success with
                InternHub.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-between space-y-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  InternHub helped me land my dream internship at a top tech
                  company. The platform was easy to use and I received responses
                  much faster than on other sites.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-muted h-10 w-10"></div>
                <div>
                  <p className="text-sm font-medium">Sarah Johnson</p>
                  <p className="text-xs text-muted-foreground">
                    Computer Science Student
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between space-y-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  As a hiring manager, InternHub has streamlined our internship
                  recruitment process. We&appos;ve found exceptional talent that
                  has contributed real value to our company.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-muted h-10 w-10"></div>
                <div>
                  <p className="text-sm font-medium">Michael Chen</p>
                  <p className="text-xs text-muted-foreground">
                    HR Director, TechCorp
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="partners"
        className="w-full py-12 md:py-24 lg:py-32 bg-muted"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-2xl mb-5 text-primary font-bold">
                Our Partners
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Trusted by Leading Companies
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We partner with companies of all sizes across various
                industries.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-3 lg:grid-cols-5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-center p-4">
                <Image
                  src={img1}
                  width={160}
                  height={80}
                  alt={`Partner logo ${i}`}
                  className="aspect-[2/1] overflow-hidden object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
