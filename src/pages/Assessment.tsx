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

// Question pools for dynamic generation
const questionPools = {
  reading: [
    "The quick brown fox jumps over the lazy dog in the sunny meadow.",
    "Technology has revolutionized the way we communicate and work in modern society.",
    "Environmental conservation requires immediate action from all global communities.",
    "Customer service representatives must demonstrate patience and problem-solving skills.",
    "Data analysis reveals significant trends in consumer behavior and market preferences.",
    "Effective leadership involves inspiring teams to achieve their maximum potential.",
    "International collaboration is essential for addressing climate change challenges.",
    "Digital transformation continues to reshape traditional business models worldwide.",
    "Artificial intelligence is transforming industries across the globe.",
    "The library offers extensive resources for research and academic studies.",
    "Regular exercise contributes significantly to maintaining good health.",
    "The company launched a new product line targeting young professionals.",
    "Environmental conservation requires collective effort from all citizens.",
    "The museum showcases artifacts from ancient civilizations around the world.",
    "Communication skills are crucial for success in any professional environment.",
    "The scientific breakthrough could lead to revolutionary medical treatments."
  ],
  repeat: [
    "Technology has revolutionized modern communication systems worldwide.",
    "Customer service requires exceptional patience and problem-solving abilities.",
    "Environmental sustainability demands immediate global collaborative action.",
    "Data analysis reveals significant trends in consumer behavior patterns.",
    "Effective leadership involves inspiring teams to achieve maximum potential.",
    "Digital transformation continues reshaping traditional business models.",
    "Professional development requires continuous learning and skill enhancement.",
    "International cooperation is essential for addressing climate challenges.",
    "Innovation drives economic progress and sustainable development initiatives.",
    "Communication skills are fundamental for workplace success and growth.",
    "Quality assurance ensures products meet industry standards consistently.",
    "Project management involves coordinating resources and timelines effectively.",
    "Strategic planning helps organizations achieve long-term objectives.",
    "Team collaboration enhances productivity and creative problem-solving.",
    "Market research provides valuable insights for business decisions.",
    "Technical expertise combined with soft skills creates professional excellence.",
    "Global markets require adaptability and cultural awareness from professionals.",
    "Cybersecurity measures protect sensitive data and maintain user trust.",
    "Remote work has changed traditional office dynamics significantly."
  ],
  jumbled: [
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
    },
    {
      words: ["management", "project", "requires", "and", "coordination", "planning", "careful"],
      correct: "project management requires careful planning and coordination"
    },
    {
      words: ["quality", "ensures", "assurance", "standards", "meet", "products", "industry"],
      correct: "quality assurance ensures products meet industry standards"
    },
    {
      words: ["research", "market", "provides", "insights", "valuable", "for", "decisions", "business"],
      correct: "market research provides valuable insights for business decisions"
    },
    {
      words: ["collaboration", "team", "enhances", "and", "productivity", "problem-solving"],
      correct: "team collaboration enhances productivity and problem-solving"
    },
    {
      words: ["development", "professional", "requires", "learning", "continuous", "and", "improvement"],
      correct: "professional development requires continuous learning and improvement"
    },
    {
      words: ["creativity", "helps", "solve", "complex", "problems", "efficiently"],
      correct: "creativity helps solve complex problems efficiently"
    },
    {
      words: ["global", "business", "requires", "cultural", "understanding", "and", "adaptation"],
      correct: "global business requires cultural understanding and adaptation"
    }
  ],
  qa: [
    "Tell me about yourself and your career goals.",
    "Describe a challenging situation you faced and how you overcame it.",
    "What are your greatest strengths and how do they help you at work?",
    "How do you handle stress and pressure in demanding situations?",
    "Describe a time when you had to work as part of a team.",
    "What motivates you to perform well in your professional life?",
    "How do you stay updated with industry trends and developments?",
    "Describe your ideal work environment and company culture.",
    "How do you prioritize tasks when you have multiple deadlines?",
    "Tell me about a time you had to learn something new quickly.",
    "What role does communication play in your work?",
    "How do you handle feedback and criticism?",
    "Describe a project you're particularly proud of.",
    "What do you think makes a good leader?",
    "How do you balance work and personal life?",
    "What are your long-term career aspirations?",
    "How do you stay motivated during challenging projects?",
    "Describe your approach to problem-solving.",
    "What do you consider your biggest professional achievement?",
    "How do you handle working with difficult colleagues?",
    "What skills would you like to develop further?",
    "How do you ensure quality in your work?",
    "What trends do you see in your industry?",
    "How do you adapt to change in the workplace?",
    "What drives your passion for your field?",
    "How do you maintain professional relationships?",
    "Describe your experience with remote work.",
    "What role does innovation play in your work?",
    "How do you handle tight deadlines and multiple priorities?",
    "What would you do to improve team productivity?"
  ],
  storytelling: [
    {
      type: "prompt",
      content: "Tell a story about a time when technology helped solve an unexpected problem at work."
    },
    {
      type: "prompt", 
      content: "Create a story about teamwork during a challenging project deadline."
    },
    {
      type: "prompt",
      content: "Describe a situation where clear communication prevented a major misunderstanding."
    },
    {
      type: "prompt",
      content: "Tell a story about learning an important lesson from a failure."
    },
    {
      type: "prompt",
      content: "Create a narrative about adapting to unexpected changes in a work environment."
    },
    {
      type: "prompt",
      content: "Describe a time when creative thinking led to an innovative solution."
    }
  ],
  listening: [
    {
      title: "Remote Work Communication",
      transcript: "In today's digital workplace, effective communication has become more crucial than ever. With remote work becoming the norm, professionals must adapt their communication strategies to maintain productivity and team cohesion. Companies are investing heavily in digital collaboration tools, spending an average of $15,000 per employee annually. Email, video calls, and instant messaging have replaced face-to-face interactions, requiring new skills in digital literacy and virtual collaboration. Studies show that 78% of remote workers report feeling more connected when using video conferencing compared to audio-only calls.",
      questions: [
        {
          question: "What has become more crucial in today's digital workplace?",
          options: ["Technical skills", "Effective communication", "Physical presence", "Time management"],
          correct: 1
        },
        {
          question: "How much do companies spend on average per employee for digital collaboration tools?",
          options: ["$10,000", "$15,000", "$20,000", "$25,000"],
          correct: 1
        },
        {
          question: "What percentage of remote workers feel more connected with video calls?",
          options: ["68%", "78%", "88%", "98%"],
          correct: 1
        },
        {
          question: "What skills are required for virtual collaboration?",
          options: ["Only technical skills", "Digital literacy and virtual collaboration", "Physical coordination", "Time management only"],
          correct: 1
        }
      ]
    },
    {
      title: "Project Management Evolution",
      transcript: "Project management methodologies have evolved significantly over the past decade. Agile and Scrum frameworks have gained popularity due to their flexibility and iterative approach. These methodologies emphasize collaboration, customer feedback, and rapid adaptation to changing requirements, making them ideal for dynamic business environments. Traditional waterfall methods, once dominant in software development, now represent only 30% of project management approaches. The success rate of Agile projects is 42% higher than traditional methods, with teams completing projects 25% faster on average.",
      questions: [
        {
          question: "Why have Agile and Scrum frameworks gained popularity?",
          options: ["They are cheaper", "They require fewer resources", "They offer flexibility and iterative approach", "They eliminate the need for meetings"],
          correct: 2
        },
        {
          question: "What percentage of project management approaches do traditional waterfall methods represent now?",
          options: ["20%", "30%", "40%", "50%"],
          correct: 1
        },
        {
          question: "How much higher is the success rate of Agile projects?",
          options: ["32%", "42%", "52%", "62%"],
          correct: 1
        },
        {
          question: "How much faster do Agile teams complete projects on average?",
          options: ["15%", "25%", "35%", "45%"],
          correct: 1
        }
      ]
    }
  ]
};

