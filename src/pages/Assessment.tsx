import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Play, 
  Square, 
  Mic, 
  MicOff, 
  RotateCcw,
  CheckCircle,
  Clock,
  Volume2,
  Shuffle
} from "lucide-react";

// Assessment data
const assessmentData = {
  reading: {
    title: "Reading Sentences Aloud",
    instructions: "Click 'Record' and read each sentence aloud clearly. Speak at a natural pace with proper pronunciation.",
    questions: [
      "The quick brown fox jumps over the lazy dog in the sunny meadow.",
      "Technology has revolutionized the way we communicate and work in modern society.",
      "Environmental conservation requires immediate action from all global communities.",
      "Customer service representatives must demonstrate patience and problem-solving skills.",
      "Data analysis reveals significant trends in consumer behavior and market preferences.",
      "Effective leadership involves inspiring teams to achieve their maximum potential.",
      "International collaboration is essential for addressing climate change challenges.",
      "Digital transformation continues to reshape traditional business models worldwide."
    ]
  },
  jumbled: {
    title: "Jumbled Sentences",
    instructions: "Drag the words to arrange them in the correct order to form meaningful sentences.",
    questions: [
      {
        words: ["technology", "has", "changed", "our", "lives", "significantly"],
        correct: "technology has changed our lives significantly"
      },
      {
        words: ["team", "the", "project", "completed", "successfully", "their"],
        correct: "the team completed their project successfully"
      },
      {
        words: ["learning", "continuous", "is", "professional", "for", "essential", "growth"],
        correct: "continuous learning is essential for professional growth"
      },
      {
        words: ["communication", "effective", "workplace", "success", "key", "is", "to"],
        correct: "effective communication is key to workplace success"
      },
      {
        words: ["innovation", "drives", "economic", "and", "progress", "development"],
        correct: "innovation drives economic progress and development"
      }
    ]
  },
  qa: {
    title: "Question & Answer",
    instructions: "Listen to each question and provide a clear, detailed answer. Speak naturally and take your time.",
    questions: [
      "Tell me about yourself and your career goals.",
      "Describe a challenging situation you faced and how you overcame it.",
      "What are your greatest strengths and how do they help you at work?",
      "How do you handle stress and pressure in demanding situations?",
      "Describe a time when you had to work as part of a team.",
      "What motivates you to perform well in your professional life?",
      "How do you stay updated with industry trends and developments?",
      "Describe your ideal work environment and company culture."
    ]
  }
};

