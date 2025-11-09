'use client';

import AcademyHeader from '@/components/academy/AcademyHeader';
import HeroSection from '@/components/academy/HeroSection';
import AboutSection from '@/components/academy/AboutSection';
import TargetAudienceSection from '@/components/academy/TargetAudienceSection';
import WhyAcademySection from '@/components/academy/WhyAcademySection';
import CourseStructureSection from '@/components/academy/CourseStructureSection';
import DiplomaSection from '@/components/academy/DiplomaSection';
import MentorshipSection from '@/components/academy/MentorshipSection';
import IndividualMentorSection from '@/components/academy/IndividualMentorSection';
import PricingSection from '@/components/academy/PricingSection';
import TeamSection from '@/components/academy/TeamSection';
import FreeLessonSection from '@/components/academy/FreeLessonSection';
import ContactFormSection from '@/components/academy/ContactFormSection';

export default function AcademyPage() {
  return (
    <div className="academy-page">
      {/* Academy Header */}
      <AcademyHeader />

      {/* Section 01: Hero */}
      <HeroSection />

      {/* Section 02: About */}
      <AboutSection />

      {/* Section 03: Target Audience */}
      <TargetAudienceSection />

      {/* Section 04: Why Academy */}
      <WhyAcademySection />

      {/* Section 05: Course Structure */}
      <CourseStructureSection />

      {/* Section 06: Diploma */}
      <DiplomaSection />

      {/* Section 07: Mentorship */}
      <MentorshipSection />

      {/* Section 08: Individual Mentor */}
      <IndividualMentorSection />

      {/* Section 09: Pricing */}
      <PricingSection />

      {/* Section 10: Team */}
      <TeamSection />

      {/* Section 11: Free Lesson */}
      <FreeLessonSection />

      {/* Section 12: Contact Form */}
      <ContactFormSection />
    </div>
  );
}
