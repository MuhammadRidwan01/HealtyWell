import { useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

export function HealthAssessmentSection() {
  const [started, setStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const questions = [
    {
      text: "How often do you exercise per week?",
      answerOptions: ["Never", "Once", "2-3 times", "4-5 times", "Every day"],
      correctIndex: 4,
    },
    {
      text: "How is your daily diet?",
      answerOptions: ["Unstructured", "Often eat junk food", "Quite healthy", "Very healthy", "Vegetarian/Vegan"],
      correctIndex: 3,
    },
    {
      text: "How many hours of sleep do you get each night?",
      answerOptions: ["Less than 4 hours", "4-5 hours", "6-7 hours", "8 hours", "More than 8 hours"],
      correctIndex: 3,
    },
    {
      text: "How often do you feel stressed?",
      answerOptions: ["Every day", "Often", "Sometimes", "Rarely", "Never"],
      correctIndex: 3,
    },
    {
      text: "Do you smoke?",
      answerOptions: ["Yes, actively", "Occasionally", "Used to, but quit", "Never", "Anti-smoking"],
      correctIndex: 3,
    },
    {
      text: "How much water do you drink daily?",
      answerOptions: ["Less than 1 glass", "1-2 glasses", "3-4 glasses", "5-6 glasses", "7+ glasses"],
      correctIndex: 4,
    },
    {
      text: "How physically active are you besides exercise?",
      answerOptions: ["Very inactive", "Quite inactive", "Moderate", "Active", "Very active"],
      correctIndex: 4,
    },
    {
      text: "How often do you get health checkups?",
      answerOptions: ["Never", "Rarely", "Sometimes", "Often", "Every year"],
      correctIndex: 4,
    },
    {
      text: "How is your mental health condition?",
      answerOptions: ["Very poor", "Poor", "Neutral", "Good", "Very good"],
      correctIndex: 4,
    },
    {
      text: "Do you have any genetic or chronic diseases?",
      answerOptions: ["Yes, many", "A few", "Some", "Only one", "None"],
      correctIndex: 4,
    },
  ]

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1)
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setStarted(false)
      setShowResult(true)
    }
  }

  const handleStartAssessment = () => {
    setStarted(true)
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
  }

  return (
    <section className="w-full py-20 md:py-32 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900/80">
      <div className="container px-4 md:px-6">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2">
          <div className="flex flex-col justify-center space-y-6">
            <Badge 
              variant="outline" 
              className="w-fit border-teal-500 text-teal-500 dark:border-teal-400 dark:text-teal-400 px-3 py-1 text-sm font-medium rounded-full"
            >
              Interactive Tool
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
              Discover Your Personal Health Score
            </h2>
            <p className="text-slate-600 dark:text-slate-400 md:text-lg max-w-xl">
              Take our comprehensive health assessment to receive personalized recommendations and insights tailored
              to your unique health profile.
            </p>
            <div className="space-y-6 pt-4">
              {[ 
                { step: 1, title: "Complete the Assessment", desc: "Answer questions about your lifestyle and health habits" },
                { step: 2, title: "Get Your Health Score", desc: "Receive a comprehensive analysis of your current health status" },
                { step: 3, title: "Personalized Recommendations", desc: "Get tailored advice to improve your overall wellbeing" }
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex items-start gap-4 group hover:translate-x-1 transition-all duration-300">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-teal-500 text-white font-medium shadow-md group-hover:shadow-lg">
                    {step}
                  </div>
                  <div>
                    <h3 className="font-medium text-lg text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400">
                      {title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="pt-6 text-sm text-slate-500 dark:text-slate-500 flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-teal-500" />
              <span>Takes approximately 5 minutes to complete</span>
            </p>
          </div>

          {/* RIGHT PANEL */}
          <div className="relative">
            <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-teal-100 dark:bg-teal-900/20 blur-3xl opacity-70"></div>
            <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-blue-100 dark:bg-blue-900/20 blur-3xl opacity-70"></div>

            <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-white dark:bg-slate-800/50 backdrop-blur-sm p-8 shadow-xl w-full">
              {showResult ? (
                <div className="text-center py-10 space-y-4">
                  <h2 className="text-2xl font-bold text-white">Assessment Complete</h2>
                  <p className="text-lg text-slate-300">
                    Your Health Score is: <span className="text-3xl font-bold text-teal-400">{score} / {questions.length}</span>
                  </p>
                  <p className="text-slate-400">Keep improving your lifestyle for better health!</p>
                  <Button onClick={handleStartAssessment} className="mt-4 bg-teal-600 hover:bg-teal-700 text-white">
                    Retake Assessment
                  </Button>
                </div>
              ) : started ? (
                <>
                  <div className="flex justify-between items-center text-sm text-slate-300 mb-4">
                    <span className="flex items-center gap-2">
                      <span className="bg-teal-500 w-5 h-5 rounded-full text-xs flex items-center justify-center">
                        {currentQuestion + 1}
                      </span>
                      of {questions.length}
                    </span>
                    <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full mb-6">
                    <div
                      className="h-full bg-teal-400 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-4">{questions[currentQuestion].text}</h3>
                  <div className="space-y-3">
                    {questions[currentQuestion].answerOptions.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index === questions[currentQuestion].correctIndex)}
                        className="w-full text-left border border-slate-700 rounded-lg px-4 py-3 hover:bg-slate-800 transition-all"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-10">
                  <h2 className="text-2xl font-bold mb-2">Ready to Begin?</h2>
                  <p className="mb-6 text-slate-400">Click start to answer questions about your health and lifestyle.</p>
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white"
                    onClick={handleStartAssessment}
                  >
                    Start Assessment
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