const Assessment = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes default
  const [answers, setAnswers] = useState<string[]>([]);
  const [jumbledAnswer, setJumbledAnswer] = useState<string[]>([]);
  
  const section = assessmentData[sectionId as keyof typeof assessmentData];
  
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Start recording simulation
      setTimeout(() => {
        setIsRecording(false);
        setHasRecorded(true);
      }, 3000); // Simulate 3 second recording
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < (section?.questions?.length || 0) - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setHasRecorded(false);
      setJumbledAnswer([]);
    } else {
      // Assessment complete
      navigate('/results', { state: { section: sectionId, answers } });
    }
  };

  const handleJumbledDrop = (word: string, index: number) => {
    const newAnswer = [...jumbledAnswer];
    newAnswer[index] = word;
    setJumbledAnswer(newAnswer);
  };

  const renderReadingQuestion = () => {
    const question = section?.questions[currentQuestion] as string;
    return (
      <div className="text-center">
        <Card className="p-8 gradient-card border-0 shadow-soft max-w-4xl mx-auto">
          <p className="text-xl leading-relaxed mb-8 text-foreground font-medium">
            {question}
          </p>
          
          <div className="flex flex-col items-center gap-6">
            <Button
              size="lg"
              variant={isRecording ? "destructive" : "default"}
              onClick={handleRecord}
              disabled={hasRecorded}
              className={`${isRecording ? 'recording-pulse' : ''} font-semibold px-8`}
            >
              {isRecording ? (
                <>
                  <Square className="h-5 w-5 mr-2" />
                  Stop Recording
                </>
              ) : hasRecorded ? (
                <>
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Recorded Successfully
                </>
              ) : (
                <>
                  <Mic className="h-5 w-5 mr-2" />
                  Start Recording
                </>
              )}
            </Button>
            
            {isRecording && (
              <div className="flex items-center gap-2 text-destructive">
                <div className="w-3 h-3 bg-destructive rounded-full recording-pulse" />
                <span className="text-sm font-medium">Recording in progress...</span>
              </div>
            )}
          </div>
        </Card>
      </div>
    );
  };

  const renderJumbledQuestion = () => {
    const question = section?.questions[currentQuestion] as { words: string[], correct: string };
    const availableWords = question.words.filter(word => !jumbledAnswer.includes(word));
    
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 gradient-card border-0 shadow-soft">
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Arrange the words to form a correct sentence:</h3>
            
            {/* Available Words */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-3">Available words:</p>
              <div className="flex flex-wrap gap-2">
                {availableWords.map((word, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setJumbledAnswer([...jumbledAnswer, word])}
                    className="capitalize hover:bg-primary hover:text-primary-foreground"
                  >
                    {word}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Answer Area */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-3">Your sentence:</p>
              <div className="min-h-16 p-4 border-2 border-dashed border-border rounded-lg bg-muted/20">
                {jumbledAnswer.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {jumbledAnswer.map((word, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => setJumbledAnswer(jumbledAnswer.filter((_, i) => i !== index))}
                      >
                        {word}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center">Click words above to build your sentence</p>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setJumbledAnswer([])}
                disabled={jumbledAnswer.length === 0}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button
                onClick={() => setHasRecorded(true)}
                disabled={jumbledAnswer.length === 0}
                variant="success"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Submit Answer
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  const renderQAQuestion = () => {
    const question = section?.questions[currentQuestion] as string;
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 gradient-card border-0 shadow-soft">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Volume2 className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Question {currentQuestion + 1}</span>
            </div>
            <h3 className="text-xl font-semibold mb-6">{question}</h3>
            
            <div className="flex flex-col items-center gap-6">
              <Button
                size="lg"
                variant={isRecording ? "destructive" : "default"}
                onClick={handleRecord}
                disabled={hasRecorded}
                className={`${isRecording ? 'recording-pulse' : ''} font-semibold px-8`}
              >
                {isRecording ? (
                  <>
                    <MicOff className="h-5 w-5 mr-2" />
                    Stop Recording
                  </>
                ) : hasRecorded ? (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Answer Recorded
                  </>
                ) : (
                  <>
                    <Mic className="h-5 w-5 mr-2" />
                    Record Answer
                  </>
                )}
              </Button>
              
              {isRecording && (
                <div className="flex items-center gap-2 text-destructive">
                  <div className="w-3 h-3 bg-destructive rounded-full recording-pulse" />
                  <span className="text-sm font-medium">Recording your response...</span>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    );
  };

  if (!section) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Section Not Found</h2>
          <Button onClick={() => navigate('/dashboard')}>Return to Dashboard</Button>
        </Card>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / section.questions.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-soft sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Exit Assessment
              </Button>
              <div>
                <h1 className="text-xl font-bold">{section.title}</h1>
                <p className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {section.questions.length}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-mono text-sm">{formatTime(timeLeft)}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{Math.round(progress)}% Complete</div>
                <Progress value={progress} className="w-32 mt-1" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Instructions */}
        <Card className="p-6 mb-8 bg-primary-light border-primary/20">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-primary-foreground text-xs font-bold">i</span>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Instructions</h3>
              <p className="text-sm text-muted-foreground">{section.instructions}</p>
            </div>
          </div>
        </Card>

        {/* Question Content */}
        <div className="mb-8">
          {sectionId === 'reading' && renderReadingQuestion()}
          {sectionId === 'jumbled' && renderJumbledQuestion()}
          {sectionId === 'qa' && renderQAQuestion()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
          >
            Previous Question
          </Button>
          
          <div className="flex gap-2">
            {Array.from({ length: section.questions.length }, (_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i < currentQuestion 
                    ? 'bg-success' 
                    : i === currentQuestion 
                    ? 'bg-primary' 
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={handleNextQuestion}
            disabled={!hasRecorded}
            variant={currentQuestion === section.questions.length - 1 ? "success" : "default"}
          >
            {currentQuestion === section.questions.length - 1 ? "Finish Assessment" : "Next Question"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;