// Generate random assessment data
const generateRandomAssessment = () => {
  const shuffle = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  return {
    reading: {
      title: "Reading Sentences Aloud",
      instructions: "Click 'Record' and read each sentence aloud clearly. Speak at a natural pace with proper pronunciation.",
      questions: shuffle(questionPools.reading).slice(0, 8)
    },
    repeat: {
      title: "Repeat Sentences", 
      instructions: "Listen carefully to each sentence and then record yourself repeating it exactly as you heard it.",
      questions: shuffle(questionPools.repeat).slice(0, 16)
    },
    jumbled: {
      title: "Jumbled Sentences",
      instructions: "Arrange the words in the correct order to form meaningful sentences. Click words to add them to your sentence.",
      questions: shuffle(questionPools.jumbled).slice(0, 10)
    },
    qa: {
      title: "Question & Answer",
      instructions: "Listen to each question and provide a clear, detailed answer. Speak naturally and take your time.",
      questions: shuffle(questionPools.qa).slice(0, 24)
    },
    storytelling: {
      title: "Storytelling",
      instructions: "Look at the prompt or images and create a 1-2 minute story. Be creative and speak clearly with good structure.",
      questions: shuffle(questionPools.storytelling).slice(0, 2)
    },
    listening: {
      title: "Listening Comprehension",
      instructions: "Listen carefully to each audio passage and answer the questions that follow.",
      questions: shuffle(questionPools.listening).slice(0, 2)
    }
  };
};

