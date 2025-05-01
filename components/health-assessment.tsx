"use client"

import { useState, useEffect } from "react"
import { ChevronRight, ArrowRight, CheckCircle2, Activity, Heart, Brain, Coffee } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

const questions = [
  {
    id: 1,
    question: "How would you rate your overall physical health?",
    icon: <Activity className="h-5 w-5 text-blue-500" />,
    options: [
      { value: "excellent", label: "Excellent" },
      { value: "good", label: "Good" },
      { value: "fair", label: "Fair" },
      { value: "poor", label: "Poor" },
    ],
  },
  {
    id: 2,
    question: "How many days per week do you engage in physical activity?",
    icon: <Heart className="h-5 w-5 text-rose-500" />,
    options: [
      { value: "0", label: "0 days" },
      { value: "1-2", label: "1-2 days" },
      { value: "3-4", label: "3-4 days" },
      { value: "5+", label: "5+ days" },
    ],
  },
  {
    id: 3,
    question: "How would you rate your stress levels on a typical day?",
    icon: <Brain className="h-5 w-5 text-purple-500" />,
    options: [
      { value: "low", label: "Low" },
      { value: "moderate", label: "Moderate" },
      { value: "high", label: "High" },
      { value: "very-high", label: "Very High" },
    ],
  },
  {
    id: 4,
    question: "How many servings of fruits and vegetables do you consume daily?",
    icon: <Coffee className="h-5 w-5 text-green-500" />,
    options: [
      { value: "0-1", label: "0-1 servings" },
      { value: "2-3", label: "2-3 servings" },
      { value: "4-5", label: "4-5 servings" },
      { value: "6+", label: "6+ servings" },
    ],
  },
  {
    id: 5,
    question: "How would you rate your sleep quality?",
    icon: <Coffee className="h-5 w-5 text-indigo-500" />,
    options: [
      { value: "excellent", label: "Excellent" },
      { value: "good", label: "Good" },
      { value: "fair", label: "Fair" },
      { value: "poor", label: "Poor" },
    ],
  },
]

