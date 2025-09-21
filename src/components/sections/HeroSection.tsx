import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Download } from "lucide-react";
import heroCampus from "@/assets/hero-campus.webp";

const milestones = [
  { label: "Last date of receipt of abstract", date: "2025-12-15T00:00:00" },
  { label: "Acceptance of abstracts", date: "2026-01-15T00:00:00" },
  { label: "Full-length manuscript submission", date: "2026-03-15T00:00:00" },
  { label: "Intimation of acceptance / Reviewer comments", date: "2026-04-30T00:00:00" },
  { label: "Submission of final revised manuscripts", date: "2026-05-15T00:00:00" },
  { label: "Symposium Start", date: "2026-12-10T09:00:00" },
];

export const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [nextEvent, setNextEvent] = useState<{ label: string; date: Date } | null>(null);

  useEffect(() => {
    const now = new Date();
    const upcoming = milestones
      .map(m => ({ label: m.label, date: new Date(m.date) }))
      .filter(m => m.date.getTime() > now.getTime())
      .sort((a, b) => a.date.getTime() - b.date.getTime())[0] || null;

    setNextEvent(upcoming);

    if (!upcoming) return;

    const targetDate = upcoming.date;
    const updateCountdown = () => {
      const current = new Date().getTime();
      const distance = targetDate.getTime() - current;
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)),
          minutes: Math.floor(distance % (1000 * 60 * 60) / (1000 * 60)),
          seconds: Math.floor(distance % (1000 * 60) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const symposiumStart = milestones.find(m => m.label === "Symposium Start");
  const symposiumStartDate = symposiumStart ? new Date(symposiumStart.date) : null;
  const symposiumStartText = symposiumStartDate
    ? symposiumStartDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
    : "Dec 10, 2026";

  const headingText = nextEvent
    ? (nextEvent.label === "Symposium Start" ? "Conference Starts In" : `Next: ${nextEvent.label}`)
    : "Event Starts In";

  return <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url(${heroCampus})`
    }}>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mt-20 mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in mx-0 my-[80px]">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold text-primary-foreground mb-6">
            18th Symposium on
            <span className="block bg-gradient-secondary bg-clip-text text-transparent">
              Earthquake Engineering
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-primary-foreground/90 mb-4 font-light">
            Department of Earthquake Engineering
          </p>
          
          <p className="text-xl sm:text-xl text-primary-foreground/80 mb-8">
              <span className="text-2xl sm:text-4xl font-bold">Indian Institute of Technology Roorkee</span>
          </p>

          {/* Event Details */}
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-primary-foreground/90">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>December 10–12, 2026</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>IIT Roorkee, Uttarakhand</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>500+ Participants Expected</span>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="bg-card/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-primary-foreground/20 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-primary-foreground mb-1">{headingText}</h3>
            {nextEvent && <p className="text-sm text-primary-foreground/80 mb-4">{nextEvent.date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</p>}
            <div className="grid grid-cols-4 gap-4">
              {Object.entries(timeLeft).map(([unit, value]) => <div key={unit} className="text-center">
                  <div className="bg-primary-foreground/20 rounded-lg p-3 mb-2">
                    <span className="text-2xl sm:text-3xl font-bold text-primary-foreground">
                      {value.toString().padStart(2, '0')}
                    </span>
                  </div>
                  <span className="text-sm text-primary-foreground/80 capitalize">{unit}</span>
                </div>)}
            </div>
            {symposiumStartText && <p className="text-xs text-primary-foreground/70 mt-4">Conference start: {symposiumStartText}</p>}
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-secondary hover:bg-secondary-dark text-secondary-foreground shadow-glow" asChild>
              <a href="/registration-soon">Register Now</a>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground bg-slate-100 text-slate-700" asChild>
              <a href="/schedule.pdf" download>
                <Download className="h-4 w-4 mr-2" />
                Download Brochure
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Animation Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-secondary/30 rounded-full animate-float"></div>
      <div className="absolute bottom-32 right-16 w-6 h-6 bg-secondary/20 rounded-full animate-float" style={{
      animationDelay: '2s'
    }}></div>
      <div className="absolute top-1/2 left-20 w-3 h-3 bg-secondary/40 rounded-full animate-float" style={{
      animationDelay: '1s'
    }}></div>
    </section>;
};