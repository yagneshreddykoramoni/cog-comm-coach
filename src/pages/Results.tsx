import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  TrendingUp, 
  CheckCircle, 
  AlertTriangle, 
  RotateCcw, 
  Home,
  BarChart3,
  Star,
  Target,
  Clock,
  Volume2,
  Mic
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { section, answers } = location.state || { section: 'reading', answers: [] };

  // Mock results data - would come from AI analysis in real app
  const results = {
    reading: {
      title: "Reading Sentences Aloud",
      overall: 85,
      metrics: {
        pronunciation: 90,
        clarity: 88,
        pace: 82,
        fluency: 85
      },
      feedback: "Excellent pronunciation and clarity! Your speaking pace was well-controlled. Consider working on maintaining consistent fluency throughout longer sentences.",
      strengths: ["Clear pronunciation", "Good pace control", "Confident delivery"],
      improvements: ["Maintain fluency in complex sentences", "Slight hesitation on technical terms"],
      recommendations: [
        "Practice reading technical vocabulary daily",
        "Focus on breathing techniques for longer sentences",
        "Record yourself reading various text types"
      ]
    },
    jumbled: {
      title: "Jumbled Sentences",
      overall: 78,
      metrics: {
        grammar: 85,
        logic: 75,
        speed: 72,
        accuracy: 80
      },
      feedback: "Good understanding of sentence structure and grammar rules. You showed logical thinking in arranging words, though speed could be improved with practice.",
      strengths: ["Strong grammar foundation", "Logical word arrangement", "Good accuracy"],
      improvements: ["Increase solving speed", "Quick pattern recognition"],
      recommendations: [
        "Practice daily grammar exercises",
        "Work with complex sentence structures",
        "Time yourself on similar exercises"
      ]
    },
    qa: {
      title: "Question & Answer",
      overall: 82,
      metrics: {
        fluency: 85,
        relevance: 88,
        vocabulary: 78,
        coherence: 80
      },
      feedback: "Strong communication skills with relevant and coherent responses. Your fluency is impressive, and vocabulary usage is appropriate for professional contexts.",
      strengths: ["Coherent responses", "Professional vocabulary", "Good fluency"],
      improvements: ["Expand vocabulary range", "Structure longer responses better"],
      recommendations: [
        "Practice impromptu speaking daily",
        "Expand professional vocabulary",
        "Work on response structure (introduction, body, conclusion)"
      ]
    }
  };

  const sectionResult = results[section as keyof typeof results] || results.reading;
  
  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-success";
    if (score >= 70) return "text-warning";
    return "text-destructive";
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return "bg-success-light";
    if (score >= 70) return "bg-warning-light";
    return "bg-destructive/10";
  };

  const getPerformanceLevel = (score: number) => {
    if (score >= 85) return { label: "Excellent", color: "success" };
    if (score >= 70) return { label: "Good", color: "warning" };
    return { label: "Needs Improvement", color: "destructive" };
  };

  const performanceLevel = getPerformanceLevel(sectionResult.overall);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-soft">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Trophy className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">Assessment Results</h1>
            </div>
            <p className="text-muted-foreground">{sectionResult.title}</p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Overall Score */}
        <Card className={`p-8 mb-8 ${getScoreBg(sectionResult.overall)} border-0 shadow-soft`}>
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className={`text-6xl font-bold ${getScoreColor(sectionResult.overall)}`}>
                {sectionResult.overall}%
              </div>
              <div className="text-left">
                <Badge className={`mb-2 bg-${performanceLevel.color} text-${performanceLevel.color}-foreground`}>
                  {performanceLevel.label}
                </Badge>
                <div className="text-sm text-muted-foreground">Overall Performance</div>
              </div>
            </div>
            <Progress value={sectionResult.overall} className="max-w-md mx-auto mb-4" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {sectionResult.feedback}
            </p>
          </div>
        </Card>

        {/* Detailed Metrics */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card className="p-6 gradient-card border-0 shadow-soft">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Performance Breakdown</h2>
            </div>

            <div className="space-y-4">
              {Object.entries(sectionResult.metrics).map(([metric, score]) => (
                <div key={metric} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium capitalize">{metric.replace(/([A-Z])/g, ' $1')}</span>
                    <span className={`font-semibold ${getScoreColor(score)}`}>{score}%</span>
                  </div>
                  <Progress value={score} className="h-2" />
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 gradient-card border-0 shadow-soft">
            <div className="flex items-center gap-3 mb-6">
              <Target className="h-6 w-6 text-success" />
              <h2 className="text-xl font-semibold">Key Strengths</h2>
            </div>

            <div className="space-y-3">
              {sectionResult.strengths.map((strength, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                  <span className="text-sm">{strength}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <h3 className="font-semibold">Areas for Improvement</h3>
              </div>
              <div className="space-y-2">
                {sectionResult.improvements.map((improvement, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-warning" />
                    <span className="text-sm text-muted-foreground">{improvement}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Recommendations */}
        <Card className="p-6 gradient-card border-0 shadow-soft mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Star className="h-6 w-6 text-accent" />
            <h2 className="text-xl font-semibold">Personalized Recommendations</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {sectionResult.recommendations.map((recommendation, index) => (
              <Card key={index} className="p-4 bg-accent-light border-accent/20">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-relaxed">{recommendation}</p>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate(`/assessment/${section}`)}
            className="px-8"
          >
            <RotateCcw className="h-5 w-5 mr-2" />
            Practice Again
          </Button>
          <Button
            size="lg"
            onClick={() => navigate('/dashboard')}
            className="gradient-primary px-8 shadow-medium font-semibold"
          >
            <Home className="h-5 w-5 mr-2" />
            Back to Dashboard
          </Button>
          <Button
            size="lg"
            variant="success"
            className="px-8"
          >
            <TrendingUp className="h-5 w-5 mr-2" />
            Try Full Mock Test
          </Button>
        </div>

        {/* Performance Tips */}
        <Card className="mt-8 p-6 bg-primary-light border-primary/20">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground text-sm font-bold">💡</span>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Pro Tip</h3>
              <p className="text-sm text-muted-foreground">
                Consistent practice is key to improvement. Try to practice for 15-20 minutes daily, 
                focusing on your weakest areas. The more you practice, the more confident you'll become 
                during the actual assessment.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Results;