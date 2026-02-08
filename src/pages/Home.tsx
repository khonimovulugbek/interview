import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import QuestionCard from '../components/QuestionCard'
import ThemeToggle from '../components/ThemeToggle'
import { questions } from '../data/questions'

interface HomeProps {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export default function Home({ theme, toggleTheme }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Barcha savollar')

  const filteredQuestions = useMemo(() => {
    let filtered = questions

    // Category filter
    if (selectedCategory !== 'Barcha savollar') {
      filtered = filtered.filter((q) => q.category === selectedCategory)
    }

    // Search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (q) =>
          q.question.toLowerCase().includes(query) ||
          q.answer.toLowerCase().includes(query) ||
          q.category.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [searchQuery, selectedCategory])

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Header with gradient */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/70 text-primary-foreground py-16 px-6 shadow-2xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex justify-end mb-6">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center"
          >
            Java Core Suhbat Savollari
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-center text-primary-foreground/90 max-w-3xl mx-auto"
          >
            Intervyu tayyorgarligi uchun — Savollarga tayyorlaning va bilimlaringizni
            mustahkamlang
          </motion.p>
        </div>
      </motion.header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Search bar */}
        <div className="flex justify-center mb-8">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>

        {/* Category filter */}
        <div className="mb-12">
          <CategoryFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        {/* Results count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <p className="text-muted-foreground">
            <span className="font-bold text-primary text-xl">{filteredQuestions.length}</span>{' '}
            ta savol topildi
          </p>
        </motion.div>

        {/* Questions list */}
        <div className="space-y-4">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((question, index) => (
              <QuestionCard key={question.id} question={question} index={index} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <p className="text-2xl text-muted-foreground mb-4">
                Hech qanday savol topilmadi
              </p>
              <p className="text-muted-foreground">
                Boshqa kategoriya tanlang yoki qidiruv so'zini o'zgartiring
              </p>
            </motion.div>
          )}
        </div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-card border-t-2 border-border mt-20 py-8"
      >
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 Java Interview Prep. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </motion.footer>
    </div>
  )
}
