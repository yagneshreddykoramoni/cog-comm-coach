import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Repeat, 
  Shuffle, 
  MessageCircle, 
  BookText, 
  HeadphonesIcon,
  Play,
  BarChart3,
  Clock,
  Target,
  ArrowLeft,
  CheckCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState<'full' | 'practice'>('practice');

  const assessmentSections = [
    {
      id: 'reading',
      title: 'Reading Sentences Aloud',
      icon: <BookOpen className="h-6 w-6" />,
      description: 'Read 8 sentences clearly with proper pronunciation',
      questions: 8,
      time: 6,
      difficulty: 'Beginner',
      skills: ['Pronunciation', 'Clarity', 'Pace'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'repeat',
      title: 'Repeat Sentences',
      icon: <Repeat className="h-6 w-6" />,
      description: 'Listen carefully and repeat 16 sentences exactly as heard',
      questions: 16,
      time: 12,
      difficulty: 'Intermediate',
      skills: ['Listening', 'Memory', 'Accuracy'],
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'jumbled',
      title: 'Jumbled Sentences',
      icon: <Shuffle className="h-6 w-6" />,
      description: 'Rearrange 10 mixed-up sentences into correct order',
      questions: 10,
      time: 8,
      difficulty: 'Intermediate',
      skills: ['Grammar', 'Logic', 'Structure'],
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'qa',
      title: 'Question & Answer',
      icon: <MessageCircle className="h-6 w-6" />,
      description: 'Answer 24 questions with spontaneous spoken responses',
      questions: 24,
      time: 24,
      difficulty: 'Advanced',
      skills: ['Fluency', 'Thinking', 'Vocabulary'],
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'storytelling',
      title: 'Storytelling',
      icon: <BookText className="h-6 w-6" />,
      description: 'Create coherent stories based on 2 visual prompts',
      questions: 2,
      time: 8,
      difficulty: 'Advanced',
      skills: ['Creativity', 'Coherence', 'Structure'],
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'listening',
      title: 'Listening Comprehension',
      icon: <HeadphonesIcon className="h-6 w-6" />,
      description: 'Answer questions based on audio passages',
      questions: 16,
      time: 10,
      difficulty: 'Intermediate',
      skills: ['Comprehension', 'Detail', 'Inference'],
      color: 'from-teal-500 to-teal-600'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-success text-success-foreground';
      case 'Intermediate': return 'bg-warning text-warning-foreground';
      case 'Advanced': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const totalQuestions = assessmentSections.reduce((sum, section) => sum + section.questions, 0);
  const totalTime = assessmentSections.reduce((sum, section) => sum + section.time, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-soft">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/')}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Practice Dashboard</h1>
                <p className="text-sm text-muted-foreground">Choose your assessment mode and begin practicing</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right text-sm">
                <div className="font-medium">{totalQuestions} Total Questions</div>
                <div className="text-muted-foreground">{totalTime} minutes</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Mode Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Select Practice Mode</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Card 
              className={`p-6 cursor-pointer transition-all border-2 ${
                selectedMode === 'practice' 
                  ? 'border-primary bg-primary-light shadow-medium' 
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => setSelectedMode('practice')}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Target className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold text-lg">Practice Mode</h3>
                    <p className="text-sm text-muted-foreground">Practice individual sections at your own pace</p>
                  </div>
                </div>
                {selectedMode === 'practice' && <CheckCircle className="h-5 w-5 text-primary" />}
              </div>
              <div className="text-sm text-muted-foreground">
                • Choose specific sections to practice<br/>
                • No time pressure<br/>
                • Immediate feedback after each question<br/>
                • Perfect for learning and improvement
              </div>
            </Card>

            <Card 
              className={`p-6 cursor-pointer transition-all border-2 ${
                selectedMode === 'full' 
                  ? 'border-primary bg-primary-light shadow-medium' 
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => setSelectedMode('full')}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Clock className="h-8 w-8 text-accent" />
                  <div>
                    <h3 className="font-semibold text-lg">Full Mock Test</h3>
                    <p className="text-sm text-muted-foreground">Complete timed simulation of the actual test</p>
                  </div>
                </div>
                {selectedMode === 'full' && <CheckCircle className="h-5 w-5 text-primary" />}
              </div>
              <div className="text-sm text-muted-foreground">
                • All sections in sequence<br/>
                • Realistic time constraints<br/>
                • Complete performance report<br/>
                • True exam experience
              </div>
            </Card>
          </div>
        </div>

        {/* Assessment Sections */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Assessment Sections</h2>
            {selectedMode === 'full' && (
              <Button className="gradient-primary font-semibold shadow-medium">
                <Play className="h-4 w-4 mr-2" />
                Start Full Mock Test ({totalTime} min)
              </Button>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {assessmentSections.map((section, index) => (
              <Card key={section.id} className="p-6 gradient-card border-0 shadow-soft hover:shadow-medium transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${section.color} text-white shadow-soft`}>
                      {section.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{section.title}</h3>
                      <Badge className={`mt-1 ${getDifficultyColor(section.difficulty)}`}>
                        {section.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <div>{section.questions} Questions</div>
                    <div>{section.time} minutes</div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {section.description}
                </p>

                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium">Skills Tested:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {section.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    className="flex-1" 
                    variant="outline"
                    onClick={() => navigate(`/assessment/${section.id}`)}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Practice
                  </Button>
                  <Button variant="ghost" size="sm">
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="p-6 gradient-card border-0 shadow-soft">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold">Your Progress Overview</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">0%</div>
              <div className="text-sm text-muted-foreground">Sections Completed</div>
              <Progress value={0} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">N/A</div>
              <div className="text-sm text-muted-foreground">Average Score</div>
              <Progress value={0} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success mb-1">0</div>
              <div className="text-sm text-muted-foreground">Practice Sessions</div>
              <Progress value={0} className="mt-2" />
            </div>
          </div>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              Start practicing to see your progress and performance analytics. Regular practice helps build confidence and improves your communication skills.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;