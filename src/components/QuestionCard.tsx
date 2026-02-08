import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Question } from '../data/questions'

interface QuestionCardProps {
  question: Question
  index: number
}

export default function QuestionCard({ question, index }: QuestionCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-card rounded-2xl shadow-lg border-2 border-border hover:border-primary transition-all duration-300 overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-accent/50 transition-colors duration-200"
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-semibold">
              {question.category}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-foreground leading-relaxed">
            {question.question}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 mt-1"
        >
          <ChevronDown className="w-6 h-6 text-primary" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-4 border-t-2 border-border pt-4">
              <div>
                <h4 className="text-sm font-bold text-primary mb-2 uppercase tracking-wide">
                  Javob:
                </h4>
                <p className="text-foreground leading-relaxed whitespace-pre-line">
                  {question.answer}
                </p>
              </div>
              {question.example && (
                <div>
                  <h4 className="text-sm font-bold text-primary mb-2 uppercase tracking-wide">
                    Misol:
                  </h4>
                  <pre className="bg-muted p-4 rounded-xl overflow-x-auto text-sm">
                    <code className="text-foreground font-mono">
                      {question.example}
                    </code>
                  </pre>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