// Initialize assessment data
const assessmentData = generateRandomAssessment();

const Assessment = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes default
  const [answers, setAnswers] = useState<string[]>([]);
  const [jumbledAnswer, setJumbledAnswer] = useState<string[]>([]);
  const [transcription, setTranscription] = useState<string>('');
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [recognition, setRecognition] = useState<any>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [currentListeningQuestion, setCurrentListeningQuestion] = useState(0);
  const [listeningAnswers, setListeningAnswers] = useState<number[]>([]);
  const [hasPlayedAudio, setHasPlayedAudio] = useState(false);
  
  const section = assessmentData[sectionId as keyof typeof assessmentData];
  
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setTranscription(finalTranscript.trim());
        }
      };
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
      };
      
      setRecognition(recognition);
    }
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateAccuracy = (original: string, spoken: string): number => {
    const originalWords = original.toLowerCase().replace(/[^\w\s]/g, '').split(' ').filter(w => w.length > 0);
    const spokenWords = spoken.toLowerCase().replace(/[^\w\s]/g, '').split(' ').filter(w => w.length > 0);
    
    let matches = 0;
    const maxLength = Math.max(originalWords.length, spokenWords.length);
    
    for (let i = 0; i < Math.min(originalWords.length, spokenWords.length); i++) {
      if (originalWords[i] === spokenWords[i]) {
        matches++;
      }
    }
    
    return maxLength > 0 ? Math.round((matches / maxLength) * 100) : 0;
  };

  const highlightDifferences = (original: string, spoken: string) => {
    const originalWords = original.split(' ');
    const spokenWords = spoken.split(' ');
    const maxLength = Math.max(originalWords.length, spokenWords.length);
    
    const result = [];
    for (let i = 0; i < maxLength; i++) {
      const originalWord = originalWords[i] || '';
      const spokenWord = spokenWords[i] || '';
      const isMatch = originalWord.toLowerCase().replace(/[^\w]/g, '') === spokenWord.toLowerCase().replace(/[^\w]/g, '');
      
      if (originalWord) {
        result.push({
          word: originalWord,
          type: 'original',
          isMatch: isMatch && spokenWord
        });
      }
    }
    
    return result;
  };

  const handleRecord = async () => {
    if (!isRecording) {
      try {
        // Start recording
        setTranscription('');
        setShowComparison(false);
        if (recognition) {
          recognition.start();
        }
        
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        const chunks: Blob[] = [];
        
        recorder.ondataavailable = (e) => {
          chunks.push(e.data);
        };
        
        recorder.onstop = () => {
          const audioBlob = new Blob(chunks, { type: 'audio/wav' });
          setAudioChunks([audioBlob]);
          stream.getTracks().forEach(track => track.stop());
          if (sectionId === 'reading' || sectionId === 'repeat') {
            setShowComparison(true);
          }
        };
        
        recorder.start();
        setMediaRecorder(recorder);
        setIsRecording(true);
      } catch (error) {
        console.error('Error starting recording:', error);
        alert('Please allow microphone access to record your voice.');
      }
    } else {
      // Stop recording
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
      }
      if (recognition) {
        recognition.stop();
      }
      setMediaRecorder(null);
      setIsRecording(false);
      setHasRecorded(true);
      
      // Save the transcription to answers
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = transcription;
      setAnswers(newAnswers);
    }
  };

  const handleNextQuestion = () => {
    // Create detailed answer object
    let answerData: any = {
      questionIndex: currentQuestion,
      timestamp: new Date().toISOString(),
      transcription: transcription,
      audioData: audioChunks[0] || null,
    };

    if (sectionId === 'reading' || sectionId === 'repeat') {
      const originalText = section?.questions[currentQuestion] as string;
      answerData.originalText = originalText;
      answerData.accuracy = calculateAccuracy(originalText, transcription);
    } else if (sectionId === 'jumbled') {
      const question = section?.questions[currentQuestion] as { words: string[], correct: string };
      answerData.userAnswer = jumbledAnswer.join(' ');
      answerData.correctAnswer = question.correct;
      answerData.isCorrect = question.correct.toLowerCase() === jumbledAnswer.join(' ').toLowerCase();
    } else if (sectionId === 'listening') {
      answerData.listeningAnswers = listeningAnswers;
      answerData.questions = section?.questions[currentQuestion];
    }

    const newAnswers = [...answers, answerData];
    setAnswers(newAnswers);

    if (currentQuestion < (section?.questions?.length || 0) - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setHasRecorded(false);
      setJumbledAnswer([]);
      setTranscription('');
      setSelectedAnswer(null);
      setShowComparison(false);
      setListeningAnswers([]);
      setCurrentListeningQuestion(0);
      setHasPlayedAudio(false);
    } else {
      // Assessment complete
      navigate('/results', { 
        state: { 
          section: sectionId, 
          answers: newAnswers, 
          totalQuestions: section?.questions?.length || 0,
          timeSpent: 300 - timeLeft
        } 
      });
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

            {showComparison && transcription && (
              <Card className="w-full max-w-4xl p-6 border-2 border-primary bg-gradient-to-br from-primary/5 to-primary/10">
                <h3 className="text-xl font-semibold mb-4 text-center">Speech Analysis</h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-medium mb-2 text-success">Original Sentence:</h4>
                    <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                      <p className="text-success-foreground">{question}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 text-primary">What You Said:</h4>
                    <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                      <p className="text-primary-foreground">{transcription || "No speech detected"}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${
                      calculateAccuracy(question, transcription) >= 80 ? 'text-success' : 
                      calculateAccuracy(question, transcription) >= 60 ? 'text-warning' : 'text-destructive'
                    }`}>
                      {calculateAccuracy(question, transcription)}%
                    </div>
                    <p className="text-sm text-muted-foreground">Accuracy Score</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Word-by-Word Analysis:</h4>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex flex-wrap gap-1">
                      {highlightDifferences(question, transcription).map((item, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 rounded text-sm ${
                            item.isMatch 
                              ? 'bg-success/20 text-success border border-success/30' 
                              : 'bg-destructive/20 text-destructive border border-destructive/30'
                          }`}
                          title={item.isMatch ? 'Correct' : 'Incorrect or missing'}
                        >
                          {item.word}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 text-xs text-muted-foreground">
                      <span className="inline-block mr-4">
                        <span className="w-3 h-3 bg-success/20 border border-success/30 rounded inline-block mr-1"></span>
                        Correct words
                      </span>
                      <span className="inline-block">
                        <span className="w-3 h-3 bg-destructive/20 border border-destructive/30 rounded inline-block mr-1"></span>
                        Incorrect/missing words
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
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
                onClick={() => {
                  const newAnswers = [...answers];
                  newAnswers[currentQuestion] = jumbledAnswer.join(' ');
                  setAnswers(newAnswers);
                  setHasRecorded(true);
                }}
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

  const renderRepeatQuestion = () => {
    const question = section?.questions[currentQuestion] as string;
    
    const playAudio = () => {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(question);
      utterance.rate = 0.8;
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
    };

    return (
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 gradient-card border-0 shadow-soft">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Volume2 className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Question {currentQuestion + 1}</span>
            </div>
            
            <div className="mb-6">
              <Button
                size="lg"
                variant="outline"
                onClick={playAudio}
                disabled={isPlaying}
                className="mb-4"
              >
                <Volume2 className="h-5 w-5 mr-2" />
                {isPlaying ? 'Playing...' : 'Play Sentence'}
              </Button>
              
              {transcription && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">What you said:</p>
                  <p className="font-medium">"{transcription}"</p>
                </div>
              )}
            </div>
            
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
                    Recorded Successfully
                  </>
                ) : (
                  <>
                    <Mic className="h-5 w-5 mr-2" />
                    Record Repetition
                  </>
                )}
              </Button>
              
              {isRecording && (
                <div className="flex items-center gap-2 text-destructive">
                  <div className="w-3 h-3 bg-destructive rounded-full recording-pulse" />
                  <span className="text-sm font-medium">Recording your repetition...</span>
                </div>
              )}
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
            
            {transcription && (
              <div className="mt-4 mb-6 p-4 bg-muted rounded-lg max-w-2xl mx-auto">
                <p className="text-sm text-muted-foreground mb-2">Your response:</p>
                <p className="font-medium text-left">"{transcription}"</p>
              </div>
            )}
            
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

  const renderStorytellingQuestion = () => {
    const question = section?.questions[currentQuestion] as { type: string, content: string };
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 gradient-card border-0 shadow-soft">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Volume2 className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Story {currentQuestion + 1}</span>
            </div>
            <h3 className="text-xl font-semibold mb-6">{question.content}</h3>
            
            {transcription && (
              <div className="mt-4 mb-6 p-4 bg-muted rounded-lg max-w-2xl mx-auto">
                <p className="text-sm text-muted-foreground mb-2">Your story:</p>
                <p className="font-medium text-left">"{transcription}"</p>
              </div>
            )}
            
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
                    Story Recorded
                  </>
                ) : (
                  <>
                    <Mic className="h-5 w-5 mr-2" />
                    Record Story
                  </>
                )}
              </Button>
              
              {isRecording && (
                <div className="flex items-center gap-2 text-destructive">
                  <div className="w-3 h-3 bg-destructive rounded-full recording-pulse" />
                  <span className="text-sm font-medium">Recording your story...</span>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    );
  };

  const renderListeningQuestion = () => {
    const question = section?.questions[currentQuestion] as { 
      audio: string, 
      question: string, 
      options: string[], 
      correct: number 
    };
    
    const playAudio = () => {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(question.audio);
      utterance.rate = 0.9;
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
    };

    return (
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 gradient-card border-0 shadow-soft">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Volume2 className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Question {currentQuestion + 1}</span>
            </div>
            
            <div className="mb-6">
              <Button
                size="lg"
                variant="outline"
                onClick={playAudio}
                disabled={isPlaying}
                className="mb-6"
              >
                <Volume2 className="h-5 w-5 mr-2" />
                {isPlaying ? 'Playing Audio...' : 'Play Audio'}
              </Button>
              
              <h3 className="text-xl font-semibold mb-6">{question.question}</h3>
              
              <div className="space-y-3 max-w-2xl mx-auto">
                {question.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswer === index ? "default" : "outline"}
                    className="w-full text-left justify-start p-4 h-auto"
                    onClick={() => {
                      setSelectedAnswer(index);
                      setHasRecorded(true);
                      const newAnswers = [...answers];
                      newAnswers[currentQuestion] = index.toString();
                      setAnswers(newAnswers);
                    }}
                  >
                    <span className="mr-3 font-semibold">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </Button>
                ))}
              </div>
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
          {sectionId === 'repeat' && renderRepeatQuestion()}
          {sectionId === 'jumbled' && renderJumbledQuestion()}
          {sectionId === 'qa' && renderQAQuestion()}
          {sectionId === 'storytelling' && renderStorytellingQuestion()}
          {sectionId === 'listening' && renderListeningQuestion()}
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