export function HealthAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [progressValue, setProgressValue] = useState(0)
  const [fadeIn, setFadeIn] = useState(true)

  // Debug logging to help identify issues
  useEffect(() => {
    console.log("Current answers:", answers);
    console.log("Current question:", currentQuestion);
    console.log("Current question ID:", questions[currentQuestion].id);
    console.log("Has answer:", !!answers[questions[currentQuestion].id]);
  }, [answers, currentQuestion]);

  useEffect(() => {
    // Animate progress bar smoothly
    const targetProgress = ((currentQuestion + 1) / questions.length) * 100
    const animateProgress = () => {
      setProgressValue(prev => {
        const diff = targetProgress - prev
        const increment = diff * 0.1
        return Math.abs(increment) < 0.5 ? targetProgress : prev + increment
      })
    }
    
    const timer = setInterval(animateProgress, 20)
    return () => clearInterval(timer)
  }, [currentQuestion])

  // Modified to ensure we're using the correct ID
  const handleAnswer = (value: string) => {
    const questionId = questions[currentQuestion].id;
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  }

  // Simplified next handler
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
        setFadeIn(true);
      }, 200);
    } else {
      setShowResults(true);
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentQuestion(prev => prev - 1);
        setFadeIn(true);
      }, 200);
    }
  }

  if (showResults) {
    return (
      <div className="space-y-8 transition-opacity duration-500 ease-in-out opacity-100">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 mb-4">
            <CheckCircle2 className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400">Your Health Assessment Results</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Based on your responses, here's a snapshot of your health profile</p>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-blue-500" />
                <h4 className="font-medium text-slate-900 dark:text-slate-200">Physical Wellness</h4>
              </div>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">72%</span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-blue-100 dark:bg-blue-900/30">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-400 transition-all duration-1000 ease-out"
                style={{ width: "72%" }}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Coffee className="h-4 w-4 text-green-500" />
                <h4 className="font-medium text-slate-900 dark:text-slate-200">Nutrition</h4>
              </div>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">65%</span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-green-100 dark:bg-green-900/30">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-400 transition-all duration-1000 ease-out"
                style={{ width: "65%" }}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-purple-500" />
                <h4 className="font-medium text-slate-900 dark:text-slate-200">Stress Management</h4>
              </div>
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">58%</span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-purple-100 dark:bg-purple-900/30">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-400 transition-all duration-1000 ease-out"
                style={{ width: "58%" }}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-indigo-500" />
                <h4 className="font-medium text-slate-900 dark:text-slate-200">Sleep Quality</h4>
              </div>
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">80%</span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-indigo-100 dark:bg-indigo-900/30">
              <div 
                              className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-600 dark:to-indigo-400 transition-all duration-1000 ease-out"
                              style={{ width: "80%" }}
                            />
                          </div>
                        </div>
                      </div>
              
                      <Separator className="my-2 bg-slate-200 dark:bg-slate-700" />
              
                      <div className="space-y-4">
                        <h4 className="font-medium text-slate-900 dark:text-slate-200">Personalized Recommendations:</h4>
                        <ul className="space-y-3 text-sm">
                          <li className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30">
                            <div className="mt-0.5 flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-800/50 flex items-center justify-center">
                              <Activity className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <span className="text-slate-700 dark:text-slate-300">Consider increasing your physical activity to 3-4 days per week for improved cardiovascular health</span>
                          </li>
                          
                          <li className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/30">
                          <div className="mt-0.5 flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-800/50 flex items-center justify-center">
                              <Coffee className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                            </div>
                            <span className="text-slate-700 dark:text-slate-300">Add more fruits and vegetables to your daily diet to reach the recommended 5 servings</span>
                          </li>
                          
                          <li className="flex items-start gap-3 p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/30">
                            <div className="mt-0.5 flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-800/50 flex items-center justify-center">
                              <Brain className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <span className="text-slate-700 dark:text-slate-300">Explore stress management techniques like meditation or deep breathing exercises</span>
                          </li>
                        </ul>
                      </div>
              
                      <div className="flex justify-center pt-2">
                        <Button 
                          className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 transition-all duration-300 group"
                        >
                          <span>Get Detailed Report</span>
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </div>
                    </div>
                  )
                }
              
                return (
                  <div className="space-y-8">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-slate-900 dark:text-slate-200 flex items-center">
                          <span className="flex items-center justify-center h-6 w-6 rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 text-xs font-semibold mr-2">
                            {currentQuestion + 1}
                          </span>
                          <span>of {questions.length}</span>
                        </h3>
                        <span className="text-sm font-medium text-teal-600 dark:text-teal-400">{Math.round(progressValue)}% Complete</span>
                      </div>
                      
                      <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                        <div 
                          className="h-full bg-gradient-to-r from-teal-400 to-teal-500 dark:from-teal-500 dark:to-teal-400 transition-all duration-300 ease-out"
                          style={{ width: `${progressValue}%` }}
                        />
                      </div>
                    </div>
              
                    <div 
                      className={`space-y-6 transition-opacity duration-200 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          {questions[currentQuestion].icon}
                          <h3 className="text-xl font-medium text-slate-900 dark:text-white">
                            {questions[currentQuestion].question}
                          </h3>
                        </div>
                        <div className="h-1 w-16 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full"></div>
                      </div>
              
                      {/* Modified RadioGroup to use direct onClick handlers for better reliability */}
                      <div className="pt-2 grid gap-3">
                        {questions[currentQuestion].options.map((option, index) => (
                          <div 
                            key={option.value}
                            className="transition-all duration-200 ease-in-out"
                            style={{ 
                              opacity: fadeIn ? 1 : 0,
                              transform: fadeIn ? 'translateY(0)' : 'translateY(10px)',
                              transitionDelay: `${index * 50}ms`
                            }}
                          >
                            <div
                              onClick={() => handleAnswer(option.value)}
                              className={`flex items-center gap-3 p-4 rounded-lg border border-slate-200 dark:border-slate-700 transition-all duration-200 cursor-pointer hover:border-teal-200 dark:hover:border-teal-800 ${
                                answers[questions[currentQuestion].id] === option.value 
                                  ? "bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800 ring-1 ring-teal-500 dark:ring-teal-400" 
                                  : "bg-white dark:bg-slate-800/50"
                              }`}
                            >
                              <div className="relative flex h-5 w-5 items-center justify-center">
                                <div className={`h-5 w-5 rounded-full border ${
                                  answers[questions[currentQuestion].id] === option.value 
                                    ? "border-teal-500 dark:border-teal-400" 
                                    : "border-slate-300 dark:border-slate-600"
                                }`}>
                                  {answers[questions[currentQuestion].id] === option.value && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <div className="h-2.5 w-2.5 rounded-full bg-teal-500 dark:bg-teal-400" />
                                    </div>
                                  )}
                                </div>
                              </div>
                              <span className={`text-base ${
                                answers[questions[currentQuestion].id] === option.value 
                                  ? "text-slate-900 dark:text-white font-medium" 
                                  : "text-slate-700 dark:text-slate-300"
                              }`}>
                                {option.label}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
              
                    <div className="flex justify-between pt-4">
                      {currentQuestion > 0 ? (
                        <Button
                          onClick={handlePrevious}
                          variant="outline"
                          className="border-slate-200 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white transition-all duration-200"
                        >
                          Previous
                        </Button>
                      ) : (
                        <div></div> // Empty div to maintain flex spacing
                      )}
                      
                      {/* Modified Next button to be enabled by default for testing */}
                      <Button
                        onClick={handleNext}
                        disabled={!answers[questions[currentQuestion].id]}
                        className={`bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-md hover:shadow-lg shadow-teal-500/10 hover:shadow-teal-500/20 transition-all duration-300 group ${
                          !answers[questions[currentQuestion].id] ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        <span>{currentQuestion < questions.length - 1 ? "Next Question" : "View Results"}</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </div>
                  </div>
                )
              }