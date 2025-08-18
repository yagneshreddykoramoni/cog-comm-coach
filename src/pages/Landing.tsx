import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Clock, Users, Trophy, ArrowRight, Mic, Volume2, PenTool } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-communication.jpg";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Mic className="h-6 w-6" />,
      title: "Speaking Assessment",
      description: "Practice reading sentences, repeating audio, and answering questions with real-time feedback"
    },
    {
      icon: <PenTool className="h-6 w-6" />,
      title: "Grammar & Structure",
      description: "Master sentence arrangement and grammar rules with interactive exercises"
    },
    {
      icon: <Volume2 className="h-6 w-6" />,
      title: "Listening Skills",
      description: "Improve comprehension and retention through audio-based challenges"
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: "Performance Tracking",
      description: "Detailed analytics and progress monitoring to identify strengths and areas for improvement"
    }
  ];

  const testFormat = [
    { section: "Reading Sentences Aloud", questions: 8, time: "6 min", skill: "Pronunciation & Clarity" },
    { section: "Repeat Sentences", questions: 16, time: "12 min", skill: "Listening & Memory" },
    { section: "Jumbled Sentences", questions: 10, time: "8 min", skill: "Grammar & Structure" },
    { section: "Question & Answer", questions: 24, time: "24 min", skill: "Fluency & Spontaneity" },
    { section: "Storytelling", questions: 2, time: "8 min", skill: "Creativity & Coherence" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-6 text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 gradient-hero opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/50" />
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
              Cognizant GenC Assessment Preparation
            </span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Master Your
            <span className="block bg-gradient-to-r from-white to-accent-light bg-clip-text text-transparent">
              Communication Skills
            </span>
          </h1>
          <p className="text-xl lg:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Comprehensive practice platform for Cognizant's GenC/GenC Next Round-1 Communication Assessment. 
            Build confidence with real test simulation and AI-powered feedback.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate('/dashboard')}
              className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-3 h-auto text-lg shadow-strong"
            >
              Start Practice Test
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 font-medium px-8 py-3 h-auto text-lg backdrop-blur-sm"
            >
              Learn More
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">60 min</div>
              <div className="text-white/80">Total Test Duration</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">60+ Questions</div>
              <div className="text-white/80">Comprehensive Practice</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">AI-Powered</div>
              <div className="text-white/80">Real-time Feedback</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-foreground">About Cognizant's Communication Assessment</h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              The Communication Round is a crucial part of Cognizant's GenC/GenC Next recruitment process. 
              This 60-minute assessment evaluates your English communication skills across multiple dimensions including 
              pronunciation, fluency, grammar, listening comprehension, and spontaneous speaking ability.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-semibold mb-6">What Makes This Test Important?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-success mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Gateway to Your Career</h4>
                    <p className="text-muted-foreground">This assessment determines your eligibility for client-facing roles at Cognizant</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-success mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Comprehensive Evaluation</h4>
                    <p className="text-muted-foreground">Tests real-world communication skills essential for professional success</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-success mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">High Standards</h4>
                    <p className="text-muted-foreground">Maintains Cognizant's reputation for excellent client communication</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <Card key={index} className="p-6 gradient-card shadow-soft border-0 transition-smooth hover:shadow-medium">
                  <div className="text-primary mb-3">{feature.icon}</div>
                  <h4 className="font-semibold mb-2 text-sm">{feature.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Test Format Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Test Format & Structure</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Understanding the test structure is key to success. Here's exactly what you'll encounter in the actual assessment.
            </p>
          </div>

          <div className="grid gap-4 mb-12">
            {testFormat.map((section, index) => (
              <Card key={index} className="p-6 gradient-card border-0 shadow-soft transition-smooth hover:shadow-medium">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{section.section}</h3>
                    <p className="text-muted-foreground text-sm">{section.skill}</p>
                  </div>
                  <div className="flex gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span className="font-medium">{section.questions} Questions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-accent" />
                      <span className="font-medium">{section.time}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              variant="default"
              onClick={() => navigate('/dashboard')}
              className="gradient-primary font-semibold px-8 py-3 h-auto text-lg shadow-medium hover:shadow-strong transition-smooth"
            >
              Begin Your Practice Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Instructions Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">Before You Begin</h2>
            <p className="text-xl text-muted-foreground">
              Ensure optimal test conditions for the best practice experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 gradient-card border-0 shadow-soft">
              <h3 className="text-xl font-semibold mb-4 text-primary">Technical Requirements</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  Stable internet connection
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  Working microphone and speakers
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  Modern web browser (Chrome recommended)
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  Quiet environment for recording
                </li>
              </ul>
            </Card>

            <Card className="p-8 gradient-card border-0 shadow-soft">
              <h3 className="text-xl font-semibold mb-4 text-accent">Test Tips</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  Speak clearly and at moderate pace
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  Take your time to understand questions
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  Practice regularly for best results
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  Review feedback after each section
